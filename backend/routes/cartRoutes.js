// WHY WE WRITE THIS: Connects the URLs to the controllers and enforces security.
import express from 'express';
import { getCart, addToCart } from '../controllers/cartController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

import { validateBody } from "../middleware/validateBody.js";
import { validateCartProduct } from "../middleware/validateCartProduct.js";
import { addToCartSchema } from "../validation/cartSchemas.js";

const router = express.Router();

// By putting requireAuth here, EVERY route below it requires a valid JWT!
router.use(requireAuth); 

router.get('/', getCart);
router.post(
  "/add",
  validateBody(addToCartSchema),
  validateCartProduct,
  addToCart
);
export default router;