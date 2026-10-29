import Product from "../models/productModel.js";

export const validateCartProduct = async (
  req,
  res,
  next
) => {
  try {
    const productId = Number(req.body.productId);

    const productExists = await Product.exists({
      id: productId,
    });

    if (!productExists) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    return next();
  } catch (error) {
    console.error("Cart product validation failed");

    return res.status(500).json({
      error: "Unable to validate product right now",
    });
  }
};