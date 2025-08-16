import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1F3A93',
      light: '#5DADE2',
      dark: '#154360',
      contrastText: '#fff',
    },
    secondary: {
      main: '#17A589',
      light: '#5DADE2',
      dark: '#117864',
      contrastText: '#fff',
    },
    error: { main: '#E74C3C' },
    warning: { main: '#F39C12' },
    success: { main: '#27AE60' },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#4A4A4A',
      secondary: '#717171',
    },
    action: {
      active: '#17A589',
      hover: '#5DADE2',
      selected: '#F1C40F',
    },
    divider: '#E5E7E9',
    custom: {
      softGray: '#F8F9F9',
      gold: '#F1C40F',
      teal: '#17A589',
      lightBlue: '#5DADE2',
    },
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
          background: '#FAFAFA',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          padding: '12px 30px',
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(90deg, #17A589, #5DADE2)',
          boxShadow: '0 4px 16px rgba(23,165,137,0.15)',
          '&:hover': {
            background: 'linear-gradient(90deg, #148F77, #3498DB)',
            boxShadow: '0 8px 24px rgba(23,165,137,0.25)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: '#17A589',
          color: '#17A589',
          '&:hover': {
            borderColor: '#5DADE2',
            backgroundColor: 'rgba(93,173,226,0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(31,58,147,0.08)',
          border: '1px solid #E5E7E9',
          background: '#FFFFFF',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(31,58,147,0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            background: '#F8F9F9',
            borderColor: '#E5E7E9',
            transition: 'all 0.3s ease',
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px rgba(23,165,137,0.2)',
              borderColor: '#17A589',
              background: '#FFFFFF',
            },
            '&:hover': {
              borderColor: '#5DADE2',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#4A4A4A',
            '&.Mui-focused': {
              color: '#17A589',
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
