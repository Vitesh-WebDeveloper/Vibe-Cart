// WHY WE WRITE THIS: We need to link an array of products to a specific user.
// By adding 'userId', a hacker can't view someone else's cart.
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  // ref: 'User' tells MongoDB this ID belongs to the User collection
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: String,
    title: String,
    price: Number,
    image: String,
    quantity: { type: Number, default: 1 }
  }]
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);