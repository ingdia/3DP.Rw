// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

// 1. Middleware to protect routes (check if user is logged in)
export const protect = async (req, res, next) => {
  let token;

  // Check for the token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the database using the id from the token
      // We select all columns EXCEPT the password
      const userResult = await pool.query(
        'SELECT id, fullName, email, role, is_verified FROM users WHERE id = $1',
        [decoded.id]
      );

      if (userResult.rows.length === 0) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // Attach the user object to the request object
      req.user = userResult.rows[0];

      // Move to the next middleware or controller
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// 2. Middleware to check for admin role
export const isAdmin = (req, res, next) => {
  // This middleware should run AFTER the 'protect' middleware
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' }); // 403 Forbidden
  }
};