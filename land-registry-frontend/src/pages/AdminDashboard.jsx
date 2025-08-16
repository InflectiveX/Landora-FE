import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Button,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Verified as VerifiedIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Analytics as AnalyticsIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  // Mock statistics data
  const stats = [
    {
      title: 'Total Registrations',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: <AnalyticsIcon />,
      color: 'primary',
    },
    {
      title: 'Verified Properties',
      value: '1,089',
      change: '+8%',
      changeType: 'increase',
      icon: <VerifiedIcon />,
      color: 'success',
    },
    {
      title: 'Pending Verification',
      value: '158',
      change: '+15%',
      changeType: 'increase',
      icon: <PendingIcon />,
      color: 'warning',
    },
    {
      title: 'Rejected Applications',
      value: '23',
      change: '-5%',
      changeType: 'decrease',
      icon: <CancelIcon />,
      color: 'error',
    },
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'Property Verified',
      property: 'COL-2024-001',
      officer: 'Sarah Johnson',
      timestamp: '2 hours ago',
      type: 'verification',
    },
    {
      id: 2,
      action: 'Registration Submitted',
      property: 'KAN-2024-045',
      officer: 'System',
      timestamp: '3 hours ago',
      type: 'submission',
    },
    {
      id: 3,
      action: 'Property Transferred',
      property: 'GAL-2024-022',
      officer: 'Michael Brown',
      timestamp: '5 hours ago',
      type: 'transfer',
    },
    {
      id: 4,
      action: 'Application Rejected',
      property: 'MAT-2024-015',
      officer: 'Emily Davis',
      timestamp: '1 day ago',
      type: 'rejection',
    },
  ];

  // Mock system metrics
  const systemMetrics = [
    { metric: 'Average Verification Time', value: '2.3 days', status: 'good' },
    { metric: 'System Uptime', value: '99.9%', status: 'excellent' },
    { metric: 'Blockchain Sync Status', value: 'Synchronized', status: 'good' },
    { metric: 'IPFS Storage Usage', value: '78.5 GB', status: 'normal' },
  ];

  // Mock verification officers
  const officers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      department: 'Land Registry - Colombo',
      verificationsToday: 8,
      totalVerifications: 234,
      status: 'active',
    },
    {
      id: 2,
      name: 'Michael Brown',
      department: 'Land Registry - Kandy',
      verificationsToday: 5,
      totalVerifications: 189,
      status: 'active',
    },
    {
      id: 3,
      name: 'Emily Davis',
      department: 'Land Registry - Galle',
      verificationsToday: 3,
      totalVerifications: 156,
      status: 'offline',
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'verification': return <VerifiedIcon color="success" />;
      case 'submission': return <PendingIcon color="warning" />;
      case 'transfer': return <TrendingUpIcon color="primary" />;
      case 'rejection': return <CancelIcon color="error" />;
      default: return <ScheduleIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'info';
      case 'normal': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          Administrative Dashboard
        </Typography>
        <Box>
          <IconButton color="primary">
            <RefreshIcon />
          </IconButton>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ ml: 1 }}>
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color={stat.changeType === 'increase' ? 'success.main' : 'error.main'}
                      sx={{ mt: 0.5 }}
                    >
                      {stat.change} from last month
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: `${stat.color}.main`, width: 56, height: 56 }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'background.paper' }}>
                        {getActivityIcon(activity.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1">{activity.action}</Typography>
                          <Chip label={activity.property} size="small" />
                        </Box>
                      }
                      secondary={`By ${activity.officer} • ${activity.timestamp}`}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* System Status */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
              System Status
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List dense>
              {systemMetrics.map((metric, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={metric.metric}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Typography variant="body2">{metric.value}</Typography>
                        <Chip 
                          label={metric.status} 
                          size="small" 
                          color={getStatusColor(metric.status)}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Verification Officers */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
              Verification Officers
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Officer</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell align="center">Today's Verifications</TableCell>
                    <TableCell align="center">Total Verifications</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {officers.map((officer) => (
                    <TableRow key={officer.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                            {officer.name.charAt(0)}
                          </Avatar>
                          <Typography variant="body2">{officer.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{officer.department}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6" color="primary.main">
                          {officer.verificationsToday}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {officer.totalVerifications}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={officer.status}
                          color={officer.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<VerifiedIcon />}
                  sx={{ mb: 1 }}
                >
                  View Verification Queue
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AnalyticsIcon />}
                  sx={{ mb: 1 }}
                >
                  Generate Analytics Report
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PeopleIcon />}
                  sx={{ mb: 1 }}
                >
                  Manage Officers
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<SecurityIcon />}
                >
                  System Configuration
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Performance Metrics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Metrics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      87%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Approval Rate
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main">
                      2.1
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg. Days to Verify
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="info.main">
                      156
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This Month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">
                      13%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rejection Rate
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;