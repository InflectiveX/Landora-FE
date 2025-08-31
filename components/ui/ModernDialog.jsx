"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  styled,
  Slide,
  Zoom,
  Fade,
  useTheme,
  useMediaQuery,
  Backdrop,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Close as CloseIcon } from "@mui/icons-material";
import { forwardRef } from "react";

// Enhanced backdrop with stronger blur effect
const ModernBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)", // Safari support
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  zIndex: theme.zIndex.modal + 2, // Ensure dialog backdrop is above overlays
  // Additional overlay for better visual separation
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at center, ${alpha(
      theme.palette.primary.main,
      0.05
    )} 0%, transparent 70%)`,
    animation: "pulse 4s ease-in-out infinite",
  },
  "@keyframes pulse": {
    "0%, 100%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.8,
    },
  },
}));

// Modern Dialog Paper with glassmorphism
const ModernDialogPaper = styled("div")(
  ({ theme, variant = "glass", size = "medium" }) => {
    const sizes = {
      small: {
        maxWidth: "400px",
        minHeight: "200px",
      },
      medium: {
        maxWidth: "600px",
        minHeight: "300px",
      },
      large: {
        maxWidth: "900px",
        minHeight: "400px",
      },
      fullscreen: {
        maxWidth: "95vw",
        maxHeight: "95vh",
        minHeight: "90vh",
      },
    };

    const variants = {
      glass: {
        background: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        boxShadow: `
        0px 24px 48px -12px ${alpha(theme.palette.common.black, 0.25)},
        0px 0px 0px 1px ${alpha(theme.palette.primary.main, 0.05)}
      `,
      },
      gradient: {
        background: `linear-gradient(135deg, 
        ${alpha(theme.palette.background.paper, 0.95)} 0%, 
        ${alpha(theme.palette.primary.main, 0.02)} 50%,
        ${alpha(theme.palette.background.paper, 0.95)} 100%
      )`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: `
        0px 32px 64px -12px ${alpha(theme.palette.primary.main, 0.15)},
        0px 0px 0px 1px ${alpha(theme.palette.primary.main, 0.1)}
      `,
      },
      neon: {
        background: alpha(theme.palette.background.paper, 0.9),
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        boxShadow: `
        0px 0px 60px ${alpha(theme.palette.primary.main, 0.2)},
        inset 0px 1px 0px ${alpha(theme.palette.common.white, 0.1)}
      `,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          background: `linear-gradient(45deg, 
          ${theme.palette.primary.main}, 
          ${theme.palette.secondary.main}, 
          ${theme.palette.primary.main}
        )`,
          borderRadius: "inherit",
          zIndex: -1,
          opacity: 0.6,
          filter: "blur(6px)",
          animation: "glow 2s ease-in-out infinite alternate",
        },
      },
      solid: {
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[24],
      },
    };

    return {
      borderRadius: theme.shape.borderRadius * 2,
      padding: 0,
      margin: theme.spacing(2),
      width: "100%",
      maxWidth: sizes[size].maxWidth,
      minHeight: sizes[size].minHeight,
      maxHeight: sizes[size].maxHeight || "90vh",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: theme.zIndex.modal + 3, // Ensure dialog content is above all overlays
      ...variants[variant],

      // Responsive adjustments
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(1),
        maxWidth: "95vw",
        maxHeight: "95vh",
        borderRadius: theme.shape.borderRadius,
      },

      // Glow animation for neon variant
      "@keyframes glow": {
        "0%": {
          opacity: 0.6,
          filter: "blur(6px)",
        },
        "100%": {
          opacity: 0.8,
          filter: "blur(8px)",
        },
      },
    };
  }
);

// Enhanced Dialog Title
const ModernDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(3, 3, 2, 3),
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.03)} 0%, 
    transparent 100%
  )`,
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  position: "relative",

  "& .MuiTypography-root": {
    fontWeight: 600,
    fontSize: "1.25rem",
    color: theme.palette.text.primary,
    paddingRight: theme.spacing(5), // Space for close button
  },

  // Subtle top border accent
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: theme.spacing(3),
    right: theme.spacing(3),
    height: "2px",
    background: `linear-gradient(90deg, 
      ${theme.palette.primary.main}, 
      ${theme.palette.secondary.main}, 
      transparent
    )`,
    borderRadius: "0 0 2px 2px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2, 2, 1.5, 2),
    "& .MuiTypography-root": {
      fontSize: "1.1rem",
      paddingRight: theme.spacing(4),
    },
  },
}));

