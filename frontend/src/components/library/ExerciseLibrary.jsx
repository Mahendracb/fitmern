import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Alert,
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { getExercisesApi, createExerciseApi } from '../../services/api';

const ExerciseLibrary = () => {
  const [exercises, setExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState('All');
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // New exercise form
  const [newExercise, setNewExercise] = useState({
    name: '',
    muscleGroup: 'Chest',
    equipment: 'Dumbbell',
    description: '',
    instructions: '',
  });

  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchExercises();
  }, [muscleGroup, search]);

  const fetchExercises = async () => {
    try {
      const { data } = await getExercisesApi({ muscleGroup, search });
      setExercises(data || []);
    } catch (err) {
      console.error('Error fetching exercises:', err);
    }
  };

  const handleCreateExercise = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      await createExerciseApi(newExercise);
      setOpenDialog(false);
      setNewExercise({
        name: '',
        muscleGroup: 'Chest',
        equipment: 'Dumbbell',
        description: '',
        instructions: '',
      });
      fetchExercises();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create exercise');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Exercise Library
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Browse movement patterns, muscle group targeting, and step-by-step instructions
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
            fontWeight: 700,
          }}
        >
          Add New Exercise
        </Button>
      </Box>

      {/* Filter Controls */}
      <Card className="glass-card" sx={{ mb: 4, p: 1 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                placeholder="Search exercise by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="Muscle Group"
                value={muscleGroup}
                onChange={(e) => setMuscleGroup(e.target.value)}
              >
                {['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body', 'Cardio'].map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Exercises Grid */}
      <Grid container spacing={3}>
        {exercises.map((ex) => (
          <Grid item xs={12} sm={6} md={4} key={ex._id}>
            <Card className="glass-card" sx={{ height: '100%', p: 1 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {ex.name}
                  </Typography>
                  <Chip
                    label={ex.muscleGroup}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(139, 92, 246, 0.15)',
                      color: '#a78bfa',
                      fontWeight: 700,
                    }}
                  />
                </Box>

                <Stack direction="row" spacing={1} mb={2}>
                  <Chip
                    icon={<FitnessCenterIcon style={{ fontSize: 14 }} />}
                    label={ex.equipment || 'Bodyweight'}
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {ex.description || 'Standard exercise movement pattern.'}
                </Typography>

                {ex.instructions && (
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '8px',
                      bgcolor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px dashed rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <Typography variant="caption" color="#06b6d4" fontWeight={700} display="block" mb={0.5}>
                      INSTRUCTIONS:
                    </Typography>
                    <Typography variant="caption" color="text.secondary" lineHeight={1.4} display="block">
                      {ex.instructions}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create New Exercise Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: { bgcolor: '#121826', borderRadius: '16px', minWidth: 340 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Create New Exercise</DialogTitle>
        <form onSubmit={handleCreateExercise}>
          <DialogContent>
            {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Exercise Name"
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                required
              />
              <TextField
                fullWidth
                select
                label="Muscle Group"
                value={newExercise.muscleGroup}
                onChange={(e) => setNewExercise({ ...newExercise, muscleGroup: e.target.value })}
              >
                {['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body', 'Cardio'].map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                label="Equipment Needed"
                value={newExercise.equipment}
                onChange={(e) => setNewExercise({ ...newExercise, equipment: e.target.value })}
              >
                {['Dumbbell', 'Barbell', 'Machine', 'Cable', 'Bodyweight', 'Kettlebell', 'Resistance Band', 'Cardio Machine', 'Other'].map((eq) => (
                  <MenuItem key={eq} value={eq}>
                    {eq}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Short Description"
                value={newExercise.description}
                onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Step-by-step Instructions"
                value={newExercise.instructions}
                onChange={(e) => setNewExercise({ ...newExercise, instructions: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setOpenDialog(false)} sx={{ color: '#94a3b8' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)' }}
            >
              Save Exercise
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default ExerciseLibrary;
