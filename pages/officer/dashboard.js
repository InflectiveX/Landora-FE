import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
  Fade,
  Grow,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  AccountBalance as AccountBalanceIcon,
  Verified as VerifiedIcon,
  PendingActions as PendingActionsIcon,
} from "@mui/icons-material";
import OfficerLayout from "@/components/layouts/OfficerLayout";
import ModernCard, {
  ModernCardContent,
  ModernCardHeader,
} from "@/components/ui/ModernCard";
import ModernButton from "@/components/ui/ModernButton";
import { createStaggerAnimation, createHoverLift } from "@/lib/animations";

// Mock data for dashboard stats
const dashboardStats = [
  {
    title: "Total Properties",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: <AccountBalanceIcon sx={{ fontSize: 28 }} />,
    color: "primary",
  },
  {
    title: "Pending Verifications",
    value: "23",
    change: "-8%",
    trend: "down",
    icon: <ScheduleIcon sx={{ fontSize: 28 }} />,
    color: "warning",
  },
  {
    title: "Completed Today",
    value: "15",
    change: "+25%",
    trend: "up",
    icon: <VerifiedIcon sx={{ fontSize: 28 }} />,
    color: "success",
  },
  {
    title: "Active Officers",
    value: "8",
    change: "0%",
    trend: "stable",
    icon: <PeopleIcon sx={{ fontSize: 28 }} />,
    color: "info",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "verification",
    title: "Property Verification Completed",
    description: "Sunset Villa - Downtown District",
    time: "5 minutes ago",
    status: "completed",
  },
  {
    id: 2,
    type: "registration",
    title: "New Property Registration",
    description: "Green Acres Farm - Rural Valley",
    time: "15 minutes ago",
    status: "pending",
  },
  {
    id: 3,
    type: "transfer",
    title: "Property Transfer Request",
    description: "City Center Apartment - Metropolitan Area",
    time: "1 hour ago",
    status: "processing",
  },
];

const StatCard = ({ stat, index }) => {
  const theme = useTheme();

  const getColorScheme = (color) => {
    switch (color) {
      case "primary":
        return {
          main: theme.palette.primary.main,
          light: alpha(theme.palette.primary.main, 0.15),
          dark: theme.palette.primary.dark,
        };
      case "warning":
        return {
          main: theme.palette.warning.main,
          light: alpha(theme.palette.warning.main, 0.15),
          dark: theme.palette.warning.dark,
        };
      case "success":
        return {
          main: theme.palette.success.main,
          light: alpha(theme.palette.success.main, 0.15),
          dark: theme.palette.success.dark,
        };
      case "info":
        return {
          main: theme.palette.info.main,
          light: alpha(theme.palette.info.main, 0.15),
          dark: theme.palette.info.dark,
        };
      case "secondary":
        return {
          main: theme.palette.secondary.main,
          light: alpha(theme.palette.secondary.main, 0.15),
          dark: theme.palette.secondary.dark,
        };
      default:
        return {
          main: theme.palette.primary.main,
          light: alpha(theme.palette.primary.main, 0.15),
          dark: theme.palette.primary.dark,
        };
    }
  };

  const colors = getColorScheme(stat.color);
  const isPositive = stat.trend === "up";
  const isNegative = stat.trend === "down";

  return (
    <Grow
      in={true}
      timeout={600}
      style={{
        transformOrigin: "0 0 0",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <ModernCard
        variant="glass"
        interactive
        sx={{
          height: "100%",
          position: "relative",
          overflow: "hidden",
          ...createHoverLift(-4),
        }}
      >
        <ModernCardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {stat.title}
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="text.primary">
                {stat.value}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                {isPositive ? (
                  <ArrowUpwardIcon
                    sx={{ fontSize: 16, color: theme.palette.success.main }}
                  />
                ) : isNegative ? (
                  <ArrowDownwardIcon
                    sx={{ fontSize: 16, color: theme.palette.error.main }}
                  />
                ) : null}
                <Typography
                  variant="caption"
                  sx={{
                    color: isPositive
                      ? theme.palette.success.main
                      : isNegative
                      ? theme.palette.error.main
                      : theme.palette.text.secondary,
                    fontWeight: 600,
                    ml: 0.5,
                  }}
                >
                  {stat.change} from last week
                </Typography>
              </Box>
            </Box>
                    <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: colors.light,
            color: colors.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${alpha(colors.main, 0.2)}`,
            boxShadow: `0 4px 12px ${alpha(colors.main, 0.15)}`,
          }}
        >
          {stat.icon}
        </Box>
          </Box>
        </ModernCardContent>
      </ModernCard>
    </Grow>
  );
};

const ActivityCard = ({ activity, index }) => {
  const theme = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return theme.palette.success.main;
      case "pending":
        return theme.palette.warning.main;
      case "processing":
        return theme.palette.info.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <Fade
      in={true}
      timeout={600}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderRadius: theme.shape.borderRadius,
          mb: 1,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
            transform: "translateX(4px)",
          },
        }}
      >
                 <Box
           sx={{
             width: 40,
             height: 40,
             borderRadius: '50%',
             backgroundColor: alpha(getStatusColor(activity.status), 0.15),
             color: getStatusColor(activity.status),
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             border: `2px solid ${alpha(getStatusColor(activity.status), 0.2)}`,
             boxShadow: `0 2px 8px ${alpha(getStatusColor(activity.status), 0.15)}`,
             mr: 2,
           }}
         >
           {activity.type === "verification" ? (
             <CheckCircleIcon sx={{ fontSize: 20 }} />
           ) : activity.type === "registration" ? (
             <AssignmentIcon sx={{ fontSize: 20 }} />
           ) : (
             <TrendingUpIcon sx={{ fontSize: 20 }} />
           )}
         </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {activity.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activity.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {activity.time}
          </Typography>
        </Box>
        <Chip
          label={activity.status}
          size="small"
          sx={{
            backgroundColor: alpha(getStatusColor(activity.status), 0.1),
            color: getStatusColor(activity.status),
            fontWeight: 600,
          }}
        />
      </Box>
    </Fade>
  );
};

export default function OfficerDashboard() {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <OfficerLayout>
      <Box>
        {/* Header Section */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  Officer Dashboard
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ opacity: 0.8 }}
                >
                  Monitor and manage property verifications
                </Typography>
              </Box>

              <ModernButton
                variant="gradient"
                startIcon={<NotificationsIcon />}
                onClick={() => router.push("/officer/verification-queue")}
                sx={{ height: "fit-content" }}
              >
                View Queue
              </ModernButton>
            </Box>
          </Box>
        </Fade>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {dashboardStats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={stat.title}>
              <StatCard stat={stat} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12} lg={4}>
            <ModernCard variant="glass" sx={{ height: "100%" }}>
              <ModernCardHeader>
                <Typography variant="h6" fontWeight={600}>
                  Quick Actions
                </Typography>
              </ModernCardHeader>
              <ModernCardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <ModernButton
                    variant="outlined"
                    fullWidth
                    startIcon={<CheckCircleIcon />}
                    onClick={() => router.push("/officer/verification-queue")}
                  >
                    Verify Properties
                  </ModernButton>
                  <ModernButton
                    variant="outlined"
                    fullWidth
                    startIcon={<AssignmentIcon />}
                    onClick={() => router.push("/officer/properties")}
                  >
                    Browse Properties
                  </ModernButton>
                  <ModernButton
                    variant="outlined"
                    fullWidth
                    startIcon={<TrendingUpIcon />}
                    onClick={() => router.push("/officer/reports")}
                  >
                    Generate Reports
                  </ModernButton>
                  <ModernButton
                    variant="outlined"
                    fullWidth
                    startIcon={<PeopleIcon />}
                    onClick={() => router.push("/officer/transactions")}
                  >
                    View Transactions
                  </ModernButton>
                </Box>
              </ModernCardContent>
            </ModernCard>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} lg={8}>
            <ModernCard variant="glass" sx={{ height: "100%" }}>
              <ModernCardHeader>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Recent Activity
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </ModernCardHeader>
              <ModernCardContent>
                <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                  {recentActivities.map((activity, index) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      index={index}
                    />
                  ))}
                </Box>
              </ModernCardContent>
            </ModernCard>
          </Grid>
        </Grid>

        {/* Performance Overview */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <ModernCard variant="glass">
              <ModernCardHeader>
                <Typography variant="h6" fontWeight={600}>
                  Weekly Performance
                </Typography>
              </ModernCardHeader>
              <ModernCardContent>
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Verifications Completed
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      85%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Response Time
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      92%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={92}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: theme.palette.success.main,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Quality Score
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      96%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={96}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: alpha(theme.palette.info.main, 0.1),
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: theme.palette.info.main,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              </ModernCardContent>
            </ModernCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <ModernCard variant="glass">
              <ModernCardHeader>
                <Typography variant="h6" fontWeight={600}>
                  System Status
                </Typography>
              </ModernCardHeader>
              <ModernCardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2">Database Connection</Typography>
                    <Chip
                      label="Healthy"
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main,
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2">API Response</Typography>
                    <Chip
                      label="Good"
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main,
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2">Storage Usage</Typography>
                    <Chip
                      label="78%"
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main,
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2">Active Users</Typography>
                    <Chip
                      label="24"
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.info.main, 0.1),
                        color: theme.palette.info.main,
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </Box>
              </ModernCardContent>
            </ModernCard>
          </Grid>
        </Grid>
      </Box>
    </OfficerLayout>
  );
}
