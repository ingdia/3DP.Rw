// routes/adminRoutes.js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Example admin-only route
router.get('/dashboard-data', protect, isAdmin, (req, res) => {
  // Because 'protect' and 'isAdmin' passed, we know the user is a logged-in admin.
  // We can access the user info from req.user
  res.json({
    message: `Welcome Admin ${req.user.fullname}! Here is your secret dashboard data.`,
    // You would fetch real admin data here
  });
});

export default router;