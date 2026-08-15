import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FlagIcon from '@mui/icons-material/Flag';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, auth: true },
    { label: 'Workouts', path: '/workouts', icon: <DirectionsRunIcon />, auth: true },
    { label: 'Exercises', path: '/exercises', icon: <LibraryBooksIcon />, auth: true },
    { label: 'Nutrition', path: '/nutrition', icon: <RestaurantIcon />, auth: true },
    { label: 'Goals', path: '/goals', icon: <FlagIcon />, auth: true },
    { label: 'Analytics', path: '/progress', icon: <ShowChartIcon />, auth: true },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: 'rgba(9, 13, 22, 0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '2px solid rgba(245, 158, 11, 0.15)',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Brand Logo: FitnessTracker */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ display: { md: 'none' }, mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box
              onClick={() => navigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: '12px 8px 14px 10px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                }}
              >
                <FitnessCenterIcon sx={{ color: '#090d16', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.5px',
                    fontFamily: '"Outfit", sans-serif',
                    lineHeight: 1.1,
                  }}
                >
                  Fitness<span className="gradient-text">Tracker</span>
                </Typography>
                <Typography className="font-handwritten" sx={{ fontSize: '0.95rem', color: '#fbbf24', mt: -0.3 }}>
                  Handcrafted Logbook
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navItems.map((item) => {
              if (item.auth && !user) return null;
              const active = location.pathname === item.path;
              return (
                <Button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="tactile-btn"
                  sx={{
                    color: active ? '#fbbf24' : '#94a3b8',
                    fontWeight: active ? 700 : 600,
                    px: 2,
                    py: 1,
                    bgcolor: active ? 'rgba(245, 158, 11, 0.12)' : 'transparent',
                    border: active ? '1px dashed rgba(245, 158, 11, 0.4)' : '1px solid transparent',
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* User Profile / Login Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0.5 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#f59e0b',
                      color: '#090d16',
                      width: 40,
                      height: 40,
                      fontSize: 17,
                      fontWeight: 800,
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    {user.username ? user.username.charAt(0).toUpperCase() : 'F'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      bgcolor: '#111827',
                      border: '2px solid rgba(245, 158, 11, 0.2)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
                      borderRadius: '14px',
                      minWidth: 190,
                    },
                  }}
                >
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                    <ListItemIcon><PersonIcon fontSize="small" sx={{ color: '#fbbf24' }} /></ListItemIcon>
                    <ListItemText primary="User Profile" />
                  </MenuItem>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: '#f43f5e' }} /></ListItemIcon>
                    <ListItemText primary="Logout" sx={{ color: '#f43f5e' }} />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="text"
                  onClick={() => navigate('/login')}
                  className="tactile-btn"
                  sx={{ color: '#f8fafc' }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                  className="tactile-btn"
                  sx={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
                    color: '#090d16',
                    fontWeight: 800,
                  }}
                >
                  Get Started
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 270,
            bgcolor: '#090d16',
            borderRight: '2px solid rgba(245, 158, 11, 0.2)',
            p: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, px: 1 }}>
          <FitnessCenterIcon sx={{ color: '#fbbf24' }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Fitness<span className="gradient-text">Tracker</span>
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 2 }} />
        <List>
          {navItems.map((item) => {
            if (item.auth && !user) return null;
            return (
              <ListItem
                button
                key={item.label}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: '10px',
                  mb: 0.5,
                  bgcolor: location.pathname === item.path ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                  color: location.pathname === item.path ? '#fbbf24' : '#94a3b8',
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
