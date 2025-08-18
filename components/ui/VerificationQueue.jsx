'use client'

import React, { useState } from 'react';
import pendingRegistrations from '../../data/pendingRegistrations.json';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  TextField,
  Alert,
  Tabs,
  Tab,
  Box as MuiBox,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const VerificationQueue = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const { enqueueSnackbar } = useSnackbar();

  // ...existing code...

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'under_review': return 'info';
      case 'verified': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'normal': return 'default';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setDialogOpen(true);
  };

  const handleApprove = async (propertyId) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      enqueueSnackbar('Property registration approved successfully!', { variant: 'success' });
      setDialogOpen(false);
    } catch (error) {
      enqueueSnackbar('Failed to approve registration', { variant: 'error' });
    }
  };

  const handleReject = async (propertyId) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      enqueueSnackbar('Property registration rejected', { variant: 'warning' });
      setDialogOpen(false);
    } catch (error) {
      enqueueSnackbar('Failed to reject registration', { variant: 'error' });
    }
  };

  const filteredRegistrations = pendingRegistrations.filter(reg => {
    if (filterStatus === 'all') return true;
    return reg.status === filterStatus;
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Verification Queue
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main">
                {pendingRegistrations.filter(r => r.status === 'pending').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="info.main">
                {pendingRegistrations.filter(r => r.status === 'under_review').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Under Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="error.main">
                {pendingRegistrations.filter(r => r.priority === 'high').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                High Priority
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary.main">
                {pendingRegistrations.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Queue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FilterListIcon color="action" />
          <Typography variant="subtitle1">Filters:</Typography>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="scrollable"
          >
            <Tab label="All" onClick={() => setFilterStatus('all')} />
            <Tab label="Pending" onClick={() => setFilterStatus('pending')} />
            <Tab label="Under Review" onClick={() => setFilterStatus('under_review')} />
          </Tabs>
        </Box>
      </Paper>

      {/* Verification Queue Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property Details</TableCell>
              <TableCell>Submitted By</TableCell>
              <TableCell>Submission Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRegistrations.map((registration) => (
              <TableRow key={registration.id} hover>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2">
                      {registration.propertyTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Plot: {registration.plotNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Area: {registration.landArea}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {registration.submittedBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {registration.submissionDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={registration.status.replace('_', ' ').toUpperCase()}
                    color={getStatusColor(registration.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={registration.priority.toUpperCase()}
                    color={getPriorityColor(registration.priority)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleViewDetails(registration)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Property Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedProperty && (
          <>
            <DialogTitle>
              Property Verification Details
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                        Property Information
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary="Property Title" 
                            secondary={selectedProperty.propertyTitle} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Plot Number" 
                            secondary={selectedProperty.plotNumber} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Location" 
                            secondary={selectedProperty.location} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Land Area" 
                            secondary={selectedProperty.landArea} 
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                        Submission Details
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary="Submitted By" 
                            secondary={selectedProperty.submittedBy} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Submission Date" 
                            secondary={selectedProperty.submissionDate} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Status" 
                            secondary={
                              <Chip
                                label={selectedProperty.status.replace('_', ' ').toUpperCase()}
                                color={getStatusColor(selectedProperty.status)}
                                size="small"
                              />
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Priority" 
                            secondary={
                              <Chip
                                label={selectedProperty.priority.toUpperCase()}
                                color={getPriorityColor(selectedProperty.priority)}
                                size="small"
                                variant="outlined"
                              />
                            }
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                        Submitted Documents
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <List dense>
                        {selectedProperty.documents.map((doc, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <DescriptionIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={doc} />
                            <Button size="small" variant="outlined">
                              View
                            </Button>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Alert severity="info">
                    Please review all documents carefully before making a decision. 
                    This action will be recorded in the blockchain.
                  </Alert>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Verification Notes (Optional)"
                    placeholder="Add any notes about the verification process..."
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                color="error" 
                startIcon={<CancelIcon />}
                onClick={() => handleReject(selectedProperty.id)}
              >
                Reject
              </Button>
              <Button 
                variant="contained" 
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={() => handleApprove(selectedProperty.id)}
              >
                Approve & Issue NFT
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default VerificationQueue;
