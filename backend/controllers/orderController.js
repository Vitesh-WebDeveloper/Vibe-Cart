import Cart from '../models/cartModel.js';
import Order from '../models/orderModel.js';

// POST /api/orders
// WHY WE WRITE THIS: Converts a temporary cart into a permanent order.
export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Your cart is empty' });
    }

    // Calculate total price: (Item A price * qty) + (Item B price * qty)
    const totalAmount = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create the permanent order receipt
    const order = await Order.create({ 
      userId: req.userId, 
      items: cart.items, 
      total: totalAmount 
    });

    // Empty the user's cart now that they have "paid"
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};