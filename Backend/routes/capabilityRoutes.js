// routes/capabilityRoutes.js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  createCapability,
  getAllCapabilities,
  updateCapability,
  deleteCapability,
} from '../controllers/capabilityController.js';

const router = express.Router();

// All routes in this file are protected and admin-only
router.use(protect, isAdmin);

router.route('/')
  .post(createCapability)    // POST /api/capabilities
  .get(getAllCapabilities); // GET /api/capabilities

router.route('/:id')
  .put(updateCapability)     // PUT /api/capabilities/:id
  .delete(deleteCapability); // DELETE /api/capabilities/:id

export default router;