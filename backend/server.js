// This is the main engine of our backend that initializes Express, connects to the database, and listens for requests.

import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import authRoutes from "./routes/authRoutes.js"
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDB();

const app = express();

// (these are middleware's)
// This tells the browser: "Only allow requests from this specific Scheme + Host + Port"
app.use(cors({ origin:"http://localhost:5173" }));
app.use(express.json());

// Any request that starts with '/api/products' will be handed off to productRoutes.js
app.use('/api/products',productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Health check route to verify backend is live
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'VibeCart API is running' });
});

// process.env.PORT catches whatever dynamic port Render assigns to your app.
const PORT = process.env.PORT || 5000;

// Adding '0.0.0.0' tells the server to accept traffic from Render's external load balancers
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});