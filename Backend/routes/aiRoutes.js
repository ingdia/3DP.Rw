// routes/aiRoutes.js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { generateQuestions } from '../controllers/aiController.js';

const router = express.Router();

// This route is for generating content, protected for admins
router.post('/generate-questions', protect, isAdmin, generateQuestions);

export default router;