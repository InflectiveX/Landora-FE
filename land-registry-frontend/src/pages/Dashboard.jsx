import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Paper,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  AddBox as AddBoxIcon,
  Verified as VerifiedIcon,
  Pending as PendingIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Description as DescriptionIcon,
  LocationOn as LocationIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Mock data
  const stats = [
    { title: 'Total Properties', value: '3', icon: <AccountBalanceIcon />, color: 'primary' },
    { title: 'Verified Properties', value: '2', icon: <VerifiedIcon />, color: 'success' },
    { title: 'Pending Verification', value: '1', icon: <PendingIcon />, color: 'warning' },
    { title: 'Transfers Completed', value: '0', icon: <TrendingUpIcon />, color: 'info' },
  ];

  const recentProperties = [
    {
      id: 1,
      title: 'Residential Plot - Colombo 07',
      status: 'verified',
      registrationDate: '2024-08-10',
      area: '10 perches',
    },
    {
      id: 2,
      title: 'Commercial Building - Kandy',
      status: 'verified',
      registrationDate: '2024-08-05',
      area: '25 perches',
    },
    {
      id: 3,
      title: 'Agricultural Land - Galle',
      status: 'pending',
      registrationDate: '2024-08-15',
      area: '2 acres',
    },
  ];

  const quickActions = [
    {
      title: 'Register New Property',
      description: 'Submit documents and register a new property in the blockchain',
      icon: <AddBoxIcon />,
      action: () => navigate('/register'),
      color: 'primary',
    },
    {
      title: 'Verify Property',
      description: 'Search and verify any property registration publicly',
      icon: <SearchIcon />,
      action: () => navigate('/verify'),
      color: 'secondary',
    },
  ];

  const getStatusChip = (status) => {
    const statusConfig = {
      verified: { label: 'Verified', color: 'success' },
      pending: { label: 'Pending', color: 'warning' },
      rejected: { label: 'Rejected', color: 'error' },
    };
    return statusConfig[status] || { label: status, color: 'default' };
  };

  return (
    <Box>
      {/* Welcome Section */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user.name}!
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Manage your property registrations securely on the blockchain
        </Typography>
      </Paper>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${stat.color}.main`, mr: 2 }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: `${action.color}.main`, mr: 2 }}>
                        {action.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {action.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {action.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      color={action.color}
                      onClick={action.action}
                    >
                      Get Started
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Recent Properties */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Recent Properties
          </Typography>
          <Card>
            <CardContent>
              <List>
                {recentProperties.map((property, index) => (
                  <React.Fragment key={property.id}>
                    <ListItem
                      button
                      onClick={() => navigate(`/property/${property.id}`)}
                      sx={{ borderRadius: 1 }}
                    >
                      <ListItemIcon>
                        <LocationIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1">
                              {property.title}
                            </Typography>
                            <Chip
                              size="small"
                              label={getStatusChip(property.status).label}
                              color={getStatusChip(property.status).color}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" component="span">
                              Area: {property.area} • Registered: {property.registrationDate}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentProperties.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button color="primary" onClick={() => navigate('/properties')}>
                View All Properties
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Information Section */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'info.light', color: 'info.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <DescriptionIcon sx={{ mr: 1 }} />
              <Typography variant="subtitle2">1. Submit Documents</Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Upload title deeds, survey maps, and ownership records
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <VerifiedIcon sx={{ mr: 1 }} />
              <Typography variant="subtitle2">2. Government Verification</Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Officials verify documents against existing records
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccountBalanceIcon sx={{ mr: 1 }} />
              <Typography variant="subtitle2">3. Blockchain Registration</Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Receive tamper-proof NFT certificate of ownership
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dashboard;
