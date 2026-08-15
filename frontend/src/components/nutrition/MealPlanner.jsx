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
  MenuItem,
  Autocomplete,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Alert,
  Divider,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { getFoodsApi, getMealsApi, logMealApi, deleteMealApi, createFoodApi } from '../../services/api';

const MealPlanner = () => {
  const [foods, setFoods] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  // Form states
  const [foodName, setFoodName] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
  const [calories, setCalories] = useState(350);
  const [protein, setProtein] = useState(25);
  const [carbs, setCarbs] = useState(40);
  const [fats, setFats] = useState(10);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFoods();
    fetchMeals();
  }, []);

  const fetchFoods = async () => {
    try {
      const { data } = await getFoodsApi();
      setFoods(data || []);
    } catch (err) {
      console.error('Error fetching food library:', err);
    }
  };

  const fetchMeals = async () => {
    try {
      const { data } = await getMealsApi();
      setMeals(data || []);
    } catch (err) {
      console.error('Error fetching logged meals:', err);
    }
  };

  const handleFoodSelect = (event, newValue) => {
    if (typeof newValue === 'string') {
      setSelectedFood({ name: newValue });
      setFoodName(newValue);
    } else if (newValue && newValue.name) {
      setSelectedFood(newValue);
      setFoodName(newValue.name);
      setCalories(newValue.calories || 0);
      setProtein(newValue.protein || 0);
      setCarbs(newValue.carbs || 0);
      setFats(newValue.fats || 0);
    } else {
      setSelectedFood(null);
      setFoodName('');
    }
  };

  const handleMealSubmit = async (e) => {
    e.preventDefault();
    if (!foodName) return setError('Please specify a food item name');
    setMessage('');
    setError('');

    try {
      await logMealApi({
        foodName,
        mealType,
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fats: Number(fats),
        date: new Date(date),
        notes,
      });

      // Optionally save to Food Library if new
      if (!foods.some((f) => f.name.toLowerCase() === foodName.toLowerCase())) {
        await createFoodApi({ name: foodName, calories: Number(calories), protein: Number(protein), carbs: Number(carbs), fats: Number(fats) });
        fetchFoods();
      }

      setMessage('Meal logged successfully!');
      setFoodName('');
      setSelectedFood(null);
      setNotes('');
      fetchMeals();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log meal');
    }
  };

  const handleDeleteMeal = async (id) => {
    try {
      await deleteMealApi(id);
      fetchMeals();
    } catch (err) {
      console.error('Failed to delete meal:', err);
    }
  };

  // Nutrition Totals for Selected Date
  const todayMeals = meals.filter((m) => new Date(m.date).toISOString().split('T')[0] === date);
  const totalCal = todayMeals.reduce((acc, m) => acc + (m.calories || 0), 0);
  const totalProtein = todayMeals.reduce((acc, m) => acc + (m.protein || 0), 0);
  const totalCarbs = todayMeals.reduce((acc, m) => acc + (m.carbs || 0), 0);
  const totalFats = todayMeals.reduce((acc, m) => acc + (m.fats || 0), 0);

  // Targets
  const targetCal = 2200;
  const targetProtein = 160;
  const targetCarbs = 220;
  const targetFats = 65;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Nutrition & Meal Planner
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track daily food intake, macronutrients (Protein, Carbs, Fats), and calorie targets
        </Typography>
      </Box>

      {/* Daily Macro Progress Summary */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="glass-card">
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={1}>
                Calories
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#06b6d4' }}>
                {totalCal} <Typography component="span" variant="body2" color="text.secondary">/ {targetCal} kcal</Typography>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, (totalCal / targetCal) * 100)}
                sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.08)' }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="glass-card">
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={1}>
                Protein
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#8b5cf6' }}>
                {totalProtein}g <Typography component="span" variant="body2" color="text.secondary">/ {targetProtein}g</Typography>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, (totalProtein / targetProtein) * 100)}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'rgba(255,255,255,0.08)',
                  '& .MuiLinearProgress-bar': { bgcolor: '#8b5cf6' },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="glass-card">
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={1}>
                Carbohydrates
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#38bdf8' }}>
                {totalCarbs}g <Typography component="span" variant="body2" color="text.secondary">/ {targetCarbs}g</Typography>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, (totalCarbs / targetCarbs) * 100)}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'rgba(255,255,255,0.08)',
                  '& .MuiLinearProgress-bar': { bgcolor: '#38bdf8' },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="glass-card">
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={1}>
                Fats
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#ec4899' }}>
                {totalFats}g <Typography component="span" variant="body2" color="text.secondary">/ {targetFats}g</Typography>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, (totalFats / targetFats) * 100)}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'rgba(255,255,255,0.08)',
                  '& .MuiLinearProgress-bar': { bgcolor: '#ec4899' },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Grid: Log Meal Form & Meal History */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Card className="glass-card" sx={{ p: 1 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                <RestaurantIcon sx={{ color: '#06b6d4' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Log Meal / Food Item
                </Typography>
              </Box>

              {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

              <form onSubmit={handleMealSubmit}>
                <Stack spacing={2}>
                  <Autocomplete
                    freeSolo
                    options={foods}
                    getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.name)}
                    value={selectedFood}
                    onChange={handleFoodSelect}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Food Name"
                        placeholder="Select from database or type custom..."
                        onChange={(e) => setFoodName(e.target.value)}
                        required
                      />
                    )}
                  />

                  <TextField
                    select
                    label="Meal Category"
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                  >
                    {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Calories (kcal)"
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Protein (g)"
                        type="number"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Carbs (g)"
                        type="number"
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Fats (g)"
                        type="number"
                        value={fats}
                        onChange={(e) => setFats(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />

                  <TextField
                    label="Notes / Serving Details"
                    placeholder="e.g. 2 slices, 150g grilled"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #38bdf8 100%)',
                      fontWeight: 700,
                      mt: 1,
                    }}
                  >
                    Log Meal Entry
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Meal History Categorized */}
        <Grid item xs={12} md={7}>
          <Card className="glass-card" sx={{ p: 1, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Logged Meals for {new Date(date).toLocaleDateString()}
              </Typography>

              {todayMeals.length === 0 ? (
                <Box textAlign="center" py={8}>
                  <Typography variant="body1" color="text.secondary">
                    No meals logged yet for this date.
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={3}>
                  {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((category) => {
                    const categoryMeals = todayMeals.filter((m) => m.mealType === category);
                    if (categoryMeals.length === 0) return null;
                    const catCalories = categoryMeals.reduce((sum, m) => sum + m.calories, 0);

                    return (
                      <Box key={category}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                          <Chip
                            label={category}
                            sx={{
                              fontWeight: 800,
                              bgcolor:
                                category === 'Breakfast'
                                  ? 'rgba(6, 182, 212, 0.15)'
                                  : category === 'Lunch'
                                  ? 'rgba(139, 92, 246, 0.15)'
                                  : category === 'Dinner'
                                  ? 'rgba(236, 72, 153, 0.15)'
                                  : 'rgba(16, 185, 129, 0.15)',
                              color:
                                category === 'Breakfast'
                                  ? '#06b6d4'
                                  : category === 'Lunch'
                                  ? '#8b5cf6'
                                  : category === 'Dinner'
                                  ? '#ec4899'
                                  : '#10b981',
                            }}
                          />
                          <Typography variant="caption" color="text.secondary" fontWeight={700}>
                            Subtotal: {catCalories} kcal
                          </Typography>
                        </Box>

                        <Stack spacing={1}>
                          {categoryMeals.map((m) => (
                            <Box
                              key={m._id}
                              sx={{
                                p: 2,
                                borderRadius: '10px',
                                bgcolor: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                  {m.foodName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {m.calories} kcal • P: {m.protein}g | C: {m.carbs}g | F: {m.fats}g
                                </Typography>
                              </Box>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteMeal(m._id)}
                                sx={{ color: '#f43f5e' }}
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MealPlanner;
