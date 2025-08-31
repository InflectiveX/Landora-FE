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
  Badge as BadgeIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Verified as VerifiedIcon,
  AdminPanelSettings as AdminIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";
import { useSnackbar } from "notistack";
import OfficerLayout from "@/components/layouts/OfficerLayout";

export default function OfficerProfile() {
  const { user, updateUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || "Officer John Smith",
    email: user?.email || "john.smith@landora.gov.lk",
    phone: "+94 77 123 4567",
    nicNumber: user?.nic || "912345678V",
    employeeId: user?.employeeId || "OFF001",
    department: user?.department || "Land Registry Department",
    position: user?.position || "Senior Land Officer",
    address: "123 Government Quarter, Colombo 07",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const recentActivities = [
    {
      id: 1,
      action: "Property Verified",
      property: "Land Plot #LP001",
      date: "2024-08-15",
      status: "Completed",
    },
    {
      id: 2,
      action: "Transfer Approved",
      property: "Land Plot #LP002",
      date: "2024-08-14",
      status: "Completed",
    },
    {
      id: 3,
      action: "Document Reviewed",
      property: "Land Plot #LP003",
      date: "2024-08-13",
      status: "Pending Review",
    },
    {
      id: 4,
      action: "Registration Processed",
      property: "Land Plot #LP004",
      date: "2024-08-12",
      status: "Completed",
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

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <OfficerLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 3, borderBottom: 1, borderColor: "divider" }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
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
              <Grid item xs>
                <Typography variant="h4" gutterBottom>
                  {userInfo.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {userInfo.email}
                </Typography>
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Verified Officer"
                    color="success"
                    size="small"
                  />
                  <Chip
                    icon={<AdminIcon />}
                    label={user?.role === "admin" ? "Admin" : "Officer"}
                    color="primary"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item>
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
              <Tab icon={<WorkIcon />} label="Official Info" />
              <Tab icon={<SecurityIcon />} label="Security" />
              <Tab icon={<HistoryIcon />} label="Activity" />
              <Tab icon={<SettingsIcon />} label="Settings" />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
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
                      <Grid item xs={12} sm={6}>
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
                      <Grid item xs={12} sm={6}>
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
                      <Grid item xs={12} sm={6}>
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
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          value={userInfo.address}
                          disabled={!editMode}
                          multiline
                          rows={2}
                          onChange={(e) =>
                            setUserInfo({ ...userInfo, address: e.target.value })
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
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Official Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Employee ID"
                          value={userInfo.employeeId}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Department"
                          value={userInfo.department}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Position"
                          value={userInfo.position}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Permissions & Access
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <VerifiedIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Property Verification" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <VerifiedIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Transfer Approval" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <VerifiedIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Document Review" />
                      </ListItem>
                      {user?.role === "admin" && (
                        <ListItem>
                          <ListItemIcon>
                            <AdminIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="User Management" />
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Two-Factor Authentication
                    </Typography>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable 2FA"
                    />
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Required for all officer accounts
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Official Activities
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
                  control={<Switch defaultChecked />}
                  label="System Alerts"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Mobile Push Notifications"
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
    </OfficerLayout>
  );
}
