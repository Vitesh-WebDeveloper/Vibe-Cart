import express from 'express';
import productRoutes from "./routes/productRoutes.js"

const app = express();
const PORT = 5003;

app.use(express.json());

app.use('/api/products', productRoutes);

app.use((req, res) =>
  res.status(404).json({ error: 'Not Found' })
);

app.listen(PORT, () => {
  console.log(`Day 4 API running on port ${PORT}`);
});
