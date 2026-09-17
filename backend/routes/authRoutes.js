import express from 'express';
import { Signup, Login } from '../controllers/authController.js';

const router = express.Router();

// When a POST request hits /signup, run the Signup function
router.post('/signup', Signup);

// When a POST request hits /login, run the Login function
router.post('/login', Login);

export default router;