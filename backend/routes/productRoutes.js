// This file acts as a traffic cop, taking incoming URL requests
// and routing them to the correct controller function.

import express from 'express';

import {
  getProducts,
  getProductById,
  deleteProduct
} from '../controllers/productController.js';

// Authentication middleware
import { requireAuth } from '../middleware/authMiddleware.js';

// Admin authorization middleware
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// --------------------------------------------------
// PUBLIC ROUTES
// Anyone can browse products
// --------------------------------------------------

router.get('/', getProducts);

router.get('/:id', getProductById);

// --------------------------------------------------
// PROTECTED ADMIN ROUTE
// User must:
// 1. Be authenticated
// 2. Have isAdmin: true
// --------------------------------------------------

// DELETE /api/products/:id
router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  deleteProduct
);

export default router;