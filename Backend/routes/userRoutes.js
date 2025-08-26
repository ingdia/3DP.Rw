// routes/userRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Example user-only route
router.get('/profile', protect, (req, res) => {
  // 'protect' ensures the user is logged in. We don't need 'isAdmin' here.
  res.json({
    message: `This is the profile page for ${req.user.fullname}.`,
    user: req.user,
  });
});

export default router;