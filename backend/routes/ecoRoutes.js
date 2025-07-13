import express from 'express';
import { addEcoActivity, getDashboardData, updateChallenge } from '../controllers/ecoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Add eco activity
router.post('/activity', addEcoActivity);

// Get dashboard data
router.get('/dashboard', getDashboardData);

// Update challenge progress
router.put('/challenge', updateChallenge);

export default router;
