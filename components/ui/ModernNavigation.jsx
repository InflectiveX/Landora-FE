import {
  AppBar,
  Toolbar,
  styled,
  Box,
  IconButton,
  Typography,
  Avatar,
  Badge,
  Tooltip,
  useScrollTrigger,
  Slide,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { forwardRef } from "react";

// Modern AppBar with glassmorphism and scroll effects
const ModernAppBar = styled(AppBar)(({ theme, variant = "glass" }) => {
  const variants = {
    glass: {
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      boxShadow: "none",
      color: theme.palette.text.primary,
    },

    gradient: {
      background: `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        0.9
      )} 0%, ${alpha(theme.palette.secondary.main, 0.9)} 100%)`,
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
      color: theme.palette.primary.contrastText,
    },

    minimal: {
      backgroundColor: "transparent",
      backdropFilter: "none",
      borderBottom: "none",
      boxShadow: "none",
      color: theme.palette.text.primary,
    },

    elevated: {
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.shadows[4],
      color: theme.palette.text.primary,
    },
  };

  return {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: theme.zIndex.appBar,
    ...variants[variant],
  };
});

// Enhanced Toolbar with better spacing and alignment
const ModernToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 72,
  padding: theme.spacing(0, 3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 2),
    minHeight: 64,
  },
}));

// Logo/Brand component with animation
const BrandLogo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  textDecoration: "none",
  color: "inherit",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.02)",
  },
  "& .brand-icon": {
    fontSize: "2rem",
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    transition: "all 0.3s ease",
  },
  "& .brand-text": {
    fontWeight: 700,
    fontSize: "1.25rem",
    letterSpacing: "-0.02em",
    background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
}));

// Action buttons container
const ActionButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginLeft: "auto",
}));

// Enhanced IconButton with better hover effects
const ModernIconButton = styled(IconButton)(
  ({ theme, variant = "default" }) => {
    const variants = {
      default: {
        color: theme.palette.text.secondary,
        backgroundColor: "transparent",
        border: `1px solid transparent`,
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          color: theme.palette.primary.main,
          transform: "translateY(-1px)",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        },
      },

      glass: {
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(10px)",
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        color: theme.palette.text.primary,
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          transform: "translateY(-2px)",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
        },
      },

      accent: {
        backgroundColor: alpha(
          theme.palette.accent?.main || theme.palette.secondary.main,
          0.1
        ),
        color: theme.palette.accent?.main || theme.palette.secondary.main,
        border: `1px solid ${alpha(
          theme.palette.accent?.main || theme.palette.secondary.main,
          0.2
        )}`,
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.accent?.main || theme.palette.secondary.main,
            0.2
          ),
          transform: "scale(1.05)",
          boxShadow: `0 4px 12px ${alpha(
            theme.palette.accent?.main || theme.palette.secondary.main,
            0.25
          )}`,
        },
      },
    };

    return {
      borderRadius: theme.shape.borderRadius,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      width: 44,
      height: 44,
      ...variants[variant],
    };
  }
);

// Modern Avatar with status indicator
const ModernAvatar = styled(Avatar)(({ theme, status = "online" }) => {
  const statusColors = {
    online: theme.palette.success.main,
    away: theme.palette.warning.main,
    busy: theme.palette.error.main,
    offline: theme.palette.grey[500],
  };

  return {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    border: `2px solid ${theme.palette.background.paper}`,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 2,
      right: 2,
      width: 12,
      height: 12,
      backgroundColor: statusColors[status],
      borderRadius: "50%",
      border: `2px solid ${theme.palette.background.paper}`,
    },
  };
});

// Notification Badge with enhanced styling
const ModernBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontSize: "0.75rem",
    fontWeight: 600,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    boxShadow: `0 2px 8px ${alpha(theme.palette.error.main, 0.3)}`,
  },
  "& .MuiBadge-dot": {
    backgroundColor: theme.palette.error.main,
    border: `2px solid ${theme.palette.background.paper}`,
    boxShadow: `0 2px 8px ${alpha(theme.palette.error.main, 0.3)}`,
  },
}));

// Hide on scroll functionality
function HideOnScroll({ children, window }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// Navigation breadcrumb component
const NavigationBreadcrumb = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "& .breadcrumb-item": {
    color: theme.palette.text.secondary,
    textDecoration: "none",
    fontSize: "0.875rem",
    transition: "color 0.2s ease",
    "&:hover": {
      color: theme.palette.primary.main,
    },
    "&.active": {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
  },
  "& .breadcrumb-separator": {
    color: theme.palette.text.disabled,
    fontSize: "0.75rem",
  },
}));

// Floating Action Bar for mobile
const FloatingActionBar = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: "blur(20px)",
  borderRadius: "50px",
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: theme.shadows[8],
  zIndex: theme.zIndex.speedDial,
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export {
  ModernAppBar,
  ModernToolbar,
  BrandLogo,
  ActionButtons,
  ModernIconButton,
  ModernAvatar,
  ModernBadge,
  HideOnScroll,
  NavigationBreadcrumb,
  FloatingActionBar,
};
