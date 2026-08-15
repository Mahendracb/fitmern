import express from 'express';
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from '../controllers/goalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/goals').get(protect, getGoals).post(protect, createGoal);
router.route('/goals/:id').put(protect, updateGoal).delete(protect, deleteGoal);

export default router;
