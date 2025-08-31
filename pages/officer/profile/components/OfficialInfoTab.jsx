import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
  Stack,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  Badge as BadgeIcon,
  VerifiedUser as VerifiedUserIcon,
  AdminPanelSettings as AdminIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";

export default function OfficialInfoTab({ userInfo, user }) {
  const permissions = [
    {
      name: "Property Verification",
      level: "Full Access",
      icon: <VerifiedUserIcon />,
    },
    {
      name: "Transfer Approval",
      level: "Full Access",
      icon: <AssignmentIcon />,
    },
    { name: "Document Review", level: "Full Access", icon: <SecurityIcon /> },
    { name: "Report Generation", level: "Read Only", icon: <WorkIcon /> },
  ];

  if (user?.role === "admin") {
    permissions.push({
      name: "User Management",
      level: "Full Access",
      icon: <AdminIcon />,
    });
  }

  const workloadStats = [
    { label: "Cases This Month", value: 24, total: 30, color: "primary" },
    { label: "Pending Reviews", value: 3, total: 10, color: "warning" },
    { label: "Completed Tasks", value: 89, total: 100, color: "success" },
  ];

  const InfoCard = ({ icon, title, children, color = "primary" }) => (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        height: "100%",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 3,
          borderColor: `${color}.main`,
        },
      }}
    >
      <CardContent sx={{ p: 3, height: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          {icon}
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Professional Official Status Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3" fontWeight={600} color="primary.main">
                {userInfo.employeeId}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Employee ID
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight={600} color="text.primary">
                {userInfo.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Position
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Chip
                label="Active"
                color="success"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Employment Status
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Department Information */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<BusinessIcon color="primary" />}
            title="Department Information"
          >
            <Stack spacing={3}>
              <Box>
                <TextField
                  fullWidth
                  label="Department"
                  value={userInfo.department}
                  disabled
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Position"
                  value={userInfo.position}
                  disabled
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Employee ID"
                  value={userInfo.employeeId}
                  disabled
                  variant="outlined"
                />
              </Box>
            </Stack>
          </InfoCard>
        </Grid>

        {/* Workload Statistics */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<ScheduleIcon color="secondary" />}
            title="Workload Overview"
            color="secondary"
          >
            <Stack spacing={3}>
              {workloadStats.map((stat, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {stat.value}/{stat.total}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(stat.value / stat.total) * 100}
                    color={stat.color}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Stack>
          </InfoCard>
        </Grid>

        {/* Permissions & Access */}
        <Grid item xs={12}>
          <InfoCard
            icon={<SecurityIcon color="success" />}
            title="Permissions & Access Rights"
            color="success"
          >
            <Grid container spacing={2}>
              {permissions.map((permission, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 2,
                      textAlign: "center",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        borderColor: "success.main",
                        bgcolor: "success.50",
                      },
                    }}
                  >
                    <Box sx={{ color: "success.main", mb: 1 }}>
                      {permission.icon}
                    </Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      gutterBottom
                    >
                      {permission.name}
                    </Typography>
                    <Chip
                      label={permission.level}
                      size="small"
                      color={
                        permission.level === "Full Access"
                          ? "success"
                          : "warning"
                      }
                      variant="outlined"
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </InfoCard>
        </Grid>

        {/* Role Information */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<BadgeIcon color="info" />}
            title="Role Information"
            color="info"
          >
            <List>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <WorkIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Current Role"
                  secondary={
                    user?.role === "admin" ? "Administrator" : "Officer"
                  }
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <SecurityIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Security Level"
                  secondary="Level 3 - High"
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <ScheduleIcon color="info" />
                </ListItemIcon>
                <ListItemText
                  primary="Working Hours"
                  secondary="Monday - Friday, 8:00 AM - 5:00 PM"
                />
              </ListItem>
            </List>
          </InfoCard>
        </Grid>

        {/* System Access */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<AdminIcon color="warning" />}
            title="System Access"
            color="warning"
          >
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">Last Login</Typography>
                <Typography variant="body2" fontWeight={600}>
                  Today, 9:15 AM
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">Session Duration</Typography>
                <Typography variant="body2" fontWeight={600}>
                  2h 45m
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">Access Level</Typography>
                <Chip label="Authorized" size="small" color="success" />
              </Box>
            </Stack>
          </InfoCard>
        </Grid>
      </Grid>
    </Box>
  );
}
