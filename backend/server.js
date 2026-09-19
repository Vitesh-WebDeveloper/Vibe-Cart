// This is the main engine of our backend that initializes Express, connects to the database, and listens for requests.

// import express from 'express';
// import connectDB from './config/db.js';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import productRoutes from './routes/productRoutes.js';
// import authRoutes from "./routes/authRoutes.js"
// import cartRoutes from './routes/cartRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();

// //checking the status purpose
// app.get('/api/health', (_req, res) => {
//   res.status(200).json({ status: 'OK', message: 'VibeCart API is running' });
// });

// // (these are middleware's)
// // This tells the browser: "Only allow requests from this specific Scheme + Host + Port"
// app.use(cors({ origin:"http://localhost:5173" }));
// app.use(express.json());

// // Any request that starts with '/api/products' will be handed off to productRoutes.js
// app.use('/api/products',productRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);

// // process.env.PORT catches whatever dynamic port Render assigns to your app.
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

// 1. FIXED CORS: Allow both your local development AND your live Vercel frontend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://vibe-cart-omega.vercel.app', // Your Vercel frontend URL from GitHub repo
    /\.vercel\.app$/ // Allows any preview branch deployments on Vercel automatically
  ],
  credentials: true
}));

app.use(express.json());

// 2. HEALTH CHECK ROUTE WITH LOGGING
// If this works, Render logs will print "Health check pinged!" when you test it.
app.get('/api/health', (req, res) => {
  console.log('Health check pinged successfully!');
  res.status(200).json({ status: 'OK', message: 'VibeCart API is running' });
});

// Root route fallback so visiting the base Render URL doesn't show a 404
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to VibeCart API' });
});

// ... your existing productRoutes, authRoutes, cartRoutes, orderRoutes go here ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});