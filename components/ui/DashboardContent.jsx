'use client'

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Avatar,
  Divider,
  Alert,
  IconButton,
  Fab,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Home as PropertyIcon,
  AccountBalance as TransactionIcon,
  VerifiedUser as VerifiedIcon,
  Add as AddIcon,
  Notifications as NotificationIcon,
  ArrowForward as ArrowForwardIcon,
  Assessment as AssessmentIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const DashboardContent = () => {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProperties: 0,
    verifiedProperties: 0,
    pendingTransactions: 0,
    completedTransactions: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalProperties: 3,
        verifiedProperties: 2,
        pendingTransactions: 1,
        completedTransactions: 8,
      });

      setRecentActivity([
        {
          id: 1,
          type: 'Property Registration',
          title: 'Registered new property in Colombo',
          date: '2024-02-15',
          status: 'Completed',
        },
        {
          id: 2,
          type: 'Document Verification',
          title: 'Title deed verified for PROP001',
          date: '2024-02-14',
          status: 'Verified',
        },
        {
          id: 3,
          type: 'Property Transfer',
          title: 'Transfer initiated for PROP002',
          date: '2024-02-13',
          status: 'Pending',
        },
      ]);

      setNotifications([
        {
          id: 1,
          type: 'success',
          title: 'Property Verified',
          message: 'Your property PROP001 has been successfully verified.',
          date: '2024-02-15',
          read: false,
        },
        {
          id: 2,
          type: 'info',
          title: 'System Maintenance',
          message: 'Scheduled maintenance on Feb 20th, 2:00 AM - 4:00 AM.',
          date: '2024-02-14',
          read: false,
        },
        {
          id: 3,
          type: 'warning',
          title: 'Document Required',
          message: 'Additional document needed for PROP003 verification.',
          date: '2024-02-13',
          read: true,
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
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

  const getNotificationSeverity = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading dashboard...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Manage your properties, track transactions, and stay updated with the latest activity.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s ease' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalProperties}
                  </Typography>
                  <Typography variant="body2">
                    Total Properties
                  </Typography>
                </Box>
                <PropertyIcon sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s ease' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.verifiedProperties}
                  </Typography>
                  <Typography variant="body2">
                    Verified Properties
                  </Typography>
                </Box>
                <VerifiedIcon sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s ease' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.pendingTransactions}
                  </Typography>
                  <Typography variant="body2">
                    Pending Transactions
                  </Typography>
                </Box>
                <SpeedIcon sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s ease' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.completedTransactions}
                  </Typography>
                  <Typography variant="body2">
                    Completed Transactions
                  </Typography>
                </Box>
                <TransactionIcon sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => router.push('/register')}
              sx={{ py: 2 }}
            >
              Register Property
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PropertyIcon />}
              onClick={() => router.push('/properties')}
              sx={{ py: 2 }}
            >
              View Properties
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<TransactionIcon />}
              onClick={() => router.push('/transactions')}
              sx={{ py: 2 }}
            >
              View Transactions
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<VerifiedIcon />}
              onClick={() => router.push('/verify')}
              sx={{ py: 2 }}
            >
              Verify Property
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Recent Activity */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TimelineIcon />
                  Recent Activity
                </Typography>
                <Button 
                  size="small" 
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => router.push('/transactions')}
                >
                  View All
                </Button>
              </Box>

              <List>
                {recentActivity.map((activity, index) => (
                  <ListItem key={activity.id} divider={index < recentActivity.length - 1}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40 }}>
                        {activity.type === 'Property Registration' ? <PropertyIcon /> :
                         activity.type === 'Document Verification' ? <VerifiedIcon /> :
                         <TransactionIcon />}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {activity.type}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(activity.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip 
                      label={activity.status}
                      color={getStatusColor(activity.status)}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationIcon />
                  Notifications
                </Typography>
                <Typography variant="caption" color="primary">
                  {notifications.filter(n => !n.read).length} unread
                </Typography>
              </Box>

              <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                {notifications.map((notification, index) => (
                  <Alert 
                    key={notification.id}
                    severity={getNotificationSeverity(notification.type)}
                    sx={{ 
                      mb: 2, 
                      opacity: notification.read ? 0.7 : 1,
                      '& .MuiAlert-message': { fontSize: '0.875rem' }
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      {notification.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                      {new Date(notification.date).toLocaleDateString()}
                    </Typography>
                  </Alert>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Progress Card */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AssessmentIcon />
                Profile Completion
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Profile</Typography>
                  <Typography variant="body2" color="text.secondary">85%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4 }} />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Verification</Typography>
                  <Typography variant="body2" color="text.secondary">95%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={95} color="success" sx={{ height: 8, borderRadius: 4 }} />
              </Box>

              <Button 
                size="small" 
                variant="outlined" 
                fullWidth
                onClick={() => router.push('/profile')}
              >
                Complete Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* System Status */}
      <Alert severity="success" sx={{ mt: 4 }}>
        <Typography variant="subtitle2" gutterBottom>
          System Status: All Systems Operational
        </Typography>
        <Typography variant="body2">
          Blockchain network is healthy. Last block confirmed 2 minutes ago. All services are running smoothly.
        </Typography>
      </Alert>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="register property"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => router.push('/register')}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default DashboardContent;
