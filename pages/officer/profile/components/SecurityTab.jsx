import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import {
  Security as SecurityIcon,
  Lock as LockIcon,
  Shield as ShieldIcon,
  Fingerprint as FingerprintIcon,
  Key as KeyIcon,
  Verified as VerifiedIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

export default function SecurityTab() {
  const { enqueueSnackbar } = useSnackbar();
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: true,
    deviceTracking: true,
  });

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      enqueueSnackbar("Passwords do not match!", { variant: "error" });
      return;
    }

    setChangePasswordDialog(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    enqueueSnackbar("Password changed successfully!", { variant: "success" });
  };

  const securityItems = [
    {
      title: "Password Strength",
      status: "Strong",
      color: "success",
      icon: <LockIcon />,
      description: "Last changed 30 days ago",
    },
    {
      title: "Two-Factor Authentication",
      status: "Enabled",
      color: "success",
      icon: <ShieldIcon />,
      description: "SMS + Authenticator App",
    },
    {
      title: "Login Sessions",
      status: "2 Active",
      color: "info",
      icon: <FingerprintIcon />,
      description: "Desktop + Mobile",
    },
    {
      title: "Security Alerts",
      status: "Enabled",
      color: "success",
      icon: <WarningIcon />,
      description: "Email notifications active",
    },
  ];

  const recentActivity = [
    {
      action: "Password Changed",
      date: "2024-08-01",
      location: "Colombo, Sri Lanka",
      status: "success",
    },
    {
      action: "New Device Login",
      date: "2024-07-28",
      location: "Kandy, Sri Lanka",
      status: "warning",
    },
    {
      action: "2FA Enabled",
      date: "2024-07-25",
      location: "Colombo, Sri Lanka",
      status: "success",
    },
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
      {/* Professional Security Overview */}
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
            <SecurityIcon sx={{ fontSize: 48, color: "primary.main" }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h5" fontWeight={600} color="text.primary" gutterBottom>
              Security Center
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your account security settings and monitor recent activity
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              label="Secure Account"
              color="success"
              sx={{
                fontWeight: 600,
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Security Status */}
        <Grid item xs={12} md={8}>
          <InfoCard
            icon={<ShieldIcon color="primary" />}
            title="Security Status"
          >
            <Grid container spacing={2}>
              {securityItems.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ color: `${item.color}.main` }}>{item.icon}</Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.color}
                      variant="outlined"
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </InfoCard>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <InfoCard
            icon={<KeyIcon color="secondary" />}
            title="Quick Actions"
            color="secondary"
          >
            <Stack spacing={2}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<LockIcon />}
                onClick={() => setChangePasswordDialog(true)}
              >
                Change Password
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<ShieldIcon />}
                disabled
              >
                Setup 2FA
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FingerprintIcon />}
              >
                View Sessions
              </Button>
            </Stack>
          </InfoCard>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<SecurityIcon color="info" />}
            title="Security Settings"
            color="info"
          >
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.twoFactor}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        twoFactor: e.target.checked,
                      })
                    }
                  />
                }
                label="Two-Factor Authentication"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.loginAlerts}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        loginAlerts: e.target.checked,
                      })
                    }
                  />
                }
                label="Login Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: e.target.checked,
                      })
                    }
                  />
                }
                label="Auto Session Timeout"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.deviceTracking}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        deviceTracking: e.target.checked,
                      })
                    }
                  />
                }
                label="Device Tracking"
              />
            </Stack>
          </InfoCard>
        </Grid>

        {/* Recent Security Activity */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<WarningIcon color="warning" />}
            title="Recent Activity"
            color="warning"
          >
            <List sx={{ p: 0 }}>
              {recentActivity.map((activity, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {activity.status === "success" ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <WarningIcon color="warning" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={`${activity.date} • ${activity.location}`}
                  />
                </ListItem>
              ))}
            </List>
          </InfoCard>
        </Grid>

        {/* Password Requirements */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Password Security Requirements
            </Typography>
            <Typography variant="body2">
              • Minimum 8 characters with uppercase, lowercase, numbers, and
              special characters
              <br />
              • Must be changed every 90 days for officers
              <br />
              • Cannot reuse last 5 passwords
              <br />• Two-factor authentication is mandatory for all officer
              accounts
            </Typography>
          </Alert>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordDialog}
        onClose={() => setChangePasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LockIcon color="primary" />
            Change Password
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={showPasswords.current ? "text" : "password"}
                label="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          current: !showPasswords.current,
                        })
                      }
                    >
                      {showPasswords.current ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={showPasswords.new ? "text" : "password"}
                label="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          new: !showPasswords.new,
                        })
                      }
                    >
                      {showPasswords.new ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={showPasswords.confirm ? "text" : "password"}
                label="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          confirm: !showPasswords.confirm,
                        })
                      }
                    >
                      {showPasswords.confirm ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setChangePasswordDialog(false)}>Cancel</Button>
          <Button onClick={handleChangePassword} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
