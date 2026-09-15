// This is the main engine of our backend that initializes Express, connects to the database, and listens for requests.

import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors()); 
app.use(express.json());

// Any request that starts with '/api/products' will be handed off to productRoutes.js
app.use('/api/products',productRoutes);

// why we wrote 'process.env.PORT || 5000' why not 5000 directly, what is that procees.env.port ?
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});