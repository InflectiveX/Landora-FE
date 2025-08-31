"use client";
import {
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  IconButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  styled,
  Fade,
  Grow,
  Slide,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { forwardRef, useState } from "react";

// Enhanced Menu with glassmorphism
const ModernMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: alpha(theme.palette.background.paper, 0.95),
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: `
      0px 8px 32px -4px ${alpha(theme.palette.common.black, 0.25)},
      0px 0px 0px 1px ${alpha(theme.palette.primary.main, 0.05)}
    `,
    minWidth: 200,
    padding: theme.spacing(1),
    overflow: "visible",

    // Subtle top accent line
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: theme.spacing(2),
      right: theme.spacing(2),
      height: "2px",
      background: `linear-gradient(90deg, 
        ${theme.palette.primary.main}, 
        ${theme.palette.secondary.main}, 
        transparent
      )`,
      borderRadius: "0 0 1px 1px",
    },
  },

  "& .MuiList-root": {
    padding: 0,
  },
}));

// Enhanced Popover with glassmorphism
const ModernPopover = styled(Popover)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: alpha(theme.palette.background.paper, 0.95),
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: `
      0px 8px 32px -4px ${alpha(theme.palette.common.black, 0.25)},
      0px 0px 0px 1px ${alpha(theme.palette.primary.main, 0.05)}
    `,
    overflow: "visible",
    padding: theme.spacing(1),
  },
}));

// Enhanced MenuItem with modern styling
const ModernMenuItem = styled(MenuItem)(({ theme, variant = "default" }) => {
  const variants = {
    default: {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        transform: "translateX(4px)",
      },
    },
    danger: {
      color: theme.palette.error.main,
      "&:hover": {
        backgroundColor: alpha(theme.palette.error.main, 0.08),
        transform: "translateX(4px)",
      },
      "& .MuiListItemIcon-root": {
        color: theme.palette.error.main,
      },
    },
    success: {
      color: theme.palette.success.main,
      "&:hover": {
        backgroundColor: alpha(theme.palette.success.main, 0.08),
        transform: "translateX(4px)",
      },
      "& .MuiListItemIcon-root": {
        color: theme.palette.success.main,
      },
    },
    warning: {
      color: theme.palette.warning.main,
      "&:hover": {
        backgroundColor: alpha(theme.palette.warning.main, 0.08),
        transform: "translateX(4px)",
      },
      "& .MuiListItemIcon-root": {
        color: theme.palette.warning.main,
      },
    },
  };

  return {
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(0.5, 0),
    padding: theme.spacing(1.5, 2),
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    minHeight: 48,

    "& .MuiListItemIcon-root": {
      minWidth: 36,
      color: theme.palette.text.secondary,
      transition: "color 0.2s ease",
    },

    "& .MuiListItemText-root": {
      margin: 0,
      "& .MuiTypography-root": {
        fontWeight: 500,
        fontSize: "0.875rem",
      },
    },

    "&.Mui-selected": {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
      borderLeft: `3px solid ${theme.palette.primary.main}`,
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
      },
    },

    "&.Mui-disabled": {
      opacity: 0.6,
    },

    ...variants[variant],
  };
});

// Menu section divider
const ModernMenuDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  backgroundColor: alpha(theme.palette.divider, 0.1),
  "&::before, &::after": {
    borderColor: alpha(theme.palette.divider, 0.1),
  },
}));

// Menu section header
const MenuSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2, 0.5, 2),
  "& .MuiTypography-root": {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: theme.palette.text.secondary,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
}));

// Context menu backdrop
const ContextMenuBackdrop = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "transparent",
  zIndex: theme.zIndex.modal - 1,
}));

// Transition components
const transitions = {
  fade: forwardRef((props, ref) => <Fade ref={ref} timeout={200} {...props} />),
  grow: forwardRef((props, ref) => <Grow ref={ref} timeout={200} {...props} />),
  slide: forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} timeout={200} {...props} />
  )),
};

// Enhanced Menu Component
const EnhancedMenu = ({
  anchorEl,
  open,
  onClose,
  children,
  transition = "grow",
  placement = "bottom-start",
  ...props
}) => {
  const TransitionComponent = transitions[transition] || transitions.grow;

  return (
    <ModernMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      TransitionComponent={TransitionComponent}
      anchorOrigin={{
        vertical: placement.includes("top") ? "top" : "bottom",
        horizontal: placement.includes("end") ? "right" : "left",
      }}
      transformOrigin={{
        vertical: placement.includes("top") ? "bottom" : "top",
        horizontal: placement.includes("end") ? "right" : "left",
      }}
      {...props}
    >
      {children}
    </ModernMenu>
  );
};

// Enhanced Popover Component
const EnhancedPopover = ({
  anchorEl,
  open,
  onClose,
  children,
  transition = "grow",
  placement = "bottom-start",
  ...props
}) => {
  const TransitionComponent = transitions[transition] || transitions.grow;

  return (
    <ModernPopover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      TransitionComponent={TransitionComponent}
      anchorOrigin={{
        vertical: placement.includes("top") ? "top" : "bottom",
        horizontal: placement.includes("end") ? "right" : "left",
      }}
      transformOrigin={{
        vertical: placement.includes("top") ? "bottom" : "top",
        horizontal: placement.includes("end") ? "right" : "left",
      }}
      {...props}
    >
      {children}
    </ModernPopover>
  );
};

// Context Menu Hook
export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return {
    contextMenu,
    handleContextMenu,
    handleClose,
  };
};

// Context Menu Component
export const ContextMenu = ({ contextMenu, onClose, children }) => {
  return (
    <>
      {contextMenu && <ContextMenuBackdrop onClick={onClose} />}
      <ModernMenu
        open={contextMenu !== null}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {children}
      </ModernMenu>
    </>
  );
};

// Dropdown Menu Component
export const DropdownMenu = ({
  trigger,
  children,
  placement = "bottom-start",
  transition = "grow",
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box onClick={handleClick} sx={{ display: "inline-block" }}>
        {trigger}
      </Box>
      <EnhancedMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        placement={placement}
        transition={transition}
        {...props}
      >
        {children}
      </EnhancedMenu>
    </>
  );
};

export {
  EnhancedMenu as default,
  ModernMenuItem,
  ModernMenuDivider,
  MenuSection,
  EnhancedPopover,
  useContextMenu,
};
