import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#090d16',
      paper: '#111827',
    },
    primary: {
      main: '#f59e0b', // Champagne Gold
      light: '#fbbf24',
      dark: '#d97706',
    },
    secondary: {
      main: '#10b981', // Emerald Green
      light: '#34d399',
      dark: '#059669',
    },
    info: {
      main: '#06b6d4', // Cyan Accent
    },
    error: {
      main: '#f43f5e',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif',
    h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '8px 22px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(17, 24, 39, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '2px solid rgba(245, 158, 11, 0.15)',
          borderRadius: '18px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#111827',
        },
      },
    },
  },
});

export default theme;
