import express from 'express';
import {
  getProgressEntries,
  logProgressEntry,
  getBodyMeasurements,
  logBodyMeasurement,
} from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/progress-entries').get(protect, getProgressEntries).post(protect, logProgressEntry);
router.route('/body-measurements').get(protect, getBodyMeasurements).post(protect, logBodyMeasurement);

export default router;
