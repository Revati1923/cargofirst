/**
 * server.js
 * AI-generated scaffold: basic Express server + MongoDB connection and routes.
 *
 * Human-read notes:
 * - Contract: reads env variables { MONGODB_URI, JWT_SECRET, PORT }
 * - Outputs: starts HTTP server on PORT, mounts /api/auth and /api/jobs
 * - Errors: connection errors are logged to console; consider more robust handling and retries.
 *
 * Next steps for a human:
 * - Add centralized error handling middleware
 * - Add logging (winston / morgan) and request validation
 * - Lock CORS to allowed origins in production
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

dotenv.config();
const app = express();

// Middleware
// Allow specifying one or more client origins via env var (comma-separated).
// Default includes both common CRA dev ports so the React app can run on 3000 or 3002.
const rawOrigins = process.env.CLIENT_ORIGIN || 'http://localhost:3002,http://localhost:3000';
const ALLOWED_ORIGINS = rawOrigins.split(',').map(s => s.trim()).filter(Boolean);
console.log(`CORS allowing origins: ${ALLOWED_ORIGINS.join(', ')}`);
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN', 'x-auth-token']
}));
app.use(cookieParser());
app.use(express.json());

// CSRF Protection: ensure a CSRF cookie exists and validate modifying requests
const crypto = require('crypto');
app.use((req, res, next) => {
  try {
    // Ensure CSRF cookie exists (so client can read it and send it back)
    let cookieWasSet = false;
    if (!req.cookies || !req.cookies['XSRF-TOKEN']) {
      const token = crypto.randomBytes(32).toString('hex');
      res.cookie('XSRF-TOKEN', token, {
        httpOnly: false, // readable by JS so client can send it in header
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      // attach to req so later code can see it
      req.cookies = { ...(req.cookies || {}), 'XSRF-TOKEN': token };
      cookieWasSet = true;
    }

    // For state-changing methods, validate header matches cookie. If we just set the cookie
    // in this same request (client hasn't had a chance to read it and send header), allow
    // the request to proceed but require subsequent requests to include the header.
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      if (cookieWasSet) {
        // Allow the request but expect the client to include the header on next requests
      } else {
        const csrfToken = req.cookies['XSRF-TOKEN'];
        const headerToken = req.headers['x-xsrf-token'];
        if (!csrfToken || !headerToken || csrfToken !== headerToken) {
          return res.status(403).json({ msg: 'CSRF token validation failed' });
        }
      }
    }

    return next();
  } catch (err) {
    return next(err);
  }
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});