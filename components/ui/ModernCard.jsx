import { Card, CardContent, styled, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { forwardRef } from "react";

const StyledCard = styled(Card)(
  ({ theme, variant = "glass", elevation = 0, interactive = false }) => {
    const variants = {
      glass: {
        background: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(20px)",
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: theme.shadows[elevation || 4],
      },

      gradient: {
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.05
        )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        backdropFilter: "blur(20px)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: theme.shadows[elevation || 2],
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${alpha(
            theme.palette.primary.main,
            0.3
          )}, transparent)`,
        },
      },

      elevated: {
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[elevation || 8],
      },

      outlined: {
        background: "transparent",
        backdropFilter: "blur(10px)",
        border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        boxShadow: "none",
      },

      neon: {
        background: alpha(theme.palette.background.paper, 0.05),
        backdropFilter: "blur(20px)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.1)}`,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          borderRadius: "inherit",
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
          backgroundSize: "200% 200%",
          zIndex: -1,
          opacity: 0,
          transition: "opacity 0.3s ease",
          animation: "gradient-shift 3s ease infinite",
        },
      },

      minimal: {
        background: "transparent",
        border: "none",
        boxShadow: "none",
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        paddingLeft: theme.spacing(2),
      },
    };

    const baseStyles = {
      borderRadius: theme.shape.borderRadius,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
      ...(interactive && {
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          ...((variant === "glass" || variant === "gradient") && {
            borderColor: alpha(theme.palette.primary.main, 0.3),
            boxShadow: `${theme.shadows[12]}, 0px 8px 30px -8px ${alpha(
              theme.palette.primary.main,
              0.15
            )}`,
          }),
          ...(variant === "elevated" && {
            boxShadow: `${theme.shadows[16]}, 0px 12px 40px -12px ${alpha(
              theme.palette.primary.main,
              0.2
            )}`,
          }),
          ...(variant === "outlined" && {
            borderColor: theme.palette.primary.main,
            background: alpha(theme.palette.primary.main, 0.05),
          }),
          ...(variant === "neon" && {
            boxShadow: `0 0 30px ${alpha(theme.palette.primary.main, 0.3)}`,
            "&::after": {
              opacity: 1,
            },
          }),
        },
        "&:active": {
          transform: "translateY(-2px)",
        },
      }),
      ...variants[variant],
    };

    return baseStyles;
  }
);

// Animation keyframes for neon variant
const keyframes = `
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

// Add keyframes to head if not already present
if (
  typeof document !== "undefined" &&
  !document.getElementById("modern-card-keyframes")
) {
  const style = document.createElement("style");
  style.id = "modern-card-keyframes";
  style.textContent = keyframes;
  document.head.appendChild(style);
}

const ModernCard = forwardRef(
  (
    {
      variant = "glass",
      elevation = 0,
      interactive = false,
      children,
      sx = {},
      ...props
    },
    ref
  ) => {
    return (
      <StyledCard
        ref={ref}
        variant={variant}
        elevation={elevation}
        interactive={interactive}
        sx={sx}
        {...props}
      >
        {children}
      </StyledCard>
    );
  }
);

ModernCard.displayName = "ModernCard";

// Enhanced CardContent with better spacing
const ModernCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  "&:last-child": {
    paddingBottom: theme.spacing(3),
  },
  "&.compact": {
    padding: theme.spacing(2),
    "&:last-child": {
      paddingBottom: theme.spacing(2),
    },
  },
  "&.spacious": {
    padding: theme.spacing(4),
    "&:last-child": {
      paddingBottom: theme.spacing(4),
    },
  },
}));

// Card Header with modern styling
const ModernCardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 3, 0, 3),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export { ModernCard as default, ModernCardContent, ModernCardHeader };
