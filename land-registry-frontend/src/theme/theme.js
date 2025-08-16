import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',
      light: '#42a5f5',
      dark: '#0d47a1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#2e7d32',
      light: '#66bb6a',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    error: { main: '#d32f2f' },
    warning: { main: '#f57c00' },
    success: { main: '#388e3c' },
    background: {
      default: '#f8f9fa',
      paper: '#fff',
    },
    text: {
      primary: '#212529',
      secondary: '#6c757d',
    },
    divider: '#e9ecef',
  },
  shape: {
    borderRadius: 14,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(21,101,192,0.08)',
    '0 4px 16px rgba(21,101,192,0.10)',
    ...Array(23).fill('0 2px 12px rgba(0,0,0,0.08)')
  ],
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.7rem',
      fontWeight: 700,
      color: '#1565c0',
      letterSpacing: '-1px',
    },
    h2: {
      fontSize: '2.1rem',
      fontWeight: 600,
      color: '#1565c0',
    },
    h3: {
      fontSize: '1.7rem',
      fontWeight: 500,
      color: '#1565c0',
    },
    h4: {
      fontSize: '1.4rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.15rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.92rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.03em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#f8f9fa',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 600,
          padding: '10px 28px',
          boxShadow: '0 2px 8px rgba(21,101,192,0.10)',
          transition: 'box-shadow 0.3s, background 0.3s',
        },
        contained: {
          boxShadow: '0 4px 16px rgba(21,101,192,0.13)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(21,101,192,0.18)',
            backgroundColor: '#0d47a1',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            backgroundColor: '#e3f2fd',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(21,101,192,0.10)',
          border: '1px solid #e9ecef',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(21,101,192,0.13)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            background: '#f4f6fb',
            transition: 'box-shadow 0.3s, border-color 0.3s',
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px #1565c033',
              borderColor: '#1565c0',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #1565c0 60%, #42a5f5 100%)',
          boxShadow: '0 2px 8px rgba(21,101,192,0.15)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
          boxShadow: '0 4px 24px rgba(21,101,192,0.10)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          marginBottom: 4,
          transition: 'background 0.2s',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(21,101,192,0.10)',
        },
      },
    },
  },
});

export default theme;
