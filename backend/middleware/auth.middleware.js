const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  // 1. Look at the user's incoming request and check the "headers" for a wristband
  const header = req.headers.authorization;
  
  // 2. If they didn't bring a wristband, kick them out
  if (!header) return res.status(401).json({ error: 'No token provided' });

  // 3. The wristband comes looking like "Bearer eyJhbG..." 
  // We split it by the space and grab the second part (the actual token)
  const token = header.split(' ')[1];

  try {
    // 4. Verify the wax seal using your secret key from the .env vault
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 5. If it's valid, attach their ID to the request so the next room knows who they are
    req.userId = decoded.userId;
    
    // 6. 'next()' opens the door and lets them into the route they asked for
    next();
  } catch {
    // 7. If the token is fake or expired, kick them out
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = requireAuth;