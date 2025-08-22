"use client";
import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Person as PersonIcon,
  Security as SecurityIcon,
  Wallet as WalletIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  AccountBalanceWallet as MetaMaskIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";
import { useSnackbar } from "notistack";
import CitizenLayout from "@/components/layouts/CitizenLayout";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [walletConnected, setWalletConnected] = useState(true);
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: "+94 77 123 4567",
    nicNumber: user?.nic || "912345678V",
    address: "123 Main Street, Colombo 01",
    walletAddress: "0x742d35Cc6543C11532435FD5645454445354323d",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const recentActivities = [
    {
      id: 1,
      action: "Property Registered",
      property: "Land Plot #LP001",
      date: "2024-08-15",
      status: "Completed",
    },
    {
      id: 2,
      action: "Document Uploaded",
      property: "Land Plot #LP002",
      date: "2024-08-14",
      status: "Pending",
    },
    {
      id: 3,
      action: "Transfer Initiated",
      property: "Land Plot #LP001",
      date: "2024-08-13",
      status: "In Progress",
    },
  ];

  const handleSaveProfile = async () => {
    updateUser(userInfo);
    setEditMode(false);
    enqueueSnackbar("Profile updated successfully!", { variant: "success" });
  };

  const handleChangePassword = async () => {
    setChangePasswordDialog(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    enqueueSnackbar("Password changed successfully!", { variant: "success" });
  };

  const connectWallet = () => {
    setWalletConnected(true);
    enqueueSnackbar("Wallet connected successfully!", { variant: "success" });
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <CitizenLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 3, borderBottom: 1, borderColor: "divider" }}>
            <Grid container spacing={3} alignItems="center">
              <Grid>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "primary.main",
                    fontSize: "2rem",
                  }}
                >
                  {userInfo.name.charAt(0)}
                </Avatar>
              </Grid>
              <Grid xs>
                <Typography variant="h4" gutterBottom>
                  {userInfo.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {userInfo.email}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Verified Account"
                    color="success"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid>
                <Button
                  variant={editMode ? "outlined" : "contained"}
                  startIcon={editMode ? <CancelIcon /> : <EditIcon />}
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
              <Tab icon={<PersonIcon />} label="Personal Info" />
              <Tab icon={<SecurityIcon />} label="Security" />
              <Tab icon={<WalletIcon />} label="Wallet" />
              <Tab icon={<HistoryIcon />} label="Activity" />
              <Tab icon={<SettingsIcon />} label="Settings" />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={3}>
              <Grid xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={userInfo.name}
                          disabled={!editMode}
                          onChange={(e) =>
                            setUserInfo({ ...userInfo, name: e.target.value })
                          }
                        />
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="NIC Number"
                          value={userInfo.nicNumber}
                          disabled={!editMode}
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              nicNumber: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          value={userInfo.email}
                          disabled={!editMode}
                          onChange={(e) =>
                            setUserInfo({ ...userInfo, email: e.target.value })
                          }
                        />
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={userInfo.phone}
                          disabled={!editMode}
                          onChange={(e) =>
                            setUserInfo({ ...userInfo, phone: e.target.value })
                          }
                        />
                      </Grid>
                      <Grid xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          value={userInfo.address}
                          disabled={!editMode}
                          multiline
                          rows={3}
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              address: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    {editMode && (
                      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={handleSaveProfile}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Password Settings
                    </Typography>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => setChangePasswordDialog(true)}
                    >
                      Change Password
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Two-Factor Authentication
                    </Typography>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable 2FA"
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Blockchain Wallet
                </Typography>
                {walletConnected ? (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Wallet Connected Successfully
                  </Alert>
                ) : (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    No wallet connected
                  </Alert>
                )}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <MetaMaskIcon color="primary" />
                  <Typography variant="body1">
                    {walletConnected ? userInfo.walletAddress : "Not Connected"}
                  </Typography>
                </Box>
                {!walletConnected && (
                  <Button
                    variant="contained"
                    startIcon={<WalletIcon />}
                    onClick={connectWallet}
                  >
                    Connect MetaMask Wallet
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activities
                </Typography>
                <List>
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id}>
                      <ListItem>
                        <ListItemIcon>
                          <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.action}
                          secondary={`${activity.property} - ${activity.date}`}
                        />
                        <Chip
                          label={activity.status}
                          color={
                            activity.status === "Completed"
                              ? "success"
                              : "warning"
                          }
                          size="small"
                        />
                      </ListItem>
                      {index < recentActivities.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={activeTab} index={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notification Settings
                </Typography>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="SMS Notifications"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Push Notifications"
                />
              </CardContent>
            </Card>
          </TabPanel>
        </Paper>

        <Dialog
          open={changePasswordDialog}
          onClose={() => setChangePasswordDialog(false)}
        >
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setChangePasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangePassword} variant="contained">
              Change Password
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </CitizenLayout>
  );
}
