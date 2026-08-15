import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Stack,
  Divider,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
import WorkoutLogger from './WorkoutLogger';
import { getWorkoutsApi, deleteWorkoutApi } from '../../services/api';

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [muscleFilter, setMuscleFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const { data } = await getWorkoutsApi();
      setWorkouts(data || []);
    } catch (err) {
      console.error('Failed to load workout history:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkoutApi(id);
      fetchWorkouts();
    } catch (err) {
      console.error('Failed to delete workout:', err);
    }
  };

  const filteredWorkouts = workouts.filter((w) => {
    const matchesMuscle = muscleFilter === 'All' || w.muscleGroup === muscleFilter;
    const matchesSearch = w.exerciseName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMuscle && matchesSearch;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Workout Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Log new exercise sessions and review past performance history
        </Typography>
      </Box>

      {/* Workout Logger Component */}
      <Box sx={{ mb: 5 }}>
        <WorkoutLogger onWorkoutAdded={fetchWorkouts} />
      </Box>

      {/* History & Filtering */}
      <Card className="glass-card" sx={{ p: 1 }}>
        <CardContent>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} gap={2} mb={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <FitnessCenterIcon sx={{ color: '#8b5cf6' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Workout History ({filteredWorkouts.length})
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <TextField
                size="small"
                placeholder="Search exercise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <TextField
                size="small"
                select
                value={muscleFilter}
                onChange={(e) => setMuscleFilter(e.target.value)}
                sx={{ minWidth: 140 }}
              >
                {['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body', 'Cardio'].map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Box>

          {filteredWorkouts.length === 0 ? (
            <Box textAlign="center" py={6}>
              <Typography variant="body1" color="text.secondary">
                No workouts match your filter criteria.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {filteredWorkouts.map((w) => (
                <Grid item xs={12} sm={6} md={4} key={w._id}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: '14px',
                      bgcolor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.2s ease',
                      '&:hover': {
                        borderColor: 'rgba(139, 92, 246, 0.4)',
                      },
                    }}
                  >
                    <Box>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                          {w.exerciseName}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(w._id)}
                          sx={{ color: '#f43f5e', p: 0.5 }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Chip
                        label={w.muscleGroup || 'General'}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(139, 92, 246, 0.15)',
                          color: '#a78bfa',
                          fontWeight: 600,
                          mb: 2,
                        }}
                      />

                      <Typography variant="body2" color="text.secondary" paragraph>
                        <strong>{w.sets}</strong> Sets × <strong>{w.reps}</strong> Reps @ <strong>{w.weight}</strong> kg
                      </Typography>

                      {w.notes && (
                        <Typography variant="caption" color="text.secondary" display="block" fontStyle="italic">
                          "{w.notes}"
                        </Typography>
                      )}
                    </Box>

                    <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.06)' }} />

                    <Typography variant="caption" color="text.secondary">
                      📅 {new Date(w.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default WorkoutHistory;
