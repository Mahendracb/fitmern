import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  LinearProgress,
  IconButton,
  Chip,
  Paper,
  CircularProgress,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FlagIcon from '@mui/icons-material/Flag';
import ScaleIcon from '@mui/icons-material/MonitorWeight';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getWorkoutsApi, getMealsApi, getGoalsApi, getWeightEntriesApi } from '../../services/api';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [goals, setGoals] = useState([]);
  const [weightEntries, setWeightEntries] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [wRes, mRes, gRes, wtRes] = await Promise.all([
        getWorkoutsApi(),
        getMealsApi(),
        getGoalsApi(),
        getWeightEntriesApi(),
      ]);
      setWorkouts(wRes.data || []);
      setMeals(mRes.data || []);
      setGoals(gRes.data || []);
      setWeightEntries(wtRes.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayMeals = meals.filter((m) => new Date(m.date).toISOString().split('T')[0] === todayStr);
  const todayCalories = todayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
  const calorieTarget = 2200;

  const latestWeight = weightEntries.length > 0
    ? weightEntries[weightEntries.length - 1].weight
    : profile?.weight || '--';

  const activeGoals = goals.filter((g) => g.status === 'In Progress');

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress sx={{ color: '#8b5cf6' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Handcrafted Welcome Banner */}
      <Box
        className="handcrafted-card"
        sx={{
          p: { xs: 3, md: 4 },
          mb: 5,
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.12) 100%)',
        }}
      >
        <span className="tape-badge">📌 DAILY OVERVIEW BOARD</span>

        <Grid container spacing={2} alignItems="center" sx={{ mt: 0.5 }}>
          <Grid item xs={12} md={8}>
            <Typography className="font-sketch" sx={{ color: '#06b6d4', fontSize: '1.1rem' }}>
              ✦ PERSONAL FITNESS JOURNAL ✦
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 0.5, mb: 1 }}>
              Welcome back, <span className="gradient-text">{user?.username || 'Athlete'}</span>! ✍️
            </Typography>
            <Typography className="font-handwritten" sx={{ fontSize: '1.4rem', color: '#fef08a' }}>
              Goal: {profile?.fitnessGoal || 'General Fitness'} • Target Activity: {profile?.activityLevel || 'Active'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
            <Button
              variant="contained"
              onClick={() => navigate('/workouts')}
              startIcon={<AddIcon />}
              className="tactile-btn"
              sx={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                fontWeight: 700,
                px: 3,
                py: 1.4,
              }}
            >
              Log Workout Session
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {/* Metric 1 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box className="handcrafted-card" sx={{ p: 2.5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Typography className="font-sketch" sx={{ fontSize: '0.95rem', color: '#94a3b8' }}>
                TODAY'S CALORIES
              </Typography>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: 'rgba(6, 182, 212, 0.15)',
                  color: '#06b6d4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RestaurantIcon fontSize="small" />
              </Box>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              {todayCalories} <Typography component="span" variant="body2" color="text.secondary">/ {calorieTarget} kcal</Typography>
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(100, (todayCalories / calorieTarget) * 100)}
              sx={{
                height: 7,
                borderRadius: 4,
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #06b6d4, #38bdf8)',
                },
              }}
            />
          </Box>
        </Grid>

        {/* Metric 2 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box className="handcrafted-card" sx={{ p: 2.5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Typography className="font-sketch" sx={{ fontSize: '0.95rem', color: '#94a3b8' }}>
                WORKOUT SESSIONS
              </Typography>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: 'rgba(139, 92, 246, 0.15)',
                  color: '#8b5cf6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FitnessCenterIcon fontSize="small" />
              </Box>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              {workouts.length} <Typography component="span" variant="body2" color="text.secondary">Completed</Typography>
            </Typography>
            <Typography className="font-handwritten" sx={{ fontSize: '1.2rem', color: '#a78bfa' }}>
              ✓ Total sessions recorded
            </Typography>
          </Box>
        </Grid>

        {/* Metric 3 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box className="handcrafted-card" sx={{ p: 2.5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Typography className="font-sketch" sx={{ fontSize: '0.95rem', color: '#94a3b8' }}>
                CURRENT WEIGHT
              </Typography>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: 'rgba(236, 72, 153, 0.15)',
                  color: '#ec4899',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ScaleIcon fontSize="small" />
              </Box>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              {latestWeight} <Typography component="span" variant="body2" color="text.secondary">kg</Typography>
            </Typography>
            <Typography className="font-handwritten" sx={{ fontSize: '1.2rem', color: '#ec4899' }}>
              ⚖️ Latest measurement
            </Typography>
          </Box>
        </Grid>

        {/* Metric 4 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box className="handcrafted-card" sx={{ p: 2.5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Typography className="font-sketch" sx={{ fontSize: '0.95rem', color: '#94a3b8' }}>
                ACTIVE GOALS
              </Typography>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FlagIcon fontSize="small" />
              </Box>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              {activeGoals.length} <Typography component="span" variant="body2" color="text.secondary">In Progress</Typography>
            </Typography>
            <Typography className="font-handwritten" sx={{ fontSize: '1.2rem', color: '#10b981' }}>
              🎯 Out of {goals.length} goals
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Main Content Layout */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={7}>
          <Box className="handcrafted-card" sx={{ mb: 4, p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Recent Workout Entries
                </Typography>
                <Typography className="font-handwritten" sx={{ fontSize: '1.1rem', color: '#94a3b8' }}>
                  Hand-logged exercise history
                </Typography>
              </Box>
              <Button
                size="small"
                onClick={() => navigate('/workouts')}
                endIcon={<ArrowForwardIcon />}
                sx={{ color: '#8b5cf6', fontWeight: 700 }}
              >
                View History
              </Button>
            </Box>

            {workouts.length === 0 ? (
              <Box textAlign="center" py={4}>
                <Typography className="font-handwritten" sx={{ fontSize: '1.3rem', color: '#94a3b8' }} mb={2}>
                  No workout logs written yet.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/workouts')}
                  className="tactile-btn"
                >
                  Log First Exercise
                </Button>
              </Box>
            ) : (
              <Stack spacing={2}>
                {workouts.slice(0, 4).map((w) => (
                  <Box
                    key={w._id}
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      bgcolor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: '10px',
                          bgcolor: 'rgba(139, 92, 246, 0.12)',
                          color: '#8b5cf6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FitnessCenterIcon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {w.exerciseName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {w.sets} sets × {w.reps} reps @ {w.weight} kg • {w.muscleGroup}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography className="font-handwritten" sx={{ fontSize: '1.1rem', color: '#f59e0b' }}>
                      📅 {new Date(w.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper
                onClick={() => navigate('/nutrition')}
                className="handcrafted-card"
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <RestaurantIcon sx={{ fontSize: 36, color: '#06b6d4', mb: 1 }} />
                <Typography variant="subtitle1" fontWeight={800}>
                  Meal Planner
                </Typography>
                <Typography className="font-handwritten" sx={{ fontSize: '1.1rem', color: '#94a3b8' }}>
                  Log Macros & Food Intake
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper
                onClick={() => navigate('/progress')}
                className="handcrafted-card"
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <TrendingUpIcon sx={{ fontSize: 36, color: '#10b981', mb: 1 }} />
                <Typography variant="subtitle1" fontWeight={800}>
                  Progress Charts
                </Typography>
                <Typography className="font-handwritten" sx={{ fontSize: '1.1rem', color: '#94a3b8' }}>
                  Visual Growth Analytics
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column: Goal Stamps */}
        <Grid item xs={12} md={5}>
          <Box className="handcrafted-card" sx={{ p: 3, height: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Active Goals Board
                </Typography>
                <Typography className="font-handwritten" sx={{ fontSize: '1.1rem', color: '#94a3b8' }}>
                  Milestones & Target Status
                </Typography>
              </Box>
              <Button
                size="small"
                onClick={() => navigate('/goals')}
                sx={{ color: '#10b981', fontWeight: 700 }}
              >
                Manage
              </Button>
            </Box>

            {goals.length === 0 ? (
              <Box textAlign="center" py={5}>
                <Typography className="font-handwritten" sx={{ fontSize: '1.3rem', color: '#94a3b8' }} mb={2}>
                  No goal targets set yet.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/goals')}
                  className="tactile-btn"
                  sx={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
                >
                  Set Target Goal
                </Button>
              </Box>
            ) : (
              <Stack spacing={2.5}>
                {goals.slice(0, 4).map((g) => {
                  const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                  return (
                    <Box
                      key={g._id}
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        bgcolor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {g.title}
                        </Typography>
                        <span className={g.status === 'Completed' ? 'stamp-completed' : 'stamp-in-progress'}>
                          {g.status.toUpperCase()}
                        </span>
                      </Box>
                      <Typography className="font-handwritten" sx={{ fontSize: '1.1rem', color: '#94a3b8' }} mb={1}>
                        Target: {g.current} / {g.target} {g.unit} ({pct}%)
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={pct}
                        sx={{
                          height: 7,
                          borderRadius: 4,
                          bgcolor: 'rgba(255, 255, 255, 0.08)',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #10b981, #06b6d4)',
                          },
                        }}
                      />
                    </Box>
                  );
                })}
              </Stack>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
