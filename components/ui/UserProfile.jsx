'use client'

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Tab,
  Tabs,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  History as HistoryIcon,
  Home as PropertyIcon,
  AccountBalance as WalletIcon,
  Settings as SettingsIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const UserProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [userProfile, setUserProfile] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+94 77 123 4567',
    nic: '199012345678V',
    address: '123 Main Street, Colombo 07',
    city: 'Colombo',
    district: 'Colombo',
    province: 'Western Province',
    joinDate: '2024-01-15',
    role: 'citizen',
    verified: true,
    profilePicture: null,
  });

  const [editedProfile, setEditedProfile] = useState({...userProfile});

  const [userSettings, setUserSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    transactionAlerts: true,
    verificationAlerts: true,
    twoFactorAuth: false,
    publicProfile: false,
  });

  const [userStats, setUserStats] = useState({
    propertiesOwned: 3,
    transactionsCompleted: 12,
    documentsUploaded: 15,
    verificationScore: 95,
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'Property Registration',
      description: 'Registered property in Colombo',
      date: '2024-02-15',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Document Upload',
      description: 'Uploaded title deed for PROP001',
      date: '2024-02-10',
      status: 'Verified'
    },
    {
      id: 3,
      type: 'Property Transfer',
      description: 'Transferred property PROP002',
      date: '2024-02-05',
      status: 'Pending'
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSettingChange = (setting, value) => {
    setUserSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUserProfile(editedProfile);
      setEditDialogOpen(false);
      enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to update profile. Please try again.', { variant: 'error' });
    }
    setSaving(false);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      enqueueSnackbar('Settings saved successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to save settings. Please try again.', { variant: 'error' });
    }
    setSaving(false);
  };

  const getActivityStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Verified':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const ProfileOverview = () => (
    <Grid container spacing={4}>
      {/* Profile Card */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '2rem'
              }}
            >
              {userProfile.name.charAt(0)}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {userProfile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}
            </Typography>
            {userProfile.verified && (
              <Chip label="Verified User" color="success" size="small" sx={{ mb: 2 }} />
            )}
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => {
                setEditedProfile({...userProfile});
                setEditDialogOpen(true);
              }}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {userStats.propertiesOwned}
                  </Typography>
                  <Typography variant="caption">
                    Properties
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {userStats.transactionsCompleted}
                  </Typography>
                  <Typography variant="caption">
                    Transactions
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">
                    {userStats.documentsUploaded}
                  </Typography>
                  <Typography variant="caption">
                    Documents
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">
                    {userStats.verificationScore}%
                  </Typography>
                  <Typography variant="caption">
                    Verification
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Profile Information */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Full Name" secondary={userProfile.name} />
              </ListItem>
              <ListItem>
                <ListItemIcon><EmailIcon /></ListItemIcon>
                <ListItemText primary="Email Address" secondary={userProfile.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon><PhoneIcon /></ListItemIcon>
                <ListItemText primary="Phone Number" secondary={userProfile.phone} />
              </ListItem>
              <ListItem>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="NIC Number" secondary={userProfile.nic} />
              </ListItem>
              <ListItem>
                <ListItemIcon><LocationIcon /></ListItemIcon>
                <ListItemText 
                  primary="Address" 
                  secondary={`${userProfile.address}, ${userProfile.city}, ${userProfile.province}`}
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><SecurityIcon /></ListItemIcon>
                <ListItemText 
                  primary="Member Since" 
                  secondary={new Date(userProfile.joinDate).toLocaleDateString()}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><SecurityIcon /></ListItemIcon>
                <ListItemText primary="Account Status" secondary="Active & Verified" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const ActivityHistory = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <List>
          {recentActivity.map((activity, index) => (
            <ListItem key={activity.id} divider={index < recentActivity.length - 1}>
              <ListItemIcon><HistoryIcon /></ListItemIcon>
              <ListItemText
                primary={activity.type}
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {activity.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(activity.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                }
              />
              <Chip 
                label={activity.status}
                color={getActivityStatusColor(activity.status)}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const SettingsPanel = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Account Settings
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Notification Preferences
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><EmailIcon /></ListItemIcon>
              <ListItemText primary="Email Notifications" secondary="Receive updates via email" />
              <FormControlLabel
                control={
                  <Switch
                    checked={userSettings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                }
                label=""
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><PhoneIcon /></ListItemIcon>
              <ListItemText primary="SMS Notifications" secondary="Receive updates via SMS" />
              <FormControlLabel
                control={
                  <Switch
                    checked={userSettings.smsNotifications}
                    onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                  />
                }
                label=""
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="Transaction Alerts" secondary="Get notified of all transactions" />
              <FormControlLabel
                control={
                  <Switch
                    checked={userSettings.transactionAlerts}
                    onChange={(e) => handleSettingChange('transactionAlerts', e.target.checked)}
                  />
                }
                label=""
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Security Settings
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><SecurityIcon /></ListItemIcon>
              <ListItemText 
                primary="Two-Factor Authentication" 
                secondary="Add an extra layer of security to your account" 
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={userSettings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  />
                }
                label=""
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText 
                primary="Public Profile" 
                secondary="Allow others to view your basic profile information" 
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={userSettings.publicProfile}
                    onChange={(e) => handleSettingChange('publicProfile', e.target.checked)}
                  />
                }
                label=""
              />
            </ListItem>
          </List>
        </Box>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your personal information and account settings
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Overview" icon={<PersonIcon />} />
          <Tab label="Activity" icon={<HistoryIcon />} />
          <Tab label="Settings" icon={<SettingsIcon />} />
        </Tabs>
      </Box>

      {activeTab === 0 && <ProfileOverview />}
      {activeTab === 1 && <ActivityHistory />}
      {activeTab === 2 && <SettingsPanel />}

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EditIcon />
            Edit Profile
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={editedProfile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={editedProfile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={editedProfile.address}
                onChange={(e) => handleProfileChange('address', e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={editedProfile.city}
                onChange={(e) => handleProfileChange('city', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Province"
                value={editedProfile.province}
                onChange={(e) => handleProfileChange('province', e.target.value)}
              />
            </Grid>
          </Grid>
          
          <Alert severity="info" sx={{ mt: 3 }}>
            Email address and NIC number cannot be changed. Please contact support if you need to update these fields.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setEditDialogOpen(false)}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveProfile}
            disabled={saving}
            startIcon={saving ? null : <SaveIcon />}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfile;
