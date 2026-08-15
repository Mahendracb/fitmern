import React, { useState, useEffect } from 'react';
import {
  Box,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Autocomplete,
  MenuItem,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ScaleIcon from '@mui/icons-material/MonitorWeight';
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import { getExercisesApi, logWorkoutApi, logWeightEntryApi } from '../../services/api';

const WorkoutLogger = ({ onWorkoutAdded }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseName, setExerciseName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('Chest');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(50);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const [bodyWeight, setBodyWeight] = useState('');
  const [weightDate, setWeightDate] = useState(new Date().toISOString().split('T')[0]);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const { data } = await getExercisesApi();
      setExercises(data || []);
    } catch (err) {
      console.error('Failed to load exercise library:', err);
    }
  };

  const handleExerciseChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setSelectedExercise({ name: newValue });
      setExerciseName(newValue);
    } else if (newValue && newValue.name) {
      setSelectedExercise(newValue);
      setExerciseName(newValue.name);
      if (newValue.muscleGroup) {
        setMuscleGroup(newValue.muscleGroup);
      }
    } else {
      setSelectedExercise(null);
      setExerciseName('');
    }
  };

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    if (!exerciseName) return setError('Please select or type an exercise name');
    setMessage('');
    setError('');
    setSubmitting(true);

    try {
      await logWorkoutApi({
        exerciseName,
        muscleGroup,
        sets: Number(sets),
        reps: Number(reps),
        weight: Number(weight),
        date: new Date(date),
        notes,
      });
      setMessage('Workout entry recorded in journal!');
      setExerciseName('');
      setSelectedExercise(null);
      setNotes('');
      setSubmitting(false);
      if (onWorkoutAdded) onWorkoutAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log workout');
      setSubmitting(false);
    }
  };

  const handleWeightSubmit = async (e) => {
    e.preventDefault();
    if (!bodyWeight) return setError('Please enter body weight');
    setMessage('');
    setError('');
    try {
      await logWeightEntryApi({
        weight: Number(bodyWeight),
        date: new Date(weightDate),
      });
      setMessage('Daily body weight entry logged!');
      setBodyWeight('');
      if (onWorkoutAdded) onWorkoutAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log weight');
    }
  };

  return (
    <Box className="handcrafted-card" sx={{ p: 2, position: 'relative' }}>
      <span className="tape-badge">✍️ WORKOUT LOGBOOK</span>

      <CardContent sx={{ mt: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.08)', mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(e, val) => setTabValue(val)}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab icon={<FitnessCenterIcon />} iconPosition="start" label="Log Exercise Session" />
            <Tab icon={<ScaleIcon />} iconPosition="start" label="Record Weight Entry" />
          </Tabs>
        </Box>

        {message && <Alert severity="success" sx={{ mb: 3, borderRadius: '10px' }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>{error}</Alert>}

        {tabValue === 0 ? (
          <form onSubmit={handleWorkoutSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Autocomplete
                  freeSolo
                  options={exercises}
                  getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
                  value={selectedExercise}
                  onChange={handleExerciseChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Exercise Name"
                      placeholder="e.g. Bench Press, Squat, Pull-Ups"
                      onChange={(e) => setExerciseName(e.target.value)}
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  select
                  label="Target Muscle Group"
                  value={muscleGroup}
                  onChange={(e) => setMuscleGroup(e.target.value)}
                >
                  {['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body', 'Cardio'].map((mg) => (
                    <MenuItem key={mg} value={mg}>
                      {mg}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Sets"
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Reps / Set"
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Handwritten Notes (Optional)"
                  placeholder="e.g. Explosive reps, great pump"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                  startIcon={<SaveIcon />}
                  className="tactile-btn"
                  sx={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                    fontWeight: 700,
                    px: 4,
                    py: 1.3,
                  }}
                >
                  {submitting ? 'Writing Entry...' : 'Save Workout Entry'}
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <form onSubmit={handleWeightSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Current Body Weight (kg)"
                  type="number"
                  value={bodyWeight}
                  onChange={(e) => setBodyWeight(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={weightDate}
                  onChange={(e) => setWeightDate(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<ScaleIcon />}
                  className="tactile-btn"
                  sx={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
                    fontWeight: 700,
                    px: 4,
                    py: 1.3,
                  }}
                >
                  Log Weight Entry
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </CardContent>
    </Box>
  );
};

export default WorkoutLogger;
