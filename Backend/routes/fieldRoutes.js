// backend/routes/fieldRoutes.js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { 
    createField, getAllFields, updateField, deleteField, getCapabilitiesForField 
} from '../controllers/fieldController.js';

const router = express.Router();

router.use(protect, isAdmin); // Secure all routes in this file

router.route('/')
  .get(getAllFields)
  .post(createField);

router.route('/:id')
  .put(updateField)
  .delete(deleteField);

router.get('/:id/capabilities', getCapabilitiesForField);

export default router;