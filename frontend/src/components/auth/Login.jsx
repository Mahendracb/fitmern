import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
  Link as MuiLink,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 10 }}>
      <Box className="handcrafted-card" sx={{ p: 2, position: 'relative' }}>
        <span className="tape-badge">🔑 SIGN IN BOARD</span>

        <CardContent sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
              }}
            >
              <LockOutlinedIcon sx={{ color: '#090d16', fontSize: 26 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Welcome Back
            </Typography>
            <Typography className="font-handwritten" sx={{ fontSize: '1.2rem', color: '#fbbf24', mt: 0.5 }}>
              Sign in to your FitnessTracker personal logbook
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email or Username"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              className="tactile-btn"
              sx={{
                mt: 3,
                mb: 2,
                background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
                color: '#090d16',
                py: 1.5,
                fontWeight: 800,
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <Box textAlign="center" sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <MuiLink component={Link} to="/register" color="primary" sx={{ fontWeight: 700 }}>
                Sign Up
              </MuiLink>
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Container>
  );
};

export default Login;
