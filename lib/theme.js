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
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
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
    main: brandColors.success[600],
    light: brandColors.success[500],
    dark: brandColors.success[700],
    contrastText: "#ffffff",
  },
  warning: {
    main: brandColors.warning[600],
    light: brandColors.warning[500],
    dark: brandColors.warning[700],
    contrastText: "#ffffff",
  },
  error: {
    main: brandColors.error[600],
    light: brandColors.error[500],
    dark: "#b91c1c",
    contrastText: "#ffffff",
  },
  info: {
    main: brandColors.info[500],
    light: brandColors.info[400],
    dark: brandColors.info[600],
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
    main: brandColors.success[500],
    light: brandColors.success[400],
    dark: brandColors.success[600],
    contrastText: "#ffffff",
  },
  warning: {
    main: brandColors.warning[500],
    light: brandColors.warning[400],
    dark: brandColors.warning[600],
    contrastText: "#ffffff",
  },
  error: {
    main: brandColors.error[500],
    light: brandColors.error[400],
    dark: brandColors.error[600],
    contrastText: "#ffffff",
  },
  info: {
    main: brandColors.info[400],
    light: brandColors.info[300],
    dark: brandColors.info[500],
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
      root: {
        "& .MuiBackdrop-root": {
          backgroundColor: alpha(
            mode === "light"
              ? brandColors.neutral[900]
              : brandColors.neutral[900],
            0.75
          ),
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)", // Safari support
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
      paper: {
        borderRadius: shape.borderRadiusLg,
        backgroundColor:
          mode === "light"
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(20, 21, 24, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${
          mode === "light"
            ? alpha(brandColors.neutral[200], 0.5)
            : alpha(brandColors.neutral[700], 0.5)
        }`,
        boxShadow: `
          0px 24px 48px -12px ${alpha(brandColors.neutral[900], 0.25)},
          0px 0px 0px 1px ${alpha(brandColors.primary[500], 0.05)}
        `,
        overflow: "hidden",
        position: "relative",
        // Subtle top border accent
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, 
            ${brandColors.primary[500]}, 
            ${brandColors.secondary[400]}, 
            transparent
          )`,
        },
      },
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: "24px 24px 16px 24px",
        background: `linear-gradient(135deg, 
          ${alpha(brandColors.primary[500], 0.03)} 0%, 
          transparent 100%
        )`,
        borderBottom: `1px solid ${alpha(
          mode === "light"
            ? brandColors.neutral[200]
            : brandColors.neutral[700],
          0.3
        )}`,
        fontSize: "1.25rem",
        fontWeight: 600,
        color:
          mode === "light"
            ? brandColors.neutral[900]
            : brandColors.neutral[100],
      },
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: "24px",
        "&::-webkit-scrollbar": {
          width: 6,
        },
        "&::-webkit-scrollbar-track": {
          background: alpha(
            mode === "light"
              ? brandColors.neutral[200]
              : brandColors.neutral[700],
            0.1
          ),
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-thumb": {
          background: alpha(
            mode === "light"
              ? brandColors.neutral[400]
              : brandColors.neutral[500],
            0.5
          ),
          borderRadius: 3,
          "&:hover": {
            background: alpha(
              mode === "light"
                ? brandColors.neutral[500]
                : brandColors.neutral[400],
              0.7
            ),
          },
        },
      },
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: "16px 24px 24px 24px",
        gap: "12px",
        borderTop: `1px solid ${alpha(
          mode === "light"
            ? brandColors.neutral[200]
            : brandColors.neutral[700],
          0.3
        )}`,
        background: `linear-gradient(135deg, 
          transparent 0%, 
          ${alpha(brandColors.neutral[100], 0.02)} 100%
        )`,
      },
    },
  },

  MuiSnackbar: {
    styleOverrides: {
      root: {
        "& .MuiSnackbarContent-root": {
          backgroundColor: alpha(
            mode === "light" ? "#ffffff" : brandColors.neutral[800],
            0.95
          ),
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${alpha(
            mode === "light"
              ? brandColors.neutral[200]
              : brandColors.neutral[700],
            0.5
          )}`,
          borderRadius: shape.borderRadius * 2,
          boxShadow: `
            0px 8px 32px -4px ${alpha(brandColors.neutral[900], 0.2)},
            0px 0px 0px 1px ${alpha(brandColors.primary[500], 0.05)}
          `,
          minWidth: 320,
          padding: "8px",
          color:
            mode === "light"
              ? brandColors.neutral[900]
              : brandColors.neutral[100],
        },
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius * 1.5,
        padding: "12px 16px",
        fontSize: "0.875rem",
        fontWeight: 500,
        minHeight: 56,
        boxShadow: `0px 4px 12px ${alpha(brandColors.neutral[900], 0.1)}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0px 8px 24px ${alpha(brandColors.neutral[900], 0.15)}`,
        },
      },
      filledSuccess: {
        backgroundColor: alpha(brandColors.success[500], 0.9),
        color: brandColors.success.contrastText || "#ffffff",
      },
      filledError: {
        backgroundColor: alpha(brandColors.error[500], 0.9),
        color: brandColors.error.contrastText || "#ffffff",
      },
      filledWarning: {
        backgroundColor: alpha(brandColors.warning[500], 0.9),
        color: brandColors.warning.contrastText || "#ffffff",
      },
      filledInfo: {
        backgroundColor: alpha(brandColors.info[500], 0.9),
        color: brandColors.info.contrastText || "#ffffff",
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: alpha(
          mode === "light" ? "#ffffff" : brandColors.neutral[800],
          0.95
        ),
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${alpha(
          mode === "light"
            ? brandColors.neutral[200]
            : brandColors.neutral[700],
          0.5
        )}`,
        borderRadius: shape.borderRadius * 2,
        boxShadow: `
          0px 8px 32px -4px ${alpha(brandColors.neutral[900], 0.25)},
          0px 0px 0px 1px ${alpha(brandColors.primary[500], 0.05)}
        `,
        minWidth: 180,
        padding: "8px",
        overflow: "visible",
        // Subtle top accent line
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "16px",
          right: "16px",
          height: "2px",
          background: `linear-gradient(90deg, 
            ${brandColors.primary[500]}, 
            ${brandColors.secondary[400]}, 
            transparent
          )`,
          borderRadius: "0 0 1px 1px",
        },
      },
      list: {
        padding: 0,
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        margin: "4px 0",
        padding: "12px 16px",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        minHeight: 48,

        "&:hover": {
          backgroundColor: alpha(brandColors.primary[500], 0.08),
          transform: "translateX(4px)",
        },

        "&.Mui-selected": {
          backgroundColor: alpha(brandColors.primary[500], 0.12),
          borderLeft: `3px solid ${brandColors.primary[500]}`,
          "&:hover": {
            backgroundColor: alpha(brandColors.primary[500], 0.16),
          },
        },

        "& .MuiListItemIcon-root": {
          minWidth: 36,
          color:
            mode === "light"
              ? brandColors.neutral[600]
              : brandColors.neutral[400],
        },

        "& .MuiListItemText-root .MuiTypography-root": {
          fontWeight: 500,
          fontSize: "0.875rem",
        },
      },
    },
  },

  MuiPopover: {
    styleOverrides: {
      paper: {
        backgroundColor: alpha(
          mode === "light" ? "#ffffff" : brandColors.neutral[800],
          0.95
        ),
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${alpha(
          mode === "light"
            ? brandColors.neutral[200]
            : brandColors.neutral[700],
          0.5
        )}`,
        borderRadius: shape.borderRadius * 2,
        boxShadow: `
          0px 8px 32px -4px ${alpha(brandColors.neutral[900], 0.25)},
          0px 0px 0px 1px ${alpha(brandColors.primary[500], 0.05)}
        `,
        overflow: "visible",
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        margin: "4px 0",
        padding: "12px 16px",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        minHeight: 48,

        "&:hover": {
          backgroundColor: alpha(brandColors.primary[500], 0.08),
          transform: "translateX(4px)",
        },

        "&.Mui-selected": {
          backgroundColor: alpha(brandColors.primary[500], 0.12),
          borderLeft: `3px solid ${brandColors.primary[500]}`,
          "&:hover": {
            backgroundColor: alpha(brandColors.primary[500], 0.16),
          },
        },

        "& .MuiListItemIcon-root": {
          minWidth: 36,
          color:
            mode === "light"
              ? brandColors.neutral[600]
              : brandColors.neutral[400],
        },

        "& .MuiListItemText-root .MuiTypography-root": {
          fontWeight: 500,
          fontSize: "0.875rem",
        },
      },
    },
  },

  MuiPopover: {
    styleOverrides: {
      paper: {
        backgroundColor: alpha(
          mode === "light" ? "#ffffff" : brandColors.neutral[800],
          0.95
        ),
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${alpha(
          mode === "light"
            ? brandColors.neutral[200]
            : brandColors.neutral[700],
          0.5
        )}`,
        borderRadius: shape.borderRadius * 2,
        boxShadow: `
          0px 8px 32px -4px ${alpha(brandColors.neutral[900], 0.25)},
          0px 0px 0px 1px ${alpha(brandColors.primary[500], 0.05)}
        `,
        overflow: "visible",
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
