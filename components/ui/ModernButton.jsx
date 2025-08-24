import { Button, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { forwardRef } from "react";

// Enhanced Button Variants
const StyledButton = styled(Button)(
  ({ theme, variant, color = "primary", size = "medium" }) => {
    const colorPalette = theme.palette[color] || theme.palette.primary;

    const variants = {
      gradient: {
        background: `linear-gradient(135deg, ${colorPalette.main} 0%, ${colorPalette.dark} 100%)`,
        color: colorPalette.contrastText,
        border: "none",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${colorPalette.light} 0%, ${colorPalette.main} 100%)`,
          opacity: 0,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0px 12px 40px -12px ${alpha(colorPalette.main, 0.4)}`,
          "&::before": {
            opacity: 1,
          },
        },
        "&:active": {
          transform: "translateY(0px)",
        },
        "& .MuiButton-startIcon, & .MuiButton-endIcon": {
          zIndex: 1,
        },
        "& .MuiButton-label": {
          zIndex: 1,
        },
      },

      glass: {
        background: alpha(colorPalette.main, 0.1),
        backdropFilter: "blur(20px)",
        border: `1px solid ${alpha(colorPalette.main, 0.2)}`,
        color: colorPalette.main,
        "&:hover": {
          background: alpha(colorPalette.main, 0.15),
          border: `1px solid ${alpha(colorPalette.main, 0.3)}`,
          transform: "translateY(-2px)",
          boxShadow: `0px 12px 40px -12px ${alpha(colorPalette.main, 0.25)}`,
        },
      },

      neon: {
        background: "transparent",
        border: `2px solid ${colorPalette.main}`,
        color: colorPalette.main,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${alpha(
            colorPalette.main,
            0.3
          )}, transparent)`,
          transition: "left 0.6s",
        },
        "&:hover": {
          boxShadow: `0 0 20px ${alpha(
            colorPalette.main,
            0.5
          )}, inset 0 0 20px ${alpha(colorPalette.main, 0.1)}`,
          color: colorPalette.contrastText,
          background: alpha(colorPalette.main, 0.1),
          "&::before": {
            left: "100%",
          },
        },
      },

      elevated: {
        background: theme.palette.background.paper,
        color: colorPalette.main,
        border: `1px solid ${alpha(colorPalette.main, 0.2)}`,
        boxShadow: theme.shadows[4],
        "&:hover": {
          background: alpha(colorPalette.main, 0.05),
          transform: "translateY(-4px)",
          boxShadow: `${theme.shadows[8]}, 0px 8px 30px -8px ${alpha(
            colorPalette.main,
            0.3
          )}`,
          border: `1px solid ${alpha(colorPalette.main, 0.4)}`,
        },
      },

      minimal: {
        background: "transparent",
        color: colorPalette.main,
        border: "none",
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "50%",
          width: 0,
          height: "2px",
          background: colorPalette.main,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: "translateX(-50%)",
        },
        "&:hover": {
          background: alpha(colorPalette.main, 0.05),
          "&::after": {
            width: "80%",
          },
        },
      },
    };

    const sizes = {
      small: {
        padding: "6px 16px",
        fontSize: "0.75rem",
        minHeight: 32,
      },
      medium: {
        padding: "10px 24px",
        fontSize: "0.875rem",
        minHeight: 40,
      },
      large: {
        padding: "14px 32px",
        fontSize: "1rem",
        minHeight: 48,
      },
    };

    return {
      borderRadius: theme.shape.borderRadius,
      fontWeight: 600,
      textTransform: "none",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      zIndex: 1,
      ...sizes[size],
      ...variants[variant],
    };
  }
);

const ModernButton = forwardRef(
  (
    {
      variant = "gradient",
      color = "primary",
      size = "medium",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

ModernButton.displayName = "ModernButton";

export default ModernButton;
