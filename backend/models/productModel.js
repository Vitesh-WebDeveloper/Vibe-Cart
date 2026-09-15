//this file is for how the products should be and all the products are held in 'Product'
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: { type: Number, required: true, default: 0 },
    count: { type: Number, required: true, default: 0 }
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;

