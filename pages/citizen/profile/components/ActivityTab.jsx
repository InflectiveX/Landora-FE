import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Grid,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";
import {
  History as HistoryIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Assignment as AssignmentIcon,
  VerifiedUser as VerifiedIcon,
  Description as DocumentIcon,
  TransferWithinAStation as TransferIcon,
  EventNote as EventIcon,
  Home as PropertyIcon,
} from "@mui/icons-material";

export default function ActivityTab() {
  const recentActivities = [
    {
      id: 1,
      action: "Property Registered",
      property: "Land Plot #LP001",
      date: "2024-08-15",
      time: "2:30 PM",
      status: "Completed",
      type: "registration",
      description:
        "Successfully registered new property with blockchain verification",
    },
    {
      id: 2,
      action: "Document Uploaded",
      property: "Land Plot #LP002",
      date: "2024-08-14",
      time: "10:15 AM",
      status: "Pending",
      type: "document",
      description: "Ownership documents uploaded for officer review",
    },
    {
      id: 3,
      action: "Transfer Initiated",
      property: "Land Plot #LP001",
      date: "2024-08-13",
      time: "4:45 PM",
      status: "In Progress",
      type: "transfer",
      description: "Property transfer process started with buyer verification",
    },
    {
      id: 4,
      action: "Verification Request",
      property: "Land Plot #LP003",
      date: "2024-08-12",
      time: "11:20 AM",
      status: "Completed",
      type: "verification",
      description: "Property verification completed by authorized officer",
    },
    {
      id: 5,
      action: "Profile Updated",
      property: "Account Settings",
      date: "2024-08-11",
      time: "9:00 AM",
      status: "Completed",
      type: "profile",
      description: "Personal information and contact details updated",
    },
  ];

  const activityStats = [
    { label: "Total Properties", value: 3, color: "primary" },
    { label: "Active Transfers", value: 1, color: "warning" },
    { label: "Completed Actions", value: 12, color: "success" },
    { label: "Pending Reviews", value: 2, color: "info" },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "registration":
        return <PropertyIcon />;
      case "verification":
        return <VerifiedIcon />;
      case "transfer":
        return <TransferIcon />;
      case "document":
        return <DocumentIcon />;
      case "profile":
        return <EventIcon />;
      default:
        return <HistoryIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "in progress":
        return "info";
      default:
        return "default";
    }
  };

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
      <CardContent sx={{ p: 3 }}>
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
      {/* Professional Activity Overview */}
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
        <Grid container spacing={3}>
          <Grid item>
            <HistoryIcon sx={{ fontSize: 48, color: "primary.main" }} />
          </Grid>
          <Grid item xs>
            <Typography
              variant="h5"
              fontWeight={600}
              color="text.primary"
              gutterBottom
            >
              Activity Overview
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track your property transactions and account activities
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Activity Statistics */}
        <Grid item xs={12} md={4}>
          <InfoCard
            icon={<AssignmentIcon color="primary" />}
            title="Activity Statistics"
          >
            <Stack spacing={3}>
              {activityStats.map((stat, index) => (
                <Box key={index} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color={`${stat.color}.main`}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </InfoCard>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={8}>
          <InfoCard
            icon={<HistoryIcon color="secondary" />}
            title="Recent Activities"
            color="secondary"
          >
            <Stack spacing={2}>
              {recentActivities.map((activity, index) => (
                <Paper
                  key={activity.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: "primary.main",
                      bgcolor: "grey.50",
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                    },
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: `${getStatusColor(activity.status)}.main`,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" fontWeight={600}>
                          {activity.action}
                        </Typography>
                        <Chip
                          label={activity.status}
                          color={getStatusColor(activity.status)}
                          size="small"
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        color="primary.main"
                        gutterBottom
                      >
                        {activity.property}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {activity.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.date} at {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </InfoCard>
        </Grid>

        {/* Quick Summary */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<CheckCircleIcon color="success" />}
            title="This Month's Summary"
            color="success"
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color="success.main"
                  >
                    5
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Actions Completed
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h3" fontWeight={700} color="info.main">
                    2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Progress
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color="primary.main"
                  >
                    3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Properties Owned
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color="warning.main"
                  >
                    1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Review
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </InfoCard>
        </Grid>

        {/* Quick Actions Summary */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<InfoIcon color="info" />}
            title="Recent Actions"
            color="info"
          >
            <List sx={{ p: 0 }}>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <PropertyIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Property Registrations"
                  secondary="1 completed this month"
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <TransferIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Property Transfers"
                  secondary="1 in progress"
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <DocumentIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Document Uploads"
                  secondary="3 completed"
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <VerifiedIcon color="info" />
                </ListItemIcon>
                <ListItemText
                  primary="Verifications"
                  secondary="2 verified successfully"
                />
              </ListItem>
            </List>
          </InfoCard>
        </Grid>
      </Grid>
    </Box>
  );
}
