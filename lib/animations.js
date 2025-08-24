import { keyframes } from "@mui/material/styles";

// Entrance Animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Floating Animation
export const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Pulse Animation
export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Shimmer Effect for Loading
export const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Gradient Animation
export const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Bounce Animation
export const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Rotation Animation
export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Glow Effect
export const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(99, 102, 241, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.4), 0 0 30px rgba(99, 102, 241, 0.2);
  }
`;

// Typing Animation
export const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

// Slide Up Animation
export const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Heart Beat Animation
export const heartbeat = keyframes`
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.1);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(1);
  }
`;

// Animation Utility Functions
export const createStaggerAnimation = (delay = 0.1) => ({
  animation: `${fadeIn} 0.6s ease-out ${delay}s both`,
});

export const createHoverScale = (scale = 1.05) => ({
  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: `scale(${scale})`,
  },
});

export const createHoverLift = (translateY = -4) => ({
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: `translateY(${translateY}px)`,
  },
});

export const createPulseEffect = (color = "primary.main") => ({
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "inherit",
    background: color,
    opacity: 0.3,
    animation: `${pulse} 2s infinite`,
    zIndex: -1,
  },
});

export const createShimmerEffect = (theme) => ({
  background: `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 50%, ${theme.palette.background.paper} 100%)`,
  backgroundSize: "200px 100%",
  animation: `${shimmer} 1.5s infinite`,
});

export const createFloatingEffect = (duration = 3) => ({
  animation: `${float} ${duration}s ease-in-out infinite`,
});

export const createTypewriterEffect = (duration = 2) => ({
  overflow: "hidden",
  borderRight: "2px solid",
  whiteSpace: "nowrap",
  animation: `${typing} ${duration}s steps(40, end), blink-caret 0.75s step-end infinite`,
  "@keyframes blink-caret": {
    "from, to": { borderColor: "transparent" },
    "50%": { borderColor: "currentColor" },
  },
});

// Transition Presets
export const transitions = {
  smooth: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  bouncy: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  snappy: "all 0.2s cubic-bezier(0.4, 0, 1, 1)",
  gentle: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  energetic: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

// Easing Functions
export const easing = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  bouncy: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

export default {
  fadeIn,
  slideInLeft,
  slideInRight,
  scaleIn,
  float,
  pulse,
  shimmer,
  gradientShift,
  bounceIn,
  rotate,
  glow,
  typing,
  slideUp,
  heartbeat,
  createStaggerAnimation,
  createHoverScale,
  createHoverLift,
  createPulseEffect,
  createShimmerEffect,
  createFloatingEffect,
  createTypewriterEffect,
  transitions,
  easing,
};
