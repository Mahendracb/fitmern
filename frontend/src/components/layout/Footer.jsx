import React from 'react';
import { Box, Container, Typography, Grid, Divider } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 6,
        bgcolor: '#060910',
        borderTop: '2px solid rgba(245, 158, 11, 0.15)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <FitnessCenterIcon sx={{ color: '#fbbf24' }} />
              <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif' }}>
                Fitness<span className="gradient-text">Tracker</span>
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
              Tactile personal fitness logbook and nutrition planner crafted for maximum strength, milestone tracking, and aesthetic wellness.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#fbbf24' }}>
              Core Features
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>Workout Logbook</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>Exercise Library</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>Meal & Macro Tracker</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>Goal Milestones</Typography>
          </Grid>
          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#fbbf24' }}>
              Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>Body Measurements</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>Weight Trends</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>Calorie Consumption</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>Volume Graphs</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#fbbf24' }}>
              Engine Architecture
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>MongoDB & Mongoose</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>Express REST API</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>React 19 & Vite</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>Node.js Backend</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.08)' }} />
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {new Date().getFullYear()} FitnessTracker Application. Built with React 19, Material-UI, and Express REST Framework.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
