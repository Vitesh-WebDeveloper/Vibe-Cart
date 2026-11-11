import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      default: 0
    }
  },
  {
    collection: "day6_practice_products"
  }
);

const ProductPractice = mongoose.model("ProductPractice", productSchema);

export default ProductPractice;