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

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// 1. Load environment variables and connect to MongoDB Atlas
dotenv.config();
connectDB();

const app = express();

// 2. Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://vibe-cart-omega.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));

app.use(express.json());

// 3. HEALTH CHECK ROUTE (Must be at the top of your routes)
app.get('/api/health', (req, res) => {
  console.log('HEALTH CHECK PINGED SUCCESSFULLY!');
  return res.status(200).json({ status: 'OK', message: 'VibeCart API is running' });
});

// Root route fallback
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to VibeCart API' });
});

// 4. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});