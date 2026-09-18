import Cart from '../models/cartModel.js';

// GET /api/cart
// WHY WE WRITE THIS: When the user opens the app, we fetch their saved cart from the DB.
export const getCart = async (req, res) => {
  try {
    // req.userId comes from your requireAuth middleware!
    let cart = await Cart.findOne({ userId: req.userId });
    // If they don't have a cart yet, send an empty items array
    if (!cart) cart = { items: [] }; 
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/cart/add
// WHY WE WRITE THIS: Checks if they already have a cart. If yes, adds to it. If no, creates one.
export const addToCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId });
    
    // If no cart exists in the DB for this user, create a brand new one
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
    }

    const newItem = req.body; // The product the user clicked "Add to Cart" on
    
    // Check if product is already in the cart to avoid duplicates
    const existingItem = cart.items.find(item => item.productId === newItem.productId);
    
    if (existingItem) {
      existingItem.quantity += 1; // Just increase quantity
    } else {
      cart.items.push({ ...newItem, quantity: 1 }); // Add new item
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};