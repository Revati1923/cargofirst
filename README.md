

This repository is an initial MERN stack scaffold created to satisfy the task requirements.



- Server: `server/` (Express, routes, models, JWT auth middleware)
- Client: `client/` (React components with inline styles, routing, chart example)

Files to review first 
- `server/routes/auth.js` — refine validation, error messages, and add email verification if needed.
- `server/routes/jobs.js` — add update/delete, permissions and input validation.
- `server/server.js` — confirm MongoDB URI and environment handling.
- `client/src/components/*` — polish UI, accessibility, and add client-side validation and loading states.

Quick start (local):
1. Start MongoDB and update `server/.env` with your connection string.
2. Install and run server:

   cd server
   npm install
   npm run dev

3. Install and run client:

   cd ../client
   npm install
   npm start

