//This file acts as a traffic cop, taking incoming URL requests and routing them to the correct controller function.

import express from 'express'
const router = express.Router();

import {getProducts,getProductById} from "../controllers/productController.js";

router.get('/',getProducts);
router.get('/:id',getProductById);

export default router;
