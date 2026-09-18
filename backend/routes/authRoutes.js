import express from 'express';
import { Signup, Login ,getMe} from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// When a POST request hits /signup, run the Signup function
router.post('/signup', Signup);

// When a POST request hits /login, run the Login function
router.post('/login', Login);

// The request must pass through requireAuth before it is allowed to hit getMe
router.get('/me', requireAuth, getMe);
export default router;