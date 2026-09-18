// WHY WE WRITE THIS: Once a user pays/checks out, the cart is emptied. 
// We need a permanent record of what they bought and how much they paid.
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: {type : Array}, // We can just dump the cart items array directly in here
  total: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);