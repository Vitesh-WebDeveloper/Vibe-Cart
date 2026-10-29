import express from 'express';
import { Signup, Login ,getMe} from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

import { validateBody } from "../middleware/validateBody.js";
import {
  signupSchema,
  loginSchema,
} from "../validation/authSchemas.js";

const router = express.Router();

// When a POST request hits /signup, run the Signup function
router.post(
  "/signup",
  validateBody(signupSchema),
  Signup
);

// When a POST request hits /login, run the Login function
router.post(
  "/login",
  validateBody(loginSchema),
  Login
);
// The request must pass through requireAuth before it is allowed to hit getMe
router.get('/me', requireAuth, getMe);
export default router;