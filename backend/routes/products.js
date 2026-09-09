// products.js is the Inventory Department sitting in the back room.
const router = require('express').Router();
// Creates a mini-manager just for this file (The Inventory Department desk)

const Product = require('../models/Product');
// Imports the Mongoose Robot we built earlier so we can search the warehouse
// ROUTE 1: GET ALL PRODUCTS (Used for your Home.tsx Grid)
router.get('/', async (req, res) => {
  // When React asks for the main products link...
const products = await Product.find();
  // ...the robot goes into the database and grabs EVERY product it finds...
res.json(products);
  // ...and sends the whole list back to React as JSON text.
});

// ROUTE 2: GET A SINGLE PRODUCT (Used for ProductDetail.tsx)
router.get('/:id', async (req, res) => {
  // The ":id" is a placeholder. If React asks for "/api/products/5", 
  // Express takes the "5" and stores it inside "req.params.id"

  const product = await Product.findOne({ id: Number(req.params.id) });
  // The URL always sends text (like "5"). Our database expects a math number.
  // Number() converts the text "5" into the number 5. 
  // Then the robot searches the database for that exact ID.

  if (!product) return res.status(404).json({ error: 'Product not found' });
  // If the robot comes back empty-handed (e.g., they asked for ID 999),
  // stop the code and send a 404 error gracefully without crashing the server.

  res.json(product);
  // If the robot found the product, send that single product back to React.
});

module.exports = router;
// Package this whole department up so the main receptionist (server.js) can use it.