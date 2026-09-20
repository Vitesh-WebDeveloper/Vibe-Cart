import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// ==========================================
// BOUNCER 1: requireAuth
// Verifies that the incoming request has a valid JWT token
// ==========================================
export const requireAuth = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Make sure the header exists and uses Bearer authentication
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'No token provided'
    });
  }

  // Extract the JWT token
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret stored in .env
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Save the user's ID on the request object.
    // requireAdmin will use this later.
    req.userId = decoded.userId;

    // Authentication successful
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
};

// ==========================================
// BOUNCER 2: requireAdmin
// Runs AFTER requireAuth
// Checks whether the authenticated user is an admin
// ==========================================
export const requireAdmin = async (req, res, next) => {
  try {
    // requireAuth already placed the user's ID here
    const user = await User.findById(req.userId);

    // Allow the request only when the user exists
    // and has isAdmin: true
    if (user && user.isAdmin === true) {
      return next();
    }

    // User is logged in but is not an admin
    return res.status(403).json({
      error: 'Access denied: Admin privileges required'
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};