// routes/authRoutes.js
import express from 'express';
// Add verifyEmail to the import
import { signup, login, verifyEmail,
      forgotPassword, // <-- Import new function
  resetPassword   // <-- Import new function
 } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email', verifyEmail); 
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;