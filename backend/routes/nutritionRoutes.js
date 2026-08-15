import express from 'express';
import {
  getFoods,
  createFood,
  getMeals,
  logMeal,
  deleteMeal,
} from '../controllers/nutritionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/foods').get(getFoods).post(protect, createFood);
router.route('/meals').get(protect, getMeals).post(protect, logMeal);
router.route('/meals/:id').delete(protect, deleteMeal);

export default router;
