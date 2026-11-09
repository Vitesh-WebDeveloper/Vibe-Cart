
import {
  getAllProducts,
  addProduct
} from "../services/productService.js";

// GET controller
export const getProducts = async (req, res) => {
  try {
    const shouldFail = req.query.fail === "true";

    const products = await getAllProducts({ shouldFail });

    return res.status(200).json({
      count: products.length,
      products: products
    });

  } catch (error) {
    console.error("Unable to fetch products:", error);

    return res.status(500).json({
      message: "Unable to fetch products."
    });
  }
};

// POST controller
export const createProduct = async (req, res) => {
  try {
    const newProduct = await addProduct(req.body);

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });

  } catch (error) {
    console.error("Unable to create product:", error);

    return res.status(500).json({
      message: "Unable to create product."
    });
  }
};
