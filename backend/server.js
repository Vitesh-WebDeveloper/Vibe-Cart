import express from 'express'; 
import connectDB from './config/db.js'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import productRoutes from './routes/productRoutes.js'; 
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from './routes/cartRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js'; 

dotenv.config(); 
connectDB(); 

const app = express();

// --- PRODUCTION CORS CONFIGURATION ---
// WHY WE WRITE THIS: To allow requests from local development 
// and your live Vercel domain(s) while blocking unauthorized origins.
const allowedOrigins = [
  'http://localhost:5173',
  'https://vibe-cart-omega.vercel.app' // Your exact live production domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);
    
    // Allow exact matches in allowedOrigins OR any domain ending in .vercel.app
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS Policy: Origin not allowed'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Health check — must be registered BEFORE any catch-all route
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Catch-all 404 — must be the LAST app.use() in the whole file
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));