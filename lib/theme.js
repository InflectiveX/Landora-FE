import { createTheme } from '@mui/material/styles';

const lightPalette = {
  primary: { main: '#1976d2' },
  secondary: { main: '#9c27b0' },
  background: { default: '#f5f7fb', paper: '#ffffff' },
};

const darkPalette = {
  primary: { main: '#90caf9' },
  secondary: { main: '#ce93d8' },
  background: { default: '#0b0e14', paper: '#0f131a' },
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
          backdropFilter: 'blur(8px)',
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 10 },
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
  palette: { ...lightPalette, mode: 'light' },
});

export const darkTheme = createTheme({
  ...commonTheme,
  palette: { ...darkPalette, mode: 'dark' },
});

export default lightTheme;


