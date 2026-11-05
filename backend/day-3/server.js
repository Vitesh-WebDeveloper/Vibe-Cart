import express from 'express';
import productRoutes from "./routes/productRoutes.js"

const app = express();
const PORT = 5002;

//middleware
app.use(express.json());

//product Routes
app.use('/api/products', productRoutes);

// error 404 
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

//start
app.listen(PORT, () =>{ 
    console.log(`Server running of ${PORT}`)
});