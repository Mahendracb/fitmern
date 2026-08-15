import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import FitnessAIChatbot from './components/chat/FitnessAIChatbot';

import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import UserProfile from './components/profile/UserProfile';
import WorkoutHistory from './components/workouts/WorkoutHistory';
import ExerciseLibrary from './components/library/ExerciseLibrary';
import MealPlanner from './components/nutrition/MealPlanner';
import GoalTracker from './components/goals/GoalTracker';
import ProgressCharts from './components/progress/ProgressCharts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Authenticated Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/workouts" element={<WorkoutHistory />} />
                  <Route path="/exercises" element={<ExerciseLibrary />} />
                  <Route path="/nutrition" element={<MealPlanner />} />
                  <Route path="/goals" element={<GoalTracker />} />
                  <Route path="/progress" element={<ProgressCharts />} />
                </Route>
              </Routes>
            </Box>
            <FitnessAIChatbot />
            <Footer />
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
