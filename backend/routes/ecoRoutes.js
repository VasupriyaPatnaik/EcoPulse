import express from 'express';
import { addEcoActivity, getDashboardData, updateChallenge, getLeaderboard } from '../controllers/ecoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Add eco activity
router.post('/activity', addEcoActivity);

// Get dashboard data
router.get('/dashboard', getDashboardData);

// Get leaderboard data
router.get('/leaderboard', getLeaderboard);

// Update challenge progress
router.put('/challenge', updateChallenge);

export default router;
