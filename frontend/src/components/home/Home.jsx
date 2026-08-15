import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FlagIcon from '@mui/icons-material/Flag';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box sx={{ pb: 10 }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: 6 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6.5}>
            {/* Handwritten Gold Sticker Accent */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgba(245, 158, 11, 0.18)',
                color: '#fef08a',
                px: 2,
                py: 0.8,
                borderRadius: '8px',
                border: '1px dashed rgba(251, 191, 36, 0.6)',
                transform: 'rotate(-1.5deg)',
                mb: 3,
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 18, color: '#fbbf24' }} />
              <Typography className="font-handwritten" sx={{ fontSize: '1.45rem', fontWeight: 700 }}>
                ✨ Handcrafted FitnessTracker Journal
              </Typography>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                lineHeight: 1.12,
                mb: 3,
                fontWeight: 800,
              }}
            >
              Elevate Your Growth with <span className="gradient-text">FitnessTracker</span> Logbook
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 400, mb: 4, maxWidth: 540, lineHeight: 1.6 }}
            >
              A neat, realistic tactile fitness and nutrition experience. Record workouts, monitor macros, set target milestones, and visualize long-term trends.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
              {user ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/dashboard')}
                  endIcon={<ArrowForwardIcon />}
                  className="tactile-btn"
                  sx={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
                    color: '#090d16',
                    py: 1.6,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 800,
                  }}
                >
                  Open Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    endIcon={<ArrowForwardIcon />}
                    className="tactile-btn"
                    sx={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
                      color: '#090d16',
                      py: 1.6,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 800,
                    }}
                  >
                    Start FitnessTracker
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    className="tactile-btn"
                    sx={{
                      borderColor: 'rgba(245, 158, 11, 0.4)',
                      color: '#f8fafc',
                      py: 1.6,
                      px: 4,
                      fontSize: '1.1rem',
                    }}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </Stack>

            {/* Quote Note */}
            <Box
              sx={{
                p: 2,
                bgcolor: 'rgba(255, 255, 255, 0.02)',
                borderLeft: '3px solid #f59e0b',
                borderRadius: '0 12px 12px 0',
              }}
            >
              <Typography className="font-handwritten" sx={{ fontSize: '1.55rem', color: '#fbbf24' }}>
                "Small daily disciplines repeated with consistency lead to great achievements."
              </Typography>
            </Box>
          </Grid>

          {/* 3D Hero Render */}
          <Grid item xs={12} md={5.5}>
            <Box sx={{ position: 'relative' }}>
              <Box
                className="handcrafted-card"
                sx={{
                  p: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'center',
                }}
              >
                <span className="tape-badge">✨ FITNESSTRACKER LOG</span>

                <Box
                  component="img"
                  src="/aurafit_hero.png"
                  alt="FitnessTracker Journal Render"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 350,
                    objectFit: 'cover',
                    borderRadius: '14px',
                    mb: 2,
                    mt: 1,
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                  }}
                />

                <Box textAlign="left" sx={{ px: 1 }}>
                  <Typography className="font-sketch" sx={{ fontSize: '1.2rem', color: '#10b981', mb: 0.5 }}>
                    📝 Today's Entry:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Chest & Triceps: 4 exercises, 14 sets logged
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Nutrition: 1,850 / 2,200 kcal (Protein: 145g)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Feature Cards Grid */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography className="font-handwritten" sx={{ fontSize: '2.1rem', color: '#fbbf24' }}>
            ✦ Neat & Handcrafted Features ✦
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            Everything You Need for Fitness Mastery
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: <FitnessCenterIcon sx={{ fontSize: 32, color: '#fbbf24' }} />,
              title: 'Workout Logging',
              tag: 'STRENGTH LOG',
              desc: 'Record exercises with sets, reps, weight, and date notes. Filter history by muscle groups.',
            },
            {
              icon: <RestaurantIcon sx={{ fontSize: 32, color: '#10b981' }} />,
              title: 'Nutrition & Macros',
              tag: 'MEAL TRACKER',
              desc: 'Categorize meals into Breakfast, Lunch, Dinner, and Snacks with exact macronutrient breakdown.',
            },
            {
              icon: <FlagIcon sx={{ fontSize: 32, color: '#06b6d4' }} />,
              title: 'Goal Milestones',
              tag: 'TARGET BOARD',
              desc: 'Define target values for weight loss, workout volume, or nutrition milestones with start/end timelines.',
            },
            {
              icon: <ShowChartIcon sx={{ fontSize: 32, color: '#10b981' }} />,
              title: 'Analytics & Charts',
              tag: 'PROGRESS VISUALS',
              desc: 'Interactive Chart.js visualizations for weight trends, body measurements, and calorie intake.',
            },
            {
              icon: <SpeedIcon sx={{ fontSize: 32, color: '#fbbf24' }} />,
              title: 'Exercise Library',
              tag: 'ROUTINE DATABASE',
              desc: 'Search pre-loaded exercises or create custom routines with muscle group and equipment tags.',
            },
            {
              icon: <SecurityIcon sx={{ fontSize: 32, color: '#f59e0b' }} />,
              title: 'JWT Authentication',
              tag: 'PRIVATE SECURE',
              desc: 'Secure authentication, password hashing with bcrypt, and complete profile customization.',
            },
          ].map((feature, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Box className="handcrafted-card" sx={{ height: '100%', p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '14px',
                      bgcolor: 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography className="font-sketch" sx={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                    {feature.tag}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
