import express from 'express';
import {
  getExercises,
  createExercise,
  getWorkouts,
  logWorkout,
  deleteWorkout,
  getWeightEntries,
  logWeightEntry,
} from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/exercises').get(getExercises).post(protect, createExercise);
router.route('/workouts').get(protect, getWorkouts).post(protect, logWorkout);
router.route('/workouts/:id').delete(protect, deleteWorkout);
router.route('/weight-entries').get(protect, getWeightEntries).post(protect, logWeightEntry);

export default router;
