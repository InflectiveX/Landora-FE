import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  Sms as SmsIcon,
  PhoneAndroid as PhoneIcon,
  Schedule as ScheduleIcon,
  Brightness4 as DarkModeIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

export default function SettingsTab() {
  const { enqueueSnackbar } = useSnackbar();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: true,
      push: false,
      systemAlerts: true,
      caseUpdates: true,
      deadlineReminders: true,
    },
    preferences: {
      language: "en",
      timezone: "Asia/Colombo",
      theme: "light",
      dateFormat: "dd/mm/yyyy",
      autoSave: true,
      compactView: false,
    },
    privacy: {
      profileVisibility: "department",
      activityTracking: true,
      dataSharing: false,
      analyticsOptIn: true,
    },
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
    enqueueSnackbar("Settings updated successfully!", { variant: "success" });
  };

  const exportData = () => {
    enqueueSnackbar(
      "Data export initiated! You'll receive an email when ready.",
      { variant: "info" }
    );
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
      {/* Professional Settings Overview */}
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
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SettingsIcon sx={{ fontSize: 48, color: "primary.main" }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Account Settings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Customize your experience and manage your preferences
            </Typography>
          </Grid>
          <Grid item>
            <Chip label="All Saved" color="success" sx={{ fontWeight: 600 }} />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<NotificationsIcon color="primary" />}
            title="Notification Preferences"
          >
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.email}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "email",
                        e.target.checked
                      )
                    }
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon fontSize="small" />
                    Email Notifications
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.sms}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "sms",
                        e.target.checked
                      )
                    }
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SmsIcon fontSize="small" />
                    SMS Notifications
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.push}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "push",
                        e.target.checked
                      )
                    }
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PhoneIcon fontSize="small" />
                    Push Notifications
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.systemAlerts}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "systemAlerts",
                        e.target.checked
                      )
                    }
                  />
                }
                label="System Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.caseUpdates}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "caseUpdates",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Case Updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.deadlineReminders}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "deadlineReminders",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Deadline Reminders"
              />
            </Stack>
          </InfoCard>
        </Grid>

        {/* Display Preferences */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<PaletteIcon color="secondary" />}
            title="Display Preferences"
            color="secondary"
          >
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={settings.preferences.language}
                  label="Language"
                  onChange={(e) =>
                    handleSettingChange(
                      "preferences",
                      "language",
                      e.target.value
                    )
                  }
                  startAdornment={<LanguageIcon sx={{ mr: 1 }} />}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="si">Sinhala</MenuItem>
                  <MenuItem value="ta">Tamil</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={settings.preferences.timezone}
                  label="Timezone"
                  onChange={(e) =>
                    handleSettingChange(
                      "preferences",
                      "timezone",
                      e.target.value
                    )
                  }
                  startAdornment={<TimeIcon sx={{ mr: 1 }} />}
                >
                  <MenuItem value="Asia/Colombo">
                    Asia/Colombo (GMT+5:30)
                  </MenuItem>
                  <MenuItem value="UTC">UTC (GMT+0:00)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Date Format</InputLabel>
                <Select
                  value={settings.preferences.dateFormat}
                  label="Date Format"
                  onChange={(e) =>
                    handleSettingChange(
                      "preferences",
                      "dateFormat",
                      e.target.value
                    )
                  }
                  startAdornment={<ScheduleIcon sx={{ mr: 1 }} />}
                >
                  <MenuItem value="dd/mm/yyyy">DD/MM/YYYY</MenuItem>
                  <MenuItem value="mm/dd/yyyy">MM/DD/YYYY</MenuItem>
                  <MenuItem value="yyyy-mm-dd">YYYY-MM-DD</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.preferences.autoSave}
                    onChange={(e) =>
                      handleSettingChange(
                        "preferences",
                        "autoSave",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Auto-save drafts"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.preferences.compactView}
                    onChange={(e) =>
                      handleSettingChange(
                        "preferences",
                        "compactView",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Compact view"
              />
            </Stack>
          </InfoCard>
        </Grid>

        {/* Privacy Settings */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<SecurityIcon color="warning" />}
            title="Privacy Settings"
            color="warning"
          >
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Profile Visibility</InputLabel>
                <Select
                  value={settings.privacy.profileVisibility}
                  label="Profile Visibility"
                  onChange={(e) =>
                    handleSettingChange(
                      "privacy",
                      "profileVisibility",
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="department">Department Only</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.privacy.activityTracking}
                    onChange={(e) =>
                      handleSettingChange(
                        "privacy",
                        "activityTracking",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Activity Tracking"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.privacy.dataSharing}
                    onChange={(e) =>
                      handleSettingChange(
                        "privacy",
                        "dataSharing",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Data Sharing for Analytics"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.privacy.analyticsOptIn}
                    onChange={(e) =>
                      handleSettingChange(
                        "privacy",
                        "analyticsOptIn",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Performance Analytics"
              />
            </Stack>
          </InfoCard>
        </Grid>

        {/* Data Management */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<DownloadIcon color="info" />}
            title="Data Management"
            color="info"
          >
            <Stack spacing={3}>
              <Typography variant="body2" color="text.secondary">
                Manage your personal data and account information
              </Typography>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<DownloadIcon />}
                onClick={exportData}
              >
                Export My Data
              </Button>

              <Typography variant="caption" color="text.secondary">
                Download a copy of your profile data, activity history, and
                settings. The export will be sent to your registered email
                address within 24 hours.
              </Typography>

              <Divider />

              <Typography variant="body2" color="text.secondary">
                <strong>Data Retention:</strong> Your activity data is retained
                for 7 years as per government records management policy.
              </Typography>
            </Stack>
          </InfoCard>
        </Grid>

        {/* System Information */}
        <Grid item xs={12}>
          <InfoCard
            icon={<SettingsIcon color="primary" />}
            title="System Information"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight={600}
                  >
                    v2.1.0
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Application Version
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    color="success.main"
                    fontWeight={600}
                  >
                    Online
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    System Status
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6" color="info.main" fontWeight={600}>
                    99.9%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Uptime
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    color="warning.main"
                    fontWeight={600}
                  >
                    2024-08-31
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last Update
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </InfoCard>
        </Grid>
      </Grid>
    </Box>
  );
}
