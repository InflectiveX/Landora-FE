"use client";
import {
  Snackbar,
  Alert,
  Slide,
  Grow,
  Fade,
  styled,
  IconButton,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  Close as CloseIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { forwardRef, useState, useEffect } from "react";

// Enhanced Snackbar with glassmorphism
const ModernSnackbar = styled(Snackbar)(({ theme }) => ({
  "& .MuiSnackbarContent-root": {
    backgroundColor: alpha(theme.palette.background.paper, 0.95),
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: `
      0px 8px 32px -4px ${alpha(theme.palette.common.black, 0.2)},
      0px 0px 0px 1px ${alpha(theme.palette.common.white, 0.05)}
    `,
    minWidth: 320,
    padding: theme.spacing(1),
  },
}));

// Modern Alert with enhanced styling
const ModernAlert = styled(Alert)(({ theme, variant = "filled" }) => {
  const getVariantStyles = (severity, variant) => {
    const severityColors = {
      success: theme.palette.success,
      error: theme.palette.error,
      warning: theme.palette.warning,
      info: theme.palette.info,
    };

    const color = severityColors[severity] || severityColors.info;

    const variants = {
      filled: {
        backgroundColor: alpha(color.main, 0.9),
        color: color.contrastText,
        "& .MuiAlert-icon": {
          color: color.contrastText,
        },
      },
      outlined: {
        backgroundColor: alpha(color.main, 0.05),
        border: `1px solid ${alpha(color.main, 0.3)}`,
        color: color.main,
        "& .MuiAlert-icon": {
          color: color.main,
        },
      },
      standard: {
        backgroundColor: alpha(color.main, 0.1),
        color: color.main,
        "& .MuiAlert-icon": {
          color: color.main,
        },
      },
      glass: {
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${alpha(color.main, 0.2)}`,
        color: theme.palette.text.primary,
        "& .MuiAlert-icon": {
          color: color.main,
        },
        // Colored left border accent
        borderLeft: `4px solid ${color.main}`,
      },
    };

    return variants[variant] || variants.glass;
  };

  return {
    borderRadius: theme.shape.borderRadius * 1.5,
    padding: theme.spacing(1.5, 2),
    fontSize: "0.875rem",
    fontWeight: 500,
    minHeight: 56,
    alignItems: "center",
    boxShadow: `0px 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    "& .MuiAlert-message": {
      flex: 1,
      padding: theme.spacing(0.5, 0),
    },

    "& .MuiAlert-action": {
      padding: 0,
      marginRight: theme.spacing(-1),
    },

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0px 8px 24px ${alpha(theme.palette.common.black, 0.15)}`,
    },

    ...getVariantStyles(props.severity, variant),
  };
});

// Progress indicator for auto-dismiss
const ProgressIndicator = styled(LinearProgress)(({ theme, severity }) => {
  const severityColors = {
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
  };

  return {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: "0 0 12px 12px",
    backgroundColor: alpha(
      severityColors[severity] || severityColors.info,
      0.2
    ),
    "& .MuiLinearProgress-bar": {
      backgroundColor: severityColors[severity] || severityColors.info,
      borderRadius: "0 0 12px 12px",
    },
  };
});

// Enhanced notification icons
const NotificationIcons = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

// Transition components
const transitions = {
  slide: forwardRef((props, ref) => (
    <Slide direction="left" ref={ref} {...props} />
  )),
  grow: forwardRef((props, ref) => <Grow ref={ref} {...props} />),
  fade: forwardRef((props, ref) => <Fade ref={ref} {...props} />),
};

const ModernNotification = ({
  open,
  onClose,
  message,
  title,
  severity = "info",
  variant = "glass",
  duration = 6000,
  showProgress = true,
  transition = "slide",
  position = { vertical: "top", horizontal: "right" },
  showIcon = true,
  closable = true,
  actions,
  ...props
}) => {
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!open || !showProgress || duration === null || isHovered) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          onClose?.();
          return 0;
        }
        return prev - 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [open, duration, showProgress, onClose, isHovered]);

  useEffect(() => {
    if (open) {
      setProgress(100);
    }
  }, [open]);

  const TransitionComponent = transitions[transition] || transitions.slide;
  const IconComponent = NotificationIcons[severity];

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <ModernSnackbar
      open={open}
      onClose={onClose}
      autoHideDuration={duration}
      anchorOrigin={position}
      TransitionComponent={TransitionComponent}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <ModernAlert
        severity={severity}
        variant={variant}
        icon={showIcon && IconComponent ? <IconComponent /> : false}
        action={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {actions}
            {closable && (
              <IconButton
                size="small"
                onClick={onClose}
                sx={{
                  color: "inherit",
                  opacity: 0.8,
                  "&:hover": {
                    opacity: 1,
                    backgroundColor: alpha("currentColor", 0.1),
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        }
        sx={{ position: "relative", width: "100%" }}
      >
        {title && (
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            {title}
          </Typography>
        )}
        <Typography variant="body2">{message}</Typography>

        {showProgress && duration && (
          <ProgressIndicator
            variant="determinate"
            value={progress}
            severity={severity}
          />
        )}
      </ModernAlert>
    </ModernSnackbar>
  );
};

// Toast notification system
class ToastManager {
  constructor() {
    this.notifications = new Map();
    this.listeners = new Set();
  }

  add(notification) {
    const id = Date.now() + Math.random();
    this.notifications.set(id, { ...notification, id });
    this.notify();
    return id;
  }

  remove(id) {
    this.notifications.delete(id);
    this.notify();
  }

  clear() {
    this.notifications.clear();
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) =>
      listener([...this.notifications.values()])
    );
  }
}

export const toastManager = new ToastManager();

// Toast notification hook
export const useToast = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    return toastManager.subscribe(setNotifications);
  }, []);

  const toast = {
    success: (message, options = {}) =>
      toastManager.add({ message, severity: "success", ...options }),
    error: (message, options = {}) =>
      toastManager.add({ message, severity: "error", ...options }),
    warning: (message, options = {}) =>
      toastManager.add({ message, severity: "warning", ...options }),
    info: (message, options = {}) =>
      toastManager.add({ message, severity: "info", ...options }),
    remove: (id) => toastManager.remove(id),
    clear: () => toastManager.clear(),
  };

  return { toast, notifications };
};

// Toast container component
export const ToastContainer = ({ maxToasts = 5 }) => {
  const { notifications } = useToast();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: (theme) => theme.zIndex.snackbar,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        maxWidth: 400,
      }}
    >
      {notifications.slice(-maxToasts).map((notification) => (
        <ModernNotification
          key={notification.id}
          open={true}
          onClose={() => toastManager.remove(notification.id)}
          {...notification}
        />
      ))}
    </Box>
  );
};

export default ModernNotification;
