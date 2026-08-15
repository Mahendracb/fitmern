import User from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';

// @desc    Register a new user
// @route   POST /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, age, weight, height, gender, fitnessGoal, activityLevel } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    const user = await User.create({
      username,
      email,
      password,
      age: age || null,
      weight: weight || null,
      height: height || null,
      gender: gender || '',
      fitnessGoal: fitnessGoal || 'General Fitness',
      activityLevel: activityLevel || 'Moderately Active',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Allow login by email or username
    const user = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: email }],
    });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout user (stateless JWT client cleanup)
// @route   POST /api/users/logout
export const logoutUser = async (req, res) => {
  res.json({ message: 'Successfully logged out' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.age = req.body.age !== undefined ? req.body.age : user.age;
      user.weight = req.body.weight !== undefined ? req.body.weight : user.weight;
      user.height = req.body.height !== undefined ? req.body.height : user.height;
      user.gender = req.body.gender !== undefined ? req.body.gender : user.gender;
      user.fitnessGoal = req.body.fitnessGoal || user.fitnessGoal;
      user.activityLevel = req.body.activityLevel || user.activityLevel;
      user.medicalConditions = req.body.medicalConditions !== undefined ? req.body.medicalConditions : user.medicalConditions;
      user.dietaryRestrictions = req.body.dietaryRestrictions !== undefined ? req.body.dietaryRestrictions : user.dietaryRestrictions;
      user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        age: updatedUser.age,
        weight: updatedUser.weight,
        height: updatedUser.height,
        gender: updatedUser.gender,
        fitnessGoal: updatedUser.fitnessGoal,
        activityLevel: updatedUser.activityLevel,
        medicalConditions: updatedUser.medicalConditions,
        dietaryRestrictions: updatedUser.dietaryRestrictions,
        dateOfBirth: updatedUser.dateOfBirth,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
