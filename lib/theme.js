import { createTheme, alpha } from "@mui/material/styles";

// Modern Color Palette - Professional & Premium
const brandColors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Main primary - Blue
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  secondary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9", // Main secondary - Sky Blue
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  accent: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef", // Accent color - Purple
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
  },
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

const lightPalette = {
  mode: "light",
  primary: {
    main: brandColors.primary[500],
    light: brandColors.primary[400],
    dark: brandColors.primary[600],
    contrastText: "#ffffff",
  },
  secondary: {
    main: brandColors.secondary[400],
    light: brandColors.secondary[300],
    dark: brandColors.secondary[500],
    contrastText: "#ffffff",
  },
  accent: {
    main: brandColors.accent[500],
    light: brandColors.accent[400],
    dark: brandColors.accent[600],
    contrastText: "#ffffff",
  },
  background: {
    default: "#f8fafc",
    paper: "#ffffff",
    surface: brandColors.neutral[50],
  },
  text: {
    primary: brandColors.neutral[900],
    secondary: brandColors.neutral[600],
    disabled: brandColors.neutral[400],
  },
  divider: alpha(brandColors.neutral[200], 0.5),
  grey: brandColors.neutral,
  success: {
    main: "#059669",
    light: "#10b981",
    dark: "#047857",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#d97706",
    light: "#f59e0b",
    dark: "#b45309",
    contrastText: "#ffffff",
  },
  error: {
    main: "#dc2626",
    light: "#ef4444",
    dark: "#b91c1c",
    contrastText: "#ffffff",
  },
  info: {
    main: brandColors.primary[500],
    light: brandColors.primary[400],
    dark: brandColors.primary[600],
    contrastText: "#ffffff",
  },
};

const darkPalette = {
  mode: "dark",
  primary: {
    main: brandColors.primary[400],
    light: brandColors.primary[300],
    dark: brandColors.primary[500],
    contrastText: "#ffffff",
  },
  secondary: {
    main: brandColors.secondary[400],
    light: brandColors.secondary[300],
    dark: brandColors.secondary[500],
    contrastText: "#ffffff",
  },
  accent: {
    main: brandColors.accent[400],
    light: brandColors.accent[300],
    dark: brandColors.accent[500],
    contrastText: "#ffffff",
  },
  background: {
    default: "#0f172a",
    paper: "#1e293b",
    surface: "#334155",
  },
  text: {
    primary: "#ffffff",
    secondary: brandColors.neutral[300],
    disabled: brandColors.neutral[500],
  },
  divider: alpha(brandColors.neutral[700], 0.5),
  grey: brandColors.neutral,
  success: {
    main: "#10b981",
    light: "#34d399",
    dark: "#059669",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#f59e0b",
    light: "#fbbf24",
    dark: "#d97706",
    contrastText: "#ffffff",
  },
  error: {
    main: "#ef4444",
    light: "#f87171",
    dark: "#dc2626",
    contrastText: "#ffffff",
  },
  info: {
    main: brandColors.primary[400],
    light: brandColors.primary[300],
    dark: brandColors.primary[500],
    contrastText: "#ffffff",
  },
};

// Modern Typography System
const typography = {
  fontFamily:
    '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontSize: "3.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  h2: {
    fontSize: "2.75rem",
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
  },
  h3: {
    fontSize: "2.25rem",
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
  },
  h4: {
    fontSize: "1.875rem",
    fontWeight: 600,
    lineHeight: 1.35,
    letterSpacing: "-0.01em",
  },
  h5: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.45,
  },
  subtitle1: {
    fontSize: "1.125rem",
    fontWeight: 500,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.6,
  },
  button: {
    fontSize: "0.875rem",
    fontWeight: 600,
    textTransform: "none",
    letterSpacing: "0.02em",
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.4,
  },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
};

// Enhanced Shape System
const shape = {
  borderRadius: 12,
  borderRadiusLg: 16,
  borderRadiusXl: 24,
};

// Modern Shadows
const shadows = (mode) => [
  "none",
  // Light mode shadows
  ...(mode === "light"
    ? [
        "0px 1px 2px rgba(0, 0, 0, 0.05)",
        "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "0px 32px 64px -12px rgba(0, 0, 0, 0.4)",
        ...Array(17).fill("0px 32px 64px -12px rgba(0, 0, 0, 0.4)"),
      ]
    : [
        "0px 1px 2px rgba(0, 0, 0, 0.3)",
        "0px 1px 3px rgba(0, 0, 0, 0.4), 0px 1px 2px rgba(0, 0, 0, 0.3)",
        "0px 4px 6px -1px rgba(0, 0, 0, 0.4), 0px 2px 4px -1px rgba(0, 0, 0, 0.3)",
        "0px 10px 15px -3px rgba(0, 0, 0, 0.4), 0px 4px 6px -2px rgba(0, 0, 0, 0.3)",
        "0px 20px 25px -5px rgba(0, 0, 0, 0.4), 0px 10px 10px -5px rgba(0, 0, 0, 0.3)",
        "0px 25px 50px -12px rgba(0, 0, 0, 0.6)",
        "0px 32px 64px -12px rgba(0, 0, 0, 0.8)",
        ...Array(17).fill("0px 32px 64px -12px rgba(0, 0, 0, 0.8)"),
      ]),
];

