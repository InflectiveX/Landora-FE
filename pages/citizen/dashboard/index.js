import CitizenLayout from "@/components/layouts/CitizenLayout";
import {
  Typography,
  Box,
  Grid,
  useTheme,
  alpha,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Description as DescriptionIcon,
  Verified as VerifiedIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import ModernCard, {
  ModernCardContent,
  ModernCardHeader,
} from "@/components/ui/ModernCard";
import ModernButton from "@/components/ui/ModernButton";
import {
  ModernTableContainer,
  ModernTable,
  ModernTableHead,
  StatusChip,
  UserCell,
  ProgressCell,
} from "@/components/ui/ModernTable";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// Mock data for demonstration
const dashboardStats = [
  {
    title: "Total Properties",
    value: "12",
    subtitle: "+2 this month",
    icon: <AccountBalanceIcon />,
    color: "primary",
    trend: "+16.5%",
  },
  {
    title: "Verified Properties",
    value: "10",
    subtitle: "83% verified",
    icon: <VerifiedIcon />,
    color: "success",
    trend: "+8.2%",
  },
  {
    title: "Pending Verification",
    value: "2",
    subtitle: "Avg. 3-5 days",
    icon: <ScheduleIcon />,
    color: "warning",
    trend: "0%",
  },
  {
    title: "Total Value",
    value: "$2.4M",
    subtitle: "Portfolio value",
    icon: <TrendingUpIcon />,
    color: "secondary",
    trend: "+12.3%",
  },
];

const recentTransactions = [
  {
    id: "TXN-001",
    type: "Property Registration",
    property: "Sunset Villa, Downtown",
    status: "completed",
    date: "2024-01-15",
    amount: "$450,000",
  },
  {
    id: "TXN-002",
    type: "Ownership Transfer",
    property: "Green Acres Farm",
    status: "pending",
    date: "2024-01-20",
    amount: "$1,200,000",
  },
  {
    id: "TXN-003",
    type: "Property Verification",
    property: "City Center Apartment",
    status: "processing",
    date: "2024-01-22",
    amount: "$320,000",
  },
];

const StatCard = ({ stat }) => {
  const theme = useTheme();

  return (
    <ModernCard variant="glass" interactive>
      <ModernCardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              backgroundColor: "#f0f0f0",

              width: 56,
              height: 56,
              mr: 2,
            }}
          >
            {stat.icon}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.subtitle}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="caption"
              sx={{
                color: stat.trend.startsWith("+")
                  ? "success.main"
                  : "error.main",
                fontWeight: 600,
                backgroundColor: alpha(
                  stat.trend.startsWith("+")
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                  0.1
                ),
                px: 1,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              {stat.trend}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h6"
          fontWeight={600}
          color="text.primary"
          gutterBottom
        >
          {stat.title}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={
            stat.color === "success" ? 83 : stat.color === "warning" ? 25 : 75
          }
          sx={{
            height: 4,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette[stat.color].main, 0.1),
            "& .MuiLinearProgress-bar": {
              backgroundColor: theme.palette[stat.color].main,
              borderRadius: 2,
            },
          }}
        />
      </ModernCardContent>
    </ModernCard>
  );
};

export default function CitizenDashboard() {
  const theme = useTheme();

  return (
    <CitizenLayout>
      <Box>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight="bold" sx={{}}>
            Welcome back!{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {dashboardStats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <StatCard stat={stat} />
            </Grid>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Recent Transactions */}
          <Grid item xs={12} lg={8}>
            <ModernCard variant="glass">
              <ModernCardHeader>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        backgroundColor: alpha(theme.palette.info.main, 0.1),
                        width: 40,
                        height: 40,
                      }}
                    >
                      <AssessmentIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Recent Transactions
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Latest activity on your properties
                      </Typography>
                    </Box>
                  </Box>
                  <ModernButton variant="outlined" size="small">
                    View All
                  </ModernButton>
                </Box>
              </ModernCardHeader>

              <ModernTableContainer>
                <ModernTable>
                  <ModernTableHead>
                    <TableRow>
                      <TableCell>Transaction</TableCell>
                      <TableCell>Property</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </ModernTableHead>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {transaction.type}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {transaction.id}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {transaction.property}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <StatusChip
                            status={
                              transaction.status === "completed"
                                ? "active"
                                : transaction.status === "pending"
                                ? "pending"
                                : "processing"
                            }
                            label={transaction.status}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(transaction.date).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {transaction.amount}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </ModernTable>
              </ModernTableContainer>
            </ModernCard>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} lg={4}>
            <ModernCard variant="gradient" sx={{ mb: 3 }}>
              <ModernCardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Quick Actions
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Manage your properties efficiently
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <ModernButton
                    variant="glass"
                    fullWidth
                    startIcon={<AccountBalanceIcon />}
                  >
                    Register New Property
                  </ModernButton>
                  <ModernButton
                    variant="glass"
                    fullWidth
                    startIcon={<DescriptionIcon />}
                  >
                    View All Properties
                  </ModernButton>
                  <ModernButton
                    variant="glass"
                    fullWidth
                    startIcon={<VerifiedIcon />}
                  >
                    Verification Status
                  </ModernButton>
                </Box>
              </ModernCardContent>
            </ModernCard>

            {/* Property Status Overview */}
            <ModernCard variant="elevated">
              <ModernCardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Property Status
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CheckCircleIcon sx={{ color: "success.main", mr: 1.5 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        Verified Properties
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        10 properties
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      color="success.main"
                      fontWeight="bold"
                    >
                      83%
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <ScheduleIcon sx={{ color: "warning.main", mr: 1.5 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        Pending Verification
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        2 properties
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      color="warning.main"
                      fontWeight="bold"
                    >
                      17%
                    </Typography>
                  </Box>

                  <ProgressCell
                    value={83}
                    label="Overall completion"
                    color="success"
                  />
                </Box>
              </ModernCardContent>
            </ModernCard>
          </Grid>
        </Grid>
      </Box>
    </CitizenLayout>
  );
}
