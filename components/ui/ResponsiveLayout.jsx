"use client";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";

// Responsive container with modern spacing
const ModernContainer = styled(Container)(({ theme, variant = "default" }) => {
  const variants = {
    default: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
      [theme.breakpoints.up("lg")]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    },
    tight: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    wide: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
      [theme.breakpoints.up("lg")]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
      },
    },
    full: {
      paddingLeft: 0,
      paddingRight: 0,
      maxWidth: "none",
    },
  };

  return {
    ...variants[variant],
  };
});

// Responsive grid with modern spacing
const ModernGrid = styled(Grid)(({ theme, responsive = true }) => ({
  ...(responsive && {
    [theme.breakpoints.down("sm")]: {
      "&.MuiGrid-item": {
        paddingLeft: theme.spacing(1),
        paddingTop: theme.spacing(1),
      },
    },
    [theme.breakpoints.down("md")]: {
      "&.MuiGrid-container": {
        marginLeft: `-${theme.spacing(1)}`,
        marginTop: `-${theme.spacing(1)}`,
      },
    },
  }),
}));

// Modern stack with responsive spacing
const ModernStack = styled(Stack)(({ theme, responsive = true }) => ({
  ...(responsive && {
    [theme.breakpoints.down("sm")]: {
      spacing: 1,
    },
    [theme.breakpoints.between("sm", "md")]: {
      spacing: 2,
    },
    [theme.breakpoints.up("md")]: {
      spacing: 3,
    },
  }),
}));

// Responsive section wrapper
const ResponsiveSection = styled(Box)(({ theme, variant = "default" }) => {
  const variants = {
    default: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
    compact: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
    },
    spacious: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
      },
    },
    hero: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(12),
      },
      [theme.breakpoints.up("lg")]: {
        paddingTop: theme.spacing(16),
        paddingBottom: theme.spacing(16),
      },
    },
  };

  return {
    ...variants[variant],
  };
});

// Responsive card grid
const ResponsiveCardGrid = ({
  children,
  minCardWidth = 300,
  gap = 3,
  ...props
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const getColumns = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    return 4;
  };

  return (
    <Grid container spacing={gap} {...props}>
      {children.map((child, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

// Responsive layout hook
export const useResponsiveLayout = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isMobile,
    isTablet,
    isDesktop,
    breakpoint: isXs ? "xs" : isSm ? "sm" : isMd ? "md" : isLg ? "lg" : "xl",
    spacing: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
    },
    containerMaxWidth: isMobile ? "sm" : isTablet ? "md" : "lg",
  };
};

// Responsive spacing hook
export const useResponsiveSpacing = () => {
  const { isMobile, isTablet } = useResponsiveLayout();

  return {
    section: isMobile ? 2 : isTablet ? 4 : 6,
    component: isMobile ? 1 : isTablet ? 2 : 3,
    element: isMobile ? 0.5 : isTablet ? 1 : 1.5,
    card: isMobile ? 2 : isTablet ? 3 : 4,
    dialog: isMobile ? 1 : isTablet ? 2 : 3,
  };
};

// Auto-responsive text component
export const ResponsiveText = ({
  variant = "body1",
  mobileVariant,
  tabletVariant,
  children,
  ...props
}) => {
  const { isMobile, isTablet } = useResponsiveLayout();

  const getVariant = () => {
    if (isMobile && mobileVariant) return mobileVariant;
    if (isTablet && tabletVariant) return tabletVariant;
    return variant;
  };

  return (
    <Typography variant={getVariant()} {...props}>
      {children}
    </Typography>
  );
};

// Responsive dialog sizing
export const useResponsiveDialog = (baseSize = "medium") => {
  const { isMobile, isTablet } = useResponsiveLayout();

  const sizeMap = {
    small: { mobile: "small", tablet: "small", desktop: "small" },
    medium: { mobile: "fullscreen", tablet: "medium", desktop: "medium" },
    large: { mobile: "fullscreen", tablet: "large", desktop: "large" },
    fullscreen: {
      mobile: "fullscreen",
      tablet: "fullscreen",
      desktop: "large",
    },
  };

  const getDialogProps = () => {
    const size = sizeMap[baseSize];

    if (isMobile) {
      return {
        fullScreen: size.mobile === "fullscreen",
        maxWidth: size.mobile === "fullscreen" ? false : size.mobile,
        size: size.mobile,
      };
    }

    if (isTablet) {
      return {
        fullScreen: false,
        maxWidth: size.tablet,
        size: size.tablet,
      };
    }

    return {
      fullScreen: false,
      maxWidth: size.desktop,
      size: size.desktop,
    };
  };

  return getDialogProps();
};

// Responsive layout components
export {
  ModernContainer,
  ModernGrid,
  ModernStack,
  ResponsiveSection,
  ResponsiveCardGrid,
};

// Responsive utilities
export const responsiveSpacing = (theme, base = 1) => ({
  [theme.breakpoints.down("sm")]: theme.spacing(base * 0.5),
  [theme.breakpoints.between("sm", "md")]: theme.spacing(base * 0.75),
  [theme.breakpoints.up("md")]: theme.spacing(base),
});

export const responsiveFontSize = (theme, base = 1) => ({
  [theme.breakpoints.down("sm")]: `${base * 0.875}rem`,
  [theme.breakpoints.between("sm", "md")]: `${base * 0.9375}rem`,
  [theme.breakpoints.up("md")]: `${base}rem`,
});

export const responsivePadding = (theme, base = 2) => ({
  [theme.breakpoints.down("sm")]: theme.spacing(base),
  [theme.breakpoints.between("sm", "md")]: theme.spacing(base * 1.5),
  [theme.breakpoints.up("md")]: theme.spacing(base * 2),
});

export const responsiveMargin = (theme, base = 2) => ({
  [theme.breakpoints.down("sm")]: theme.spacing(base),
  [theme.breakpoints.between("sm", "md")]: theme.spacing(base * 1.5),
  [theme.breakpoints.up("md")]: theme.spacing(base * 2),
});