// Advanced Component Overrides
const getComponents = (mode) => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollBehavior: "smooth",
      },
      body: {
        background:
          mode === "light"
            ? "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
            : "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        backgroundAttachment: "fixed",
      },
      "*": {
        "&::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: mode === "light" ? "#f1f3f4" : "#2d3748",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: mode === "light" ? "#c1c9d2" : "#4a5568",
          borderRadius: 4,
          "&:hover": {
            backgroundColor: mode === "light" ? "#a0a7b0" : "#5a6572",
          },
        },
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        backgroundImage: "none",
        border: `1px solid ${
          mode === "light"
            ? alpha(brandColors.neutral[200], 0.5)
            : alpha(brandColors.neutral[700], 0.5)
        }`,
        backdropFilter: "blur(20px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor:
            mode === "light"
              ? alpha(brandColors.primary[500], 0.3)
              : alpha(brandColors.primary[400], 0.3),
          transform: "translateY(-2px)",
          boxShadow:
            mode === "light"
              ? "0px 20px 40px -12px rgba(99, 102, 241, 0.15)"
              : "0px 20px 40px -12px rgba(99, 102, 241, 0.3)",
        },
      },
      elevation1: {
        boxShadow: shadows(mode)[1],
      },
      elevation4: {
        boxShadow: shadows(mode)[4],
      },
      elevation8: {
        boxShadow: shadows(mode)[8],
      },
      elevation12: {
        boxShadow: shadows(mode)[12],
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        border: `1px solid ${
          mode === "light"
            ? alpha(brandColors.neutral[200], 0.5)
            : alpha(brandColors.neutral[700], 0.5)
        }`,
        background:
          mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(20, 21, 24, 0.8)",
        backdropFilter: "blur(20px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor:
            mode === "light"
              ? alpha(brandColors.primary[500], 0.3)
              : alpha(brandColors.primary[400], 0.3),
          transform: "translateY(-4px)",
          boxShadow:
            mode === "light"
              ? "0px 20px 40px -12px rgba(99, 102, 241, 0.15)"
              : "0px 20px 40px -12px rgba(99, 102, 241, 0.3)",
        },
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.875rem",
        padding: "10px 24px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
          transform: "translateY(-2px)",
        },
        "&:active": {
          transform: "translateY(0px)",
        },
      },
      contained: {
        background:
          mode === "light"
            ? `linear-gradient(135deg, ${brandColors.primary[500]} 0%, ${brandColors.primary[600]} 100%)`
            : `linear-gradient(135deg, ${brandColors.primary[400]} 0%, ${brandColors.primary[500]} 100%)`,
        color: "#ffffff",
        "&:hover": {
          background:
            mode === "light"
              ? `linear-gradient(135deg, ${brandColors.primary[600]} 0%, ${brandColors.primary[700]} 100%)`
              : `linear-gradient(135deg, ${brandColors.primary[300]} 0%, ${brandColors.primary[400]} 100%)`,
          boxShadow:
            mode === "light"
              ? `0px 10px 30px -8px ${alpha(brandColors.primary[500], 0.4)}`
              : `0px 10px 30px -8px ${alpha(brandColors.primary[400], 0.4)}`,
        },
        "&:disabled": {
          background:
            mode === "light"
              ? brandColors.neutral[200]
              : brandColors.neutral[700],
          color:
            mode === "light"
              ? brandColors.neutral[400]
              : brandColors.neutral[500],
        },
      },
      outlined: {
        borderWidth: "2px",
        borderColor:
          mode === "light"
            ? brandColors.primary[500]
            : brandColors.primary[400],
        color:
          mode === "light"
            ? brandColors.primary[500]
            : brandColors.primary[400],
        "&:hover": {
          borderWidth: "2px",
          backgroundColor:
            mode === "light"
              ? alpha(brandColors.primary[500], 0.08)
              : alpha(brandColors.primary[400], 0.08),
          borderColor:
            mode === "light"
              ? brandColors.primary[600]
              : brandColors.primary[300],
        },
      },
      text: {
        color:
          mode === "light"
            ? brandColors.primary[500]
            : brandColors.primary[400],
        "&:hover": {
          backgroundColor:
            mode === "light"
              ? alpha(brandColors.primary[500], 0.08)
              : alpha(brandColors.primary[400], 0.08),
        },
      },
      sizeLarge: {
        padding: "14px 32px",
        fontSize: "1rem",
      },
      sizeSmall: {
        padding: "6px 16px",
        fontSize: "0.75rem",
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor:
          mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(20, 21, 24, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${
          mode === "light"
            ? alpha(brandColors.neutral[200], 0.5)
            : alpha(brandColors.neutral[700], 0.5)
        }`,
        boxShadow: "none",
        color: mode === "light" ? brandColors.neutral[900] : "#ffffff",
      },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor:
          mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(20, 21, 24, 0.8)",
        backdropFilter: "blur(20px)",
        borderRight: `1px solid ${
          mode === "light"
            ? alpha(brandColors.neutral[200], 0.5)
            : alpha(brandColors.neutral[700], 0.5)
        }`,
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: shape.borderRadius,
          backgroundColor:
            mode === "light"
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(26, 27, 31, 0.8)",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "& fieldset": {
            borderColor:
              mode === "light"
                ? alpha(brandColors.neutral[300], 0.5)
                : alpha(brandColors.neutral[600], 0.5),
            borderWidth: "2px",
          },
          "&:hover fieldset": {
            borderColor:
              mode === "light"
                ? brandColors.primary[500]
                : brandColors.primary[400],
          },
          "&.Mui-focused fieldset": {
            borderColor:
              mode === "light"
                ? brandColors.primary[500]
                : brandColors.primary[400],
            borderWidth: "2px",
          },
        },
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        fontWeight: 500,
        backdropFilter: "blur(10px)",
      },
      filled: {
        backgroundColor:
          mode === "light"
            ? alpha(brandColors.primary[500], 0.1)
            : alpha(brandColors.primary[400], 0.2),
        color:
          mode === "light"
            ? brandColors.primary[700]
            : brandColors.primary[300],
      },
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        border: `1px solid ${
          mode === "light"
            ? alpha(brandColors.neutral[200], 0.5)
            : alpha(brandColors.neutral[700], 0.5)
        }`,
        backgroundColor:
          mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(20, 21, 24, 0.8)",
        backdropFilter: "blur(20px)",
      },
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor:
          mode === "light" ? brandColors.neutral[50] : brandColors.neutral[800],
        "& .MuiTableCell-head": {
          fontWeight: 600,
          color:
            mode === "light"
              ? brandColors.neutral[700]
              : brandColors.neutral[300],
          borderBottom: `2px solid ${
            mode === "light"
              ? brandColors.neutral[200]
              : brandColors.neutral[700]
          }`,
        },
      },
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: {
        "&:hover": {
          backgroundColor:
            mode === "light"
              ? alpha(brandColors.primary[500], 0.04)
              : alpha(brandColors.primary[400], 0.08),
        },
      },
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        margin: "4px 8px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          backgroundColor:
            mode === "light"
              ? alpha(brandColors.primary[500], 0.08)
              : alpha(brandColors.primary[400], 0.12),
          transform: "translateX(4px)",
        },
        "&.Mui-selected": {
          backgroundColor:
            mode === "light"
              ? alpha(brandColors.primary[500], 0.12)
              : alpha(brandColors.primary[400], 0.16),
          borderLeft: `3px solid ${
            mode === "light"
              ? brandColors.primary[500]
              : brandColors.primary[400]
          }`,
          "&:hover": {
            backgroundColor:
              mode === "light"
                ? alpha(brandColors.primary[500], 0.16)
                : alpha(brandColors.primary[400], 0.2),
          },
        },
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: shape.borderRadiusLg,
        backgroundColor:
          mode === "light"
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(20, 21, 24, 0.95)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${
          mode === "light"
            ? alpha(brandColors.neutral[200], 0.5)
            : alpha(brandColors.neutral[700], 0.5)
        }`,
      },
    },
  },

  MuiSnackbar: {
    styleOverrides: {
      root: {
        "& .MuiSnackbarContent-root": {
          borderRadius: shape.borderRadius,
          backdropFilter: "blur(20px)",
        },
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: {
        background:
          mode === "light"
            ? `linear-gradient(135deg, ${brandColors.primary[500]} 0%, ${brandColors.secondary[400]} 100%)`
            : `linear-gradient(135deg, ${brandColors.primary[400]} 0%, ${brandColors.secondary[400]} 100%)`,
        fontWeight: 600,
      },
    },
  },

  MuiFab: {
    styleOverrides: {
      root: {
        background:
          mode === "light"
            ? `linear-gradient(135deg, ${brandColors.primary[500]} 0%, ${brandColors.primary[600]} 100%)`
            : `linear-gradient(135deg, ${brandColors.primary[400]} 0%, ${brandColors.primary[500]} 100%)`,
        backdropFilter: "blur(20px)",
        border: `1px solid ${
          mode === "light"
            ? alpha(brandColors.primary[300], 0.5)
            : alpha(brandColors.primary[600], 0.5)
        }`,
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow:
            mode === "light"
              ? `0px 10px 30px -8px ${alpha(brandColors.primary[500], 0.4)}`
              : `0px 10px 30px -8px ${alpha(brandColors.primary[400], 0.4)}`,
        },
      },
    },
  },
});

// Create themes
export const lightTheme = createTheme({
  palette: lightPalette,
  typography,
  shape,
  shadows: shadows("light"),
  components: getComponents("light"),
});

export const darkTheme = createTheme({
  palette: darkPalette,
  typography,
  shape,
  shadows: shadows("dark"),
  components: getComponents("dark"),
});

export default lightTheme;
