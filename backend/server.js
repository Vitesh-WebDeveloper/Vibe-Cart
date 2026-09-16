// This is the main engine of our backend that initializes Express, connects to the database, and listens for requests.

import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();

// (this  2 are middleware)
// This tells the browser: "Only allow requests from this specific Scheme + Host + Port"
app.use(cors({ origin:"http://localhost:5173" }));
app.use(express.json());

// Any request that starts with '/api/products' will be handed off to productRoutes.js
app.use('/api/products',productRoutes);

// process.env.PORT catches whatever dynamic port Render assigns to your app.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});