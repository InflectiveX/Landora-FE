import { createTheme, alpha } from '@mui/material/styles';

const lightPalette = {
  primary: { main: '#1F3A93' },
  secondary: { main: '#17A589' },
  background: { default: '#f8fafc', paper: '#ffffff' },
  text: { primary: '#1a202c', secondary: '#4a5568' },
  divider: 'rgba(0, 0, 0, 0.12)',
  mode: 'light',
};

const darkPalette = {
  primary: { main: '#90caf9' },
  secondary: { main: '#48d1c2' },
  background: { default: '#0a0e1a', paper: '#1a1f2e' },
  text: { primary: '#ffffff', secondary: '#a0aec0' },
  divider: 'rgba(255, 255, 255, 0.12)',
  mode: 'dark',
};

const commonTheme = {
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backdropFilter: 'blur(12px)',
          backgroundImage: 'none',
          border: '1px solid',
          borderColor: 'divider',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(12px)',
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(12px)',
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 10, border: '1px solid', borderColor: 'divider' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, textTransform: 'none' },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...commonTheme,
  palette: lightPalette,
});

export const darkTheme = createTheme({
  ...commonTheme,
  palette: darkPalette,
});

export default lightTheme;


