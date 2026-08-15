import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRoutes from './routes/userRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'FitMERN Express API', time: new Date() });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/ai', aiRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Database connection & Server Startup
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitmern';

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`FitMERN Express Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.warn(`MongoDB Connection Failed: ${err.message}`);
    console.log('Starting Express API server in standalone mode...');
    app.listen(PORT, () => {
      console.log(`FitMERN Express Backend running on http://localhost:${PORT}`);
    });
  });
