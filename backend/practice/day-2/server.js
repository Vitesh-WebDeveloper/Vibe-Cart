
import express from "express";

const app = express();
const PORT = 5001;

// Middleware: read incoming JSON bodies
app.use(express.json());

// Temporary product data (stored in memory)
let products = [
  {
    id: 1,
    name: "Ear phones",
    price: 110
  },
  {
    id: 2,
    name: "Smart Phone",
    price: 20000
  }
];

// GET: retrieve all products
app.get("/api/products", (req, res) => {
  return res.status(200).json({
    count: products.length,
    products: products
  });
});

// POST: create a new product
app.post("/api/products", (req, res) => {
  const { name, price } = req.body;

  // Validate the incoming information
  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return res.status(400).json({
      message: "Please provide a valid name and positive price."
    });
  }

  const nextId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1;

  const newProduct = {
    id: nextId,
    name: name.trim(),
    price: price
  };

  products.push(newProduct);

  return res.status(201).json({
    message: "Product created successfully",
    product: newProduct
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Practice API running on port ${PORT}`);
});
