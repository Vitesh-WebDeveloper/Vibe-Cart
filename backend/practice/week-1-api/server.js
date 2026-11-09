
import express from "express";
import productRoutes from "../routes/productRoutes.js";

const app = express();
const PORT = 5004;

// Read incoming JSON
app.use(express.json());

// Register product routes
app.use("/api/products", productRoutes);

// Handle unknown URLs
app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Week 1 API running on port ${PORT}`);
});
