import ProgressEntry from '../models/ProgressEntry.js';
import BodyMeasurement from '../models/BodyMeasurement.js';

// --- Daily Progress Entries ---
export const getProgressEntries = async (req, res) => {
  try {
    const entries = await ProgressEntry.find({ user: req.user._id }).sort({ date: 1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logProgressEntry = async (req, res) => {
  try {
    const { weight, caloriesConsumed, workoutsCompleted, date } = req.body;
    const entry = await ProgressEntry.create({
      user: req.user._id,
      weight: weight || 0,
      caloriesConsumed: caloriesConsumed || 0,
      workoutsCompleted: workoutsCompleted || 0,
      date: date || Date.now(),
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Body Measurements ---
export const getBodyMeasurements = async (req, res) => {
  try {
    const measurements = await BodyMeasurement.find({ user: req.user._id }).sort({ date: 1 });
    res.json(measurements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logBodyMeasurement = async (req, res) => {
  try {
    const { chest, waist, hips, biceps, thighs, date } = req.body;
    const measurement = await BodyMeasurement.create({
      user: req.user._id,
      chest: chest || 0,
      waist: waist || 0,
      hips: hips || 0,
      biceps: biceps || 0,
      thighs: thighs || 0,
      date: date || Date.now(),
    });
    res.status(201).json(measurement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
