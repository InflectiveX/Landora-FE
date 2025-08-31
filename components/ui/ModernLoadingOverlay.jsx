"use client";
import {
  Box,
  Backdrop,
  CircularProgress,
  Typography,
  Fade,
  Zoom,
  styled,
  keyframes,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState, useEffect } from "react";

// Pulse animation
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
`;

// Ripple animation
const ripple = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
`;

// Floating particles animation
const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
`;

// Enhanced backdrop with stronger blur
const ModernBackdrop = styled(Backdrop)(({ theme, variant = "blur" }) => {
  const variants = {
    blur: {
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
    },
    dark: {
      backgroundColor: alpha(theme.palette.common.black, 0.7),
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    light: {
      backgroundColor: alpha(theme.palette.common.white, 0.8),
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    gradient: {
      background: `radial-gradient(circle at center, 
        ${alpha(theme.palette.primary.main, 0.1)} 0%, 
        ${alpha(theme.palette.background.default, 0.9)} 70%
      )`,
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
  };

  return {
    zIndex: theme.zIndex.modal + 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    ...variants[variant],

    // Animated background particles
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${alpha(
        theme.palette.primary.main,
        0.05
      )} 0%, transparent 70%)`,
      animation: `${float} 8s ease-in-out infinite`,
    },
    "&::before": {
      top: "20%",
      left: "20%",
      animationDelay: "0s",
    },
    "&::after": {
      bottom: "20%",
      right: "20%",
      animationDelay: "4s",
    },
  };
});

// Loading spinner container with ripple effect
const SpinnerContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  // Ripple effects
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
    borderRadius: "50%",
    animation: `${ripple} 2s infinite`,
  },
  "&::before": {
    width: 80,
    height: 80,
    animationDelay: "0s",
  },
  "&::after": {
    width: 80,
    height: 80,
    animationDelay: "1s",
  },
}));

// Enhanced progress indicator
const ModernProgress = styled(CircularProgress)(({ theme, size = 40 }) => ({
  color: theme.palette.primary.main,
  animation: `${pulse} 2s ease-in-out infinite`,
  "& .MuiCircularProgress-circle": {
    strokeLinecap: "round",
    filter: `drop-shadow(0 0 8px ${alpha(theme.palette.primary.main, 0.4)})`,
  },
}));

// Loading text container
const LoadingTextContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  textAlign: "center",
  animation: `${pulse} 2s ease-in-out infinite`,
}));

// Floating particles component
const FloatingParticles = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <Box
        key={i}
        sx={{
          position: "absolute",
          width: 4,
          height: 4,
          backgroundColor: "primary.main",
          borderRadius: "50%",
          opacity: 0.6,
          animation: `${float} ${4 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
          left: `${20 + i * 10}%`,
          top: `${30 + i * 5}%`,
          filter: "blur(0.5px)",
        }}
      />
    ))}
  </>
);

const ModernLoadingOverlay = ({
  open,
  message = "Loading...",
  submessage,
  variant = "blur",
  showProgress = true,
  showParticles = true,
  size = 50,
  timeout = 300,
  children,
  ...props
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), timeout);
      return () => clearTimeout(timer);
    }
  }, [open, timeout]);

  if (!show) return null;

  return (
    <ModernBackdrop open={open} variant={variant} {...props}>
      <Fade in={open} timeout={timeout}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            minWidth: 200,
            minHeight: 200,
          }}
        >
          {showParticles && <FloatingParticles />}

          {showProgress && (
            <SpinnerContainer>
              <ModernProgress size={size} thickness={3} />
            </SpinnerContainer>
          )}

          <LoadingTextContainer>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "text.primary",
                fontWeight: 500,
                mb: submessage ? 1 : 0,
              }}
            >
              {message}
            </Typography>
            {submessage && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  opacity: 0.8,
                }}
              >
                {submessage}
              </Typography>
            )}
          </LoadingTextContainer>

          {children}
        </Box>
      </Fade>
    </ModernBackdrop>
  );
};

// Page transition overlay
export const PageTransition = ({ loading, message = "Loading page..." }) => (
  <ModernLoadingOverlay
    open={loading}
    message={message}
    variant="gradient"
    showParticles={true}
  />
);

// Form submission overlay
export const FormSubmissionOverlay = ({
  loading,
  message = "Submitting...",
  submessage = "Please wait while we process your request",
}) => (
  <ModernLoadingOverlay
    open={loading}
    message={message}
    submessage={submessage}
    variant="blur"
    showParticles={false}
    size={40}
  />
);

// File upload overlay
export const FileUploadOverlay = ({
  loading,
  progress,
  message = "Uploading files...",
}) => (
  <ModernLoadingOverlay
    open={loading}
    message={message}
    submessage={
      progress ? `${Math.round(progress)}% complete` : "Preparing upload..."
    }
    variant="blur"
    showProgress={!progress}
    showParticles={true}
  >
    {progress && (
      <Box sx={{ width: 200, mt: 2 }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={60}
          thickness={4}
          sx={{
            color: "primary.main",
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round",
            },
          }}
        />
      </Box>
    )}
  </ModernLoadingOverlay>
);

export default ModernLoadingOverlay;
