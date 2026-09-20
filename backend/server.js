// server.js
// Main backend entrypoint for VibeCart (ESM style)

import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDB();

const app = express();

/**
 * Simple request logger - useful to see incoming requests in Render logs
 * (Will print method + originalUrl + host)
 */
app.use((req, res, next) => {
  console.log(`[INCOMING] ${new Date().toISOString()} ${req.method} ${req.originalUrl} Host:${req.headers.host}`);
  next();
});

/**
 * CORS
 * - For debugging allow all origins. In production, set FRONTEND_URL in .env and tighten this.
 */
app.use(cors()); // <-- change to more restrictive origins when ready
app.use(express.json());

/**
 * Quick root check (not an API endpoint)
 */
app.get('/', (_req, res) => {
  res.status(200).send('Backend root alive');
});

/**
 * Health check (place this BEFORE mounting routers so it's always registered)
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'VibeCart API is running' });
});

/**
 * Register your API routers
 * Keep these AFTER /api/health and BEFORE any static/catch-all handlers.
 */
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

/**
 * Fallback for unmatched /api routes - helpful so calls to /api/... that don't exist
 * return JSON 404 and show a log entry. This will let us see in logs whether the request
 * reached the application (the logger above) and confirm it wasn't matched.
 */
app.use('/api', (req, res) => {
  console.log(`[API_NOT_FOUND] ${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Not Found' });
});

/**
 * Start server
 * Render provides a dynamic PORT. Bind to 0.0.0.0 so external load balancers can reach it.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

/**
 * Global error handlers for visibility in logs
 */
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  // optional: process.exit(1);
});