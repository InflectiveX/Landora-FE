'use client'

import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';

const AdminDashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Total Properties
              </Typography>
              <Typography variant="h4" color="primary">
                1,234
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Pending Verifications
              </Typography>
              <Typography variant="h4" color="warning.main">
                23
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Active Users
              </Typography>
              <Typography variant="h4" color="success.main">
                567
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Recent Activities
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1">
              Recent property registrations and verifications will be displayed here.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
