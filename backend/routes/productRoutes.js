// This file acts as a traffic cop, taking incoming URL requests
// and routing them to the correct controller function.

import express from 'express';

import {
  getProducts,
  getProductById,
  deleteProduct
} from '../controllers/productController.js';

import {
  requireAuth,
  requireAdmin
} from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin-only delete route
router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  deleteProduct
);

export default router;