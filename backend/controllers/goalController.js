import Goal from '../models/Goal.js';

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGoal = async (req, res) => {
  try {
    const { title, description, category, target, current, unit, startDate, endDate, status } = req.body;
    const goal = await Goal.create({
      user: req.user._id,
      title,
      description: description || '',
      category,
      target,
      current: current !== undefined ? current : 0,
      unit: unit || 'kg',
      startDate: startDate || Date.now(),
      endDate,
      status: status || 'In Progress',
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this goal' });
    }

    goal.title = req.body.title || goal.title;
    goal.description = req.body.description !== undefined ? req.body.description : goal.description;
    goal.category = req.body.category || goal.category;
    goal.target = req.body.target !== undefined ? req.body.target : goal.target;
    goal.current = req.body.current !== undefined ? req.body.current : goal.current;
    goal.unit = req.body.unit || goal.unit;
    goal.endDate = req.body.endDate || goal.endDate;
    goal.status = req.body.status || goal.status;

    // Automatically complete goal if target is met or reached
    if (goal.current >= goal.target && goal.status === 'In Progress') {
      goal.status = 'Completed';
    }

    const updatedGoal = await goal.save();
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this goal' });
    }
    await goal.deleteOne();
    res.json({ message: 'Goal removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
