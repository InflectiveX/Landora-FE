import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  styled,
  Box,
  Chip,
  IconButton,
  Typography,
  Checkbox,
  Avatar,
  LinearProgress,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreVert,
  Edit,
  Delete,
  Visibility,
} from "@mui/icons-material";
import { useState } from "react";

// Modern Table Container with glassmorphism
const ModernTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: theme.shadows[4],
  overflow: "hidden",
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
}));

// Enhanced Table with better spacing
const ModernTable = styled(Table)(({ theme }) => ({
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    padding: theme.spacing(2),
    transition: "all 0.2s ease",
  },
  "& .MuiTableRow-root": {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
      transform: "translateX(4px)",
      "& .action-buttons": {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
    "&.selected": {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      borderLeft: `3px solid ${theme.palette.primary.main}`,
    },
  },
}));

// Modern Table Header
const ModernTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  backdropFilter: "blur(10px)",
  "& .MuiTableCell-head": {
    backgroundColor: "transparent",
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: "0.875rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    position: "relative",
    "&.sortable": {
      cursor: "pointer",
      userSelect: "none",
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        color: theme.palette.primary.main,
      },
    },
  },
}));

// Status Chip with various states
const StatusChip = styled(Chip)(({ theme, status = "active" }) => {
  const statusStyles = {
    active: {
      backgroundColor: alpha(theme.palette.success.main, 0.1),
      color: theme.palette.success.main,
      border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
    },
    pending: {
      backgroundColor: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
      border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
    },
    inactive: {
      backgroundColor: alpha(theme.palette.error.main, 0.1),
      color: theme.palette.error.main,
      border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
    },
    processing: {
      backgroundColor: alpha(theme.palette.info.main, 0.1),
      color: theme.palette.info.main,
      border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
    },
  };

  return {
    borderRadius: theme.shape.borderRadius,
    fontWeight: 600,
    fontSize: "0.75rem",
    height: 28,
    backdropFilter: "blur(10px)",
    ...statusStyles[status],
  };
});

// Action Buttons Container
const ActionButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  opacity: 0,
  transform: "translateX(8px)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "& .MuiIconButton-root": {
    width: 32,
    height: 32,
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: "blur(10px)",
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    borderRadius: theme.shape.borderRadius,
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
    "&.edit": {
      "&:hover": {
        backgroundColor: alpha(theme.palette.info.main, 0.1),
        borderColor: theme.palette.info.main,
        color: theme.palette.info.main,
      },
    },
    "&.delete": {
      "&:hover": {
        backgroundColor: alpha(theme.palette.error.main, 0.1),
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
      },
    },
    "&.view": {
      "&:hover": {
        backgroundColor: alpha(theme.palette.success.main, 0.1),
        borderColor: theme.palette.success.main,
        color: theme.palette.success.main,
      },
    },
  },
}));

// User Cell with Avatar and info
const UserCell = ({ user, subtitle }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Avatar
        src={user.avatar}
        sx={{
          width: 40,
          height: 40,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          fontSize: "0.875rem",
          fontWeight: 600,
        }}
      >
        {user.name?.[0] || user.email?.[0]}
      </Avatar>
      <Box>
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {user.name || user.email}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

// Progress Cell with enhanced styling
const ProgressCell = ({ value, label, color = "primary" }) => {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: 120 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minWidth: 35 }}
        >
          {`${Math.round(value)}%`}
        </Typography>
        {label && (
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {label}
          </Typography>
        )}
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette[color].main, 0.1),
          "& .MuiLinearProgress-bar": {
            borderRadius: theme.shape.borderRadius,
            background: `linear-gradient(90deg, ${theme.palette[color].light}, ${theme.palette[color].main})`,
          },
        }}
      />
    </Box>
  );
};

// Expandable Table Row
const ExpandableTableRow = ({ children, expandContent, ...props }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <TableRow {...props}>
        <TableCell padding="checkbox">
          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <KeyboardArrowDown />
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan="100%" sx={{ py: 0, border: 0 }}>
            <Box
              sx={{
                p: 2,
                backgroundColor: (alpha) => alpha("primary.main", 0.02),
                borderRadius: 1,
                margin: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {expandContent}
            </Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

// Enhanced Table Pagination
const ModernTablePagination = styled(TablePagination)(({ theme }) => ({
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  "& .MuiTablePagination-toolbar": {
    padding: theme.spacing(1, 2),
  },
  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
  "& .MuiIconButton-root": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(0, 0.25),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
      transform: "scale(1.05)",
    },
    "&.Mui-disabled": {
      backgroundColor: alpha(theme.palette.action.disabled, 0.05),
      borderColor: alpha(theme.palette.action.disabled, 0.1),
    },
  },
}));

// Search and Filter Bar
const TableToolbar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  gap: theme.spacing(2),
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export {
  ModernTableContainer,
  ModernTable,
  ModernTableHead,
  ModernTablePagination,
  StatusChip,
  ActionButtons,
  UserCell,
  ProgressCell,
  ExpandableTableRow,
  TableToolbar,
};
