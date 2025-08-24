import {
  Box,
  CircularProgress,
  LinearProgress,
  styled,
  useTheme,
} from "@mui/material";
import { keyframes, alpha } from "@mui/material/styles";

// Pulse Animation
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Shimmer Animation
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Bouncing Dots Animation
const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

// Spinner Animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Modern Loading Spinner
const ModernSpinner = styled(Box)(
  ({ theme, size = 40, color = "primary" }) => ({
    display: "inline-block",
    width: size,
    height: size,
    border: `3px solid ${alpha(theme.palette[color].main, 0.1)}`,
    borderRadius: "50%",
    borderTopColor: theme.palette[color].main,
    animation: `${spin} 1s ease-in-out infinite`,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 2,
      left: 2,
      right: 2,
      bottom: 2,
      border: `2px solid transparent`,
      borderRadius: "50%",
      borderTopColor: alpha(theme.palette[color].main, 0.6),
      animation: `${spin} 0.7s ease-in-out infinite reverse`,
    },
  })
);

// Bouncing Dots Loader
const BouncingDots = styled(Box)(({ theme, color = "primary" }) => ({
  display: "inline-block",
  position: "relative",
  width: 80,
  height: 20,
  "& div": {
    position: "absolute",
    top: 0,
    width: 13,
    height: 13,
    borderRadius: "50%",
    backgroundColor: theme.palette[color].main,
    animationFillMode: "both",
    animation: `${bounce} 1.4s infinite ease-in-out`,
    "&:nth-of-type(1)": {
      left: 8,
      animationDelay: "-0.32s",
    },
    "&:nth-of-type(2)": {
      left: 32,
      animationDelay: "-0.16s",
    },
    "&:nth-of-type(3)": {
      left: 56,
      animationDelay: "0s",
    },
  },
}));

// Pulsing Loader
const PulsingLoader = styled(Box)(
  ({ theme, color = "primary", size = 60 }) => ({
    width: size,
    height: size,
    backgroundColor: theme.palette[color].main,
    borderRadius: "50%",
    animation: `${pulse} 1.5s ease-in-out infinite`,
    display: "inline-block",
  })
);

// Shimmer Skeleton
const ShimmerSkeleton = styled(Box)(
  ({ theme, width = "100%", height = 20, variant = "rectangular" }) => ({
    width,
    height,
    backgroundColor: alpha(theme.palette.action.hover, 0.3),
    borderRadius:
      variant === "circular"
        ? "50%"
        : variant === "rounded"
        ? theme.shape.borderRadius
        : 0,
    background: `linear-gradient(90deg, ${alpha(
      theme.palette.action.hover,
      0.1
    )} 0%, ${alpha(theme.palette.action.hover, 0.3)} 50%, ${alpha(
      theme.palette.action.hover,
      0.1
    )} 100%)`,
    backgroundSize: "200px 100%",
    animation: `${shimmer} 1.5s infinite`,
    display: "inline-block",
  })
);

// Modern Progress Bar
const ModernProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  "& .MuiLinearProgress-bar": {
    borderRadius: theme.shape.borderRadius,
    background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    backgroundSize: "200% 100%",
    animation: `${shimmer} 2s infinite`,
  },
}));

// Loading Overlay
const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: theme.zIndex.modal + 1,
  flexDirection: "column",
  gap: theme.spacing(2),
}));

// Card Loading Skeleton
const CardSkeleton = ({ lines = 3, hasAvatar = false, hasActions = false }) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      {hasAvatar && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <ShimmerSkeleton variant="circular" width={40} height={40} />
          <Box sx={{ ml: 2, flex: 1 }}>
            <ShimmerSkeleton width="60%" height={16} />
            <ShimmerSkeleton width="40%" height={14} sx={{ mt: 0.5 }} />
          </Box>
        </Box>
      )}

      <ShimmerSkeleton width="80%" height={24} sx={{ mb: 1 }} />

      {Array.from(new Array(lines)).map((_, index) => (
        <ShimmerSkeleton
          key={index}
          width={index === lines - 1 ? "60%" : "100%"}
          height={16}
          sx={{ mb: 1 }}
        />
      ))}

      {hasActions && (
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <ShimmerSkeleton width={80} height={36} variant="rounded" />
          <ShimmerSkeleton width={80} height={36} variant="rounded" />
        </Box>
      )}
    </Box>
  );
};

// Table Loading Skeleton
const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {Array.from(new Array(columns)).map((_, index) => (
          <ShimmerSkeleton key={index} width="100%" height={20} />
        ))}
      </Box>

      {/* Rows */}
      {Array.from(new Array(rows)).map((_, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: "flex",
            gap: 2,
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          {Array.from(new Array(columns)).map((_, colIndex) => (
            <ShimmerSkeleton key={colIndex} width="100%" height={16} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

// Custom Loading Button
const LoadingButton = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  cursor: "not-allowed",
  opacity: 0.7,
}));

// Main Loading Component
const LoadingSpinner = ({
  variant = "spinner",
  size = 40,
  color = "primary",
  overlay = false,
  text,
  ...props
}) => {
  const theme = useTheme();

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return <BouncingDots color={color} />;
      case "pulse":
        return <PulsingLoader color={color} size={size} />;
      case "progress":
        return <ModernProgressBar />;
      case "spinner":
      default:
        return <ModernSpinner size={size} color={color} />;
    }
  };

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        ...props.sx,
      }}
    >
      {renderLoader()}
      {text && (
        <Box
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem",
            fontWeight: 500,
            textAlign: "center",
            animation: `${pulse} 2s infinite`,
          }}
        >
          {text}
        </Box>
      )}
    </Box>
  );

  if (overlay) {
    return <LoadingOverlay>{content}</LoadingOverlay>;
  }

  return content;
};

export {
  LoadingSpinner as default,
  ModernSpinner,
  BouncingDots,
  PulsingLoader,
  ShimmerSkeleton,
  ModernProgressBar,
  LoadingOverlay,
  CardSkeleton,
  TableSkeleton,
  LoadingButton,
};
