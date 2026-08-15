import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Alert,
} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AddIcon from '@mui/icons-material/Add';
import StraightenIcon from '@mui/icons-material/Straighten';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  getWeightEntriesApi,
  getMealsApi,
  getWorkoutsApi,
  getBodyMeasurementsApi,
  logBodyMeasurementApi,
} from '../../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ProgressCharts = () => {
  const [weightLogs, setWeightLogs] = useState([]);
  const [mealsLogs, setMealsLogs] = useState([]);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [measurementLogs, setMeasurementLogs] = useState([]);

  const [openMeasurementDialog, setOpenMeasurementDialog] = useState(false);
  const [measurementForm, setMeasurementForm] = useState({
    chest: 100,
    waist: 82,
    hips: 95,
    biceps: 36,
    thighs: 58,
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [wtRes, mRes, wRes, bmRes] = await Promise.all([
        getWeightEntriesApi(),
        getMealsApi(),
        getWorkoutsApi(),
        getBodyMeasurementsApi(),
      ]);

      setWeightLogs(wtRes.data || []);
      setMealsLogs(mRes.data || []);
      setWorkoutLogs(wRes.data || []);
      setMeasurementLogs(bmRes.data || []);
    } catch (err) {
      console.error('Failed to load analytics charts data:', err);
    }
  };

  const handleSaveMeasurement = async (e) => {
    e.preventDefault();
    try {
      await logBodyMeasurementApi({
        chest: Number(measurementForm.chest),
        waist: Number(measurementForm.waist),
        hips: Number(measurementForm.hips),
        biceps: Number(measurementForm.biceps),
        thighs: Number(measurementForm.thighs),
        date: new Date(measurementForm.date),
      });
      setOpenMeasurementDialog(false);
      fetchAnalyticsData();
    } catch (err) {
      console.error('Failed to log measurement:', err);
    }
  };

  // Prepare Weight Chart Data
  const weightLabels = weightLogs.map((w) => new Date(w.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
  const weightValues = weightLogs.map((w) => w.weight);

  const weightChartData = {
    labels: weightLabels.length > 0 ? weightLabels : ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: weightValues.length > 0 ? weightValues : [82, 81.5, 81.0, 80.4, 79.8],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Prepare Body Measurements Chart Data
  const measurementLabels = measurementLogs.map((m) => new Date(m.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
  const measurementChartData = {
    labels: measurementLabels.length > 0 ? measurementLabels : ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Chest (cm)',
        data: measurementLogs.map((m) => m.chest).length ? measurementLogs.map((m) => m.chest) : [100, 101, 102, 103],
        borderColor: '#06b6d4',
      },
      {
        label: 'Waist (cm)',
        data: measurementLogs.map((m) => m.waist).length ? measurementLogs.map((m) => m.waist) : [85, 84, 83, 82],
        borderColor: '#f43f5e',
      },
      {
        label: 'Biceps (cm)',
        data: measurementLogs.map((m) => m.biceps).length ? measurementLogs.map((m) => m.biceps) : [35, 35.5, 36, 36.5],
        borderColor: '#10b981',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#f8fafc', font: { family: 'Plus Jakarta Sans' } },
      },
    },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Progress Analytics & Visual Charts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Analyze weight progression, body dimension changes, and workout volume statistics
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<StraightenIcon />}
          onClick={() => setOpenMeasurementDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
            fontWeight: 700,
          }}
        >
          Log Body Measurement
        </Button>
      </Box>

      {/* Charts Grid */}
      <Grid container spacing={4}>
        {/* Weight Progression Chart */}
        <Grid item xs={12} md={6}>
          <Card className="glass-card" sx={{ p: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Weight History Trend (kg)
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line data={weightChartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Body Measurements Chart */}
        <Grid item xs={12} md={6}>
          <Card className="glass-card" sx={{ p: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Body Measurements Trend (Chest, Waist, Biceps)
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line data={measurementChartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Body Measurements Log Dialog */}
      <Dialog
        open={openMeasurementDialog}
        onClose={() => setOpenMeasurementDialog(false)}
        PaperProps={{
          sx: { bgcolor: '#121826', borderRadius: '16px', minWidth: 340 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Log Body Measurements</DialogTitle>
        <form onSubmit={handleSaveMeasurement}>
          <DialogContent>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Chest (cm)"
                    type="number"
                    value={measurementForm.chest}
                    onChange={(e) => setMeasurementForm({ ...measurementForm, chest: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Waist (cm)"
                    type="number"
                    value={measurementForm.waist}
                    onChange={(e) => setMeasurementForm({ ...measurementForm, waist: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Hips (cm)"
                    type="number"
                    value={measurementForm.hips}
                    onChange={(e) => setMeasurementForm({ ...measurementForm, hips: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Biceps (cm)"
                    type="number"
                    value={measurementForm.biceps}
                    onChange={(e) => setMeasurementForm({ ...measurementForm, biceps: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Thighs (cm)"
                    type="number"
                    value={measurementForm.thighs}
                    onChange={(e) => setMeasurementForm({ ...measurementForm, thighs: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={measurementForm.date}
                    onChange={(e) => setMeasurementForm({ ...measurementForm, date: e.target.value })}
                    required
                  />
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setOpenMeasurementDialog(false)} sx={{ color: '#94a3b8' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)' }}
            >
              Save Measurements
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default ProgressCharts;
