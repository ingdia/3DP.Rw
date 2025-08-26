// backend/routes/questionRoutes.js

import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { 
    saveBatchQuestions, 
    getAllQuestions, 
    deleteQuestion 
} from '../controllers/questionController.js';

const router = express.Router();

// All routes in this file require the user to be a logged-in admin
router.use(protect, isAdmin);

router.route('/')
    // Handles GET requests to /api/questions to fetch all questions
    .get(getAllQuestions)
    // Handles POST requests to /api/questions to save a batch of new questions
    .post(saveBatchQuestions);

router.route('/:id')
    // Handles DELETE requests to /api/questions/:id to delete a single question
    .delete(deleteQuestion);

export default router;