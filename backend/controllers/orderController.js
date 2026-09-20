import Cart from '../models/cartModel.js';
import Order from '../models/orderModel.js';

// POST /api/orders
// WHY WE WRITE THIS: Creates a permanent order document from either 
// the MongoDB saved cart OR the items array sent directly by the React frontend.
export const createOrder = async (req, res) => {
  try {
    let items = [];
    
    // 1. Check if a cart document exists in MongoDB for this user
    let cart = await Cart.findOne({ userId: req.userId });

    if (cart && cart.items.length > 0) {
      items = cart.items;
    } else if (req.body.items && req.body.items.length > 0) {
      // 2. Fallback: Use cart items sent directly in the request body from React state
      items = req.body.items;
    }

    // 3. Reject if both MongoDB and request body carts are empty
    if (items.length === 0) {
      return res.status(400).json({ error: 'Your cart is empty' });
    }

    // 4. Calculate total price: (price * quantity) for each item
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 5. Create the permanent order receipt in MongoDB
    const order = await Order.create({ 
      userId: req.userId, 
      items: items, 
      total: totalAmount 
    });

    // 6. Clear the MongoDB cart if one existed
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};