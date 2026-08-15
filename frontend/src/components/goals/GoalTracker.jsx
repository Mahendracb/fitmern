import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { getGoalsApi, createGoalApi, updateGoalApi, deleteGoalApi } from '../../services/api';

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Weight',
    target: 75,
    current: 82,
    unit: 'kg',
    endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    status: 'In Progress',
  });

  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const { data } = await getGoalsApi();
      setGoals(data || []);
    } catch (err) {
      console.error('Failed to load fitness goals:', err);
    }
  };

  const handleOpenCreate = () => {
    setEditingGoal(null);
    setFormData({
      title: '',
      description: '',
      category: 'Weight',
      target: 75,
      current: 82,
      unit: 'kg',
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      status: 'In Progress',
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description || '',
      category: goal.category,
      target: goal.target,
      current: goal.current,
      unit: goal.unit || 'kg',
      endDate: goal.endDate ? goal.endDate.split('T')[0] : '',
      status: goal.status,
    });
    setOpenDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      if (editingGoal) {
        await updateGoalApi(editingGoal._id, {
          ...formData,
          target: Number(formData.target),
          current: Number(formData.current),
        });
      } else {
        await createGoalApi({
          ...formData,
          target: Number(formData.target),
          current: Number(formData.current),
        });
      }
      setOpenDialog(false);
      fetchGoals();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save goal');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGoalApi(id);
      fetchGoals();
    } catch (err) {
      console.error('Failed to delete goal:', err);
    }
  };

  const filteredGoals = goals.filter((g) => categoryFilter === 'All' || g.category === categoryFilter);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Goal Tracking & Target Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Set target metrics for weight loss, strength gains, nutrition, and body measurements
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
            fontWeight: 700,
          }}
        >
          Set New Goal
        </Button>
      </Box>

      {/* Category Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.08)', mb: 4 }}>
        <Tabs
          value={categoryFilter}
          onChange={(e, val) => setCategoryFilter(val)}
          textColor="primary"
          indicatorColor="primary"
        >
          {['All', 'Weight', 'Workout', 'Nutrition', 'Measurement'].map((cat) => (
            <Tab key={cat} label={cat} value={cat} />
          ))}
        </Tabs>
      </Box>

      {/* Goals Grid */}
      {filteredGoals.length === 0 ? (
        <Box textAlign="center" py={8} className="glass-card">
          <Typography variant="h6" color="text.secondary" mb={2}>
            No goals found for category "{categoryFilter}".
          </Typography>
          <Button variant="outlined" onClick={handleOpenCreate}>
            Create Goal Now
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredGoals.map((g) => {
            const pct = Math.min(100, Math.round((g.current / g.target) * 100));
            return (
              <Grid item xs={12} sm={6} md={4} key={g._id}>
                <Card className="glass-card" sx={{ height: '100%', p: 1 }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <Box>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                          {g.title}
                        </Typography>
                        <Box>
                          <IconButton size="small" onClick={() => handleOpenEdit(g)} sx={{ color: '#06b6d4' }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDelete(g._id)} sx={{ color: '#f43f5e' }}>
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>

                      <Stack direction="row" spacing={1} mb={2}>
                        <Chip
                          label={g.category}
                          size="small"
                          sx={{ bgcolor: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', fontWeight: 600 }}
                        />
                        <Chip
                          label={g.status}
                          size="small"
                          color={
                            g.status === 'Completed'
                              ? 'success'
                              : g.status === 'In Progress'
                              ? 'info'
                              : g.status === 'Failed'
                              ? 'error'
                              : 'default'
                          }
                          sx={{ fontWeight: 600 }}
                        />
                      </Stack>

                      {g.description && (
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {g.description}
                        </Typography>
                      )}

                      <Box mb={2}>
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                          <Typography variant="caption" color="text.secondary">
                            Progress: {g.current} / {g.target} {g.unit}
                          </Typography>
                          <Typography variant="caption" fontWeight={700} color="#10b981">
                            {pct}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.08)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(90deg, #10b981, #06b6d4)',
                            },
                          }}
                        />
                      </Box>
                    </Box>

                    <Typography variant="caption" color="text.secondary" display="block">
                      🎯 Target Date: {new Date(g.endDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Goal Dialog Form */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: { bgcolor: '#121826', borderRadius: '16px', minWidth: 340 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          {editingGoal ? 'Edit Fitness Goal' : 'Create New Fitness Goal'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Goal Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <TextField
                fullWidth
                select
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {['Weight', 'Workout', 'Nutrition', 'Measurement'].map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Target Value"
                    type="number"
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Current Progress"
                    type="number"
                    value={formData.current}
                    onChange={(e) => setFormData({ ...formData, current: e.target.value })}
                    required
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Unit of Measurement"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g. kg, lbs, workouts, kcal, cm"
                />
              </Grid>

              <TextField
                fullWidth
                select
                label="Goal Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {['Not Started', 'In Progress', 'Completed', 'Failed'].map((st) => (
                  <MenuItem key={st} value={st}>
                    {st}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Target End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
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
              sx={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
            >
              Save Goal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default GoalTracker;
