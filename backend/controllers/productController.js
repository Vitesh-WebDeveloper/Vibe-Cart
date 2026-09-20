// This file is the "brain" that handles the database logic
// (fetching/deleting products) and sends the JSON response back to the client.

import Product from '../models/productModel.js';

// @desc    Fetch all products (or filter by category if ?category=... is passed in the query)
// @route   GET /api/products or GET /api/products?category=electronics
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    // WHY WE WRITE THIS:
    // If the client sends ?category=electronics,
    // req.query.category will be "electronics".
    //
    // In that case MongoDB will search only for:
    // { category: "electronics" }
    //
    // If no category is provided, filter becomes {},
    // which tells MongoDB to return all products.
    const filter = category ? { category } : {};

    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Fetch single product by FakeStore id
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    // findOne() tells the database to stop searching
    // as soon as it finds the first matching product.
    //
    // req.params.id is the ID from the URL.
    // Example:
    // /api/products/5
    //
    // MongoDB searches for:
    // { id: "5" }
    const product = await Product.findOne({
      id: req.params.id
    });

    if (product) {
      res.status(200).json(product);
    } else {
      // 404 means the requested product does not exist.
      res.status(404).json({
        message: 'Product Not Found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete a product by ID (Admin only)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    // We use findOneAndDelete with the custom FakeStore
    // numeric ID field, just like getProductById.
    const product = await Product.findOneAndDelete({
      id: req.params.id
    });

    if (!product) {
      return res.status(404).json({
        message: 'Product Not Found'
      });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      id: req.params.id
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: error.message
    });
  }
};