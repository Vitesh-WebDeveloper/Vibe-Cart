import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  // 1. Grab the token from the request headers
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // 2. Extract the actual token string (Header looks like: "Bearer eyJhbG...")
  const token = authHeader.split(' ')[1];
   
  try {
    // 3. Verify the cryptographic stamp
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach the user's ID to the request so the next function can use it
    req.userId = decoded.userId;
    
    // 5. Open the door and let them in
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};