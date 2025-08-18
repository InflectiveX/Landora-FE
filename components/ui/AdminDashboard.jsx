'use client'

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  VerifiedUser as VerifiedIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import VerificationQueue from './VerificationQueue';

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const OverviewTab = () => (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Total Properties
              </Typography>
              <Typography variant="h4" color="inherit">
                1,234
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Pending Verifications
              </Typography>
              <Typography variant="h4" color="inherit">
                23
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Active Users
              </Typography>
              <Typography variant="h4" color="inherit">
                567
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Blockchain Transactions
              </Typography>
              <Typography variant="h4" color="inherit">
                2,456
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          System Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Typography variant="body1">
                  Latest property registrations, verifications, and system updates.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Health
                </Typography>
                <Typography variant="body1">
                  All systems operational. Blockchain network is healthy.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper sx={{ width: '100%' }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange} 
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab 
            icon={<DashboardIcon />} 
            label="Overview" 
            sx={{ textTransform: 'none' }}
          />
          <Tab 
            icon={<VerifiedIcon />} 
            label="Verification Queue" 
            sx={{ textTransform: 'none' }}
          />
          <Tab 
            icon={<AssessmentIcon />} 
            label="Reports" 
            sx={{ textTransform: 'none' }}
          />
          <Tab 
            icon={<SettingsIcon />} 
            label="Settings" 
            sx={{ textTransform: 'none' }}
          />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {currentTab === 0 && <OverviewTab />}
          {currentTab === 1 && <VerificationQueue />}
          {currentTab === 2 && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Reports & Analytics
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Property registration reports, transaction analytics, and system metrics will be displayed here.
              </Typography>
            </Box>
          )}
          {currentTab === 3 && (
            <Box>
              <Typography variant="h4" gutterBottom>
                System Settings
              </Typography>
              <Typography variant="body1" color="text.secondary">
                System configuration, user management, and administrative settings.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
