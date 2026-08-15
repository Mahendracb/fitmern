import User from '../models/User.js';
import Workout from '../models/Workout.js';
import Meal from '../models/Meal.js';
import Goal from '../models/Goal.js';

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Gemini API key is not configured' });
    }

    // Gather rich user context for personalized AI coaching
    const user = await User.findById(req.user._id).select('-password');
    const recentWorkouts = await Workout.find({ user: req.user._id }).sort({ date: -1 }).limit(3);
    const todayStr = new Date().toISOString().split('T')[0];
    const todayMeals = await Meal.find({ user: req.user._id });
    const todayCalories = todayMeals
      .filter((m) => new Date(m.date).toISOString().split('T')[0] === todayStr)
      .reduce((sum, m) => sum + m.calories, 0);

    const activeGoals = await Goal.find({ user: req.user._id, status: 'In Progress' });

    const systemInstruction = `You are AuraFit AI, an expert personal fitness coach and nutritionist.
User Profile:
- Name: ${user.username}
- Goal: ${user.fitnessGoal || 'General Fitness'}
- Weight: ${user.weight ? user.weight + ' kg' : 'Not specified'}
- Height: ${user.height ? user.height + ' cm' : 'Not specified'}
- Activity Level: ${user.activityLevel || 'Active'}
- Today's Calorie Intake: ${todayCalories} kcal
- Active Goals: ${activeGoals.map((g) => g.title).join(', ') || 'None'}
- Recent Workouts: ${recentWorkouts.map((w) => w.exerciseName + ' (' + w.sets + 'x' + w.reps + ')').join(', ') || 'None'}

Provide concise, friendly, highly actionable fitness, diet, or workout advice tailored specifically to this user. Use bullet points and emoji formatting where helpful.`;

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `${systemInstruction}\n\nUser Question: ${message}`,
          },
        ],
      },
    ];

    // Request to active Gemini 2.5 Flash model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error('Gemini API Error:', data.error);
      return res.status(500).json({ message: data.error.message || 'Gemini API Error' });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here to help you hit your fitness goals! Could you rephrase your question?";

    res.json({ reply });
  } catch (error) {
    console.error('AI Controller Error:', error.message);
    res.status(500).json({ message: error.message || 'Server error communicating with Gemini AI' });
  }
};