// Enhanced Dialog Content
const ModernDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  position: "relative",

  // Custom scrollbar
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: alpha(theme.palette.action.hover, 0.1),
    borderRadius: 3,
  },
  "&::-webkit-scrollbar-thumb": {
    background: alpha(theme.palette.action.active, 0.3),
    borderRadius: 3,
    "&:hover": {
      background: alpha(theme.palette.action.active, 0.5),
    },
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

// Enhanced Dialog Actions
const ModernDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3, 3),
  gap: theme.spacing(1.5),
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  background: `linear-gradient(135deg, 
    transparent 0%, 
    ${alpha(theme.palette.action.hover, 0.02)} 100%
  )`,

  "& .MuiButton-root": {
    borderRadius: theme.shape.borderRadius,
    textTransform: "none",
    fontWeight: 500,
    minWidth: 100,
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5, 2, 2, 2),
    flexDirection: "column-reverse",
    "& .MuiButton-root": {
      width: "100%",
    },
  },
}));

// Close button with enhanced styling
const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(2),
  top: theme.spacing(2),
  color: theme.palette.text.secondary,
  backgroundColor: alpha(theme.palette.action.hover, 0.1),
  backdropFilter: "blur(10px)",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  zIndex: 1,

  "&:hover": {
    backgroundColor: alpha(theme.palette.error.main, 0.1),
    color: theme.palette.error.main,
    transform: "scale(1.1)",
  },

  [theme.breakpoints.down("sm")]: {
    right: theme.spacing(1),
    top: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

// Transition components
const transitions = {
  slide: forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
  )),
  zoom: forwardRef((props, ref) => <Zoom ref={ref} {...props} />),
  fade: forwardRef((props, ref) => <Fade ref={ref} {...props} />),
};

const ModernDialog = ({
  open,
  onClose,
  title,
  children,
  actions,
  variant = "glass",
  size = "medium",
  transition = "zoom",
  showCloseButton = true,
  disableBackdropClick = false,
  maxWidth = false,
  fullWidth = true,
  fullScreen = false,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Automatically use fullScreen on mobile for large dialogs
  const shouldUseFullScreen = fullScreen || (isMobile && size === "large");

  const TransitionComponent = transitions[transition] || transitions.zoom;

  const handleBackdropClick = (event) => {
    if (!disableBackdropClick && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      fullScreen={shouldUseFullScreen}
      maxWidth={maxWidth}
      TransitionComponent={TransitionComponent}
      slots={{
        backdrop: ModernBackdrop,
      }}
      PaperComponent={({ children, ...paperProps }) => (
        <ModernDialogPaper
          variant={variant}
          size={shouldUseFullScreen ? "fullscreen" : size}
          {...paperProps}
        >
          {children}
        </ModernDialogPaper>
      )}
      onClick={handleBackdropClick}
      sx={{
        "& .MuiDialog-container": {
          backdropFilter: "none", // We handle this in our custom backdrop
        },
        zIndex: theme.zIndex.modal,
      }}
      {...props}
    >
      {title && (
        <ModernDialogTitle>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          {showCloseButton && (
            <CloseButton onClick={onClose} size="small">
              <CloseIcon fontSize="small" />
            </CloseButton>
          )}
        </ModernDialogTitle>
      )}

      <ModernDialogContent>{children}</ModernDialogContent>

      {actions && <ModernDialogActions>{actions}</ModernDialogActions>}
    </Dialog>
  );
};

// Export individual components for flexibility
export {
  ModernDialog as default,
  ModernDialogTitle,
  ModernDialogContent,
  ModernDialogActions,
  ModernBackdrop,
};
