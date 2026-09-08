const router = require('express').Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get a single product by its FakeStore ID
router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ id: Number(req.params.id) });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;