
import express from "express";

import {
  getProducts,
  createProduct
} from "../controllers/productController.js";

import {
  validateProduct
} from "../middleware/validateProduct.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", validateProduct, createProduct);

export default router;
