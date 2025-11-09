/**
 * middleware/auth.js
 * Small auth middleware verifying JWT sent in `x-auth-token` header.
 * Human notes:
 * - Consider reading token from httpOnly cookie instead for better XSS protection.
 * - Add token expiration handling and clearer error messages.
 */

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get token from cookie
    const token = req.cookies.token;

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'Authentication required' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.clearCookie('token');
        res.status(401).json({ msg: 'Session expired. Please login again.' });
    }
};