import Food from '../models/Food.js';
import Meal from '../models/Meal.js';

// --- Food Database ---
export const getFoods = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    const foods = await Food.find(query).sort({ name: 1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFood = async (req, res) => {
  try {
    const { name, calories, protein, carbs, fats, servingSize } = req.body;
    const food = await Food.create({
      name,
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fats: fats || 0,
      servingSize: servingSize || '100g',
    });
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Meals Logging ---
export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user._id }).sort({ date: -1 });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logMeal = async (req, res) => {
  try {
    const { foodName, mealType, calories, protein, carbs, fats, date, notes } = req.body;
    const meal = await Meal.create({
      user: req.user._id,
      foodName,
      mealType,
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fats: fats || 0,
      date: date || Date.now(),
      notes: notes || '',
    });
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal entry not found' });
    }
    if (meal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this meal' });
    }
    await meal.deleteOne();
    res.json({ message: 'Meal entry removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
