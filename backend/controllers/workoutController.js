import Exercise from '../models/Exercise.js';
import Workout from '../models/Workout.js';
import WeightEntry from '../models/WeightEntry.js';

// --- Exercise Library Controllers ---
export const getExercises = async (req, res) => {
  try {
    const { muscleGroup, search } = req.query;
    let query = {};
    if (muscleGroup && muscleGroup !== 'All') {
      query.muscleGroup = muscleGroup;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    const exercises = await Exercise.find(query).sort({ name: 1 });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExercise = async (req, res) => {
  try {
    const { name, description, muscleGroup, equipment, instructions } = req.body;
    const existing = await Exercise.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Exercise with this name already exists' });
    }
    const exercise = await Exercise.create({ name, description, muscleGroup, equipment, instructions });
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Workout Logging Controllers ---
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logWorkout = async (req, res) => {
  try {
    const { exerciseName, muscleGroup, sets, reps, weight, date, notes } = req.body;
    const workout = await Workout.create({
      user: req.user._id,
      exerciseName,
      muscleGroup: muscleGroup || 'General',
      sets,
      reps,
      weight,
      date: date || Date.now(),
      notes: notes || '',
    });
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout entry not found' });
    }
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this workout' });
    }
    await workout.deleteOne();
    res.json({ message: 'Workout removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Weight Tracking Controllers ---
export const getWeightEntries = async (req, res) => {
  try {
    const entries = await WeightEntry.find({ user: req.user._id }).sort({ date: 1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logWeightEntry = async (req, res) => {
  try {
    const { weight, date } = req.body;
    const entry = await WeightEntry.create({
      user: req.user._id,
      weight,
      date: date || Date.now(),
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
