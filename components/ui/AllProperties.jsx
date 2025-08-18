'use client'

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  InputAdornment,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  VerifiedUser as VerifiedIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

const AllProperties = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data for properties
  const mockProperties = [
    {
      id: 1,
      title: 'Residential Land - Colombo',
      propertyType: 'Residential Land',
      address: '123 Main Street, Colombo 07',
      city: 'Colombo',
      district: 'Colombo',
      province: 'Western Province',
      landArea: '2500',
      landUnit: 'sq_ft',
      owner: 'John Doe',
      ownerNIC: '199012345678V',
      status: 'Verified',
      registrationDate: '2024-01-15',
      blockchainHash: '0x1234567890abcdef1234567890abcdef12345678',
      ipfsHash: 'QmP7hdxcMBfLsNQzBVXF4iLbgj9hrhsJ5VfD2DQK9BtRr5',
      documents: 3,
      verified: true,
    },
    {
      id: 2,
      title: 'Commercial Property - Kandy',
      propertyType: 'Commercial Land',
      address: '456 Commercial Avenue, Kandy',
      city: 'Kandy',
      district: 'Kandy',
      province: 'Central Province',
      landArea: '5000',
      landUnit: 'sq_ft',
      owner: 'Jane Smith',
      ownerNIC: '198509876543V',
      status: 'Pending Verification',
      registrationDate: '2024-02-10',
      blockchainHash: '0xabcdef1234567890abcdef1234567890abcdef12',
      ipfsHash: 'QmB9hdxcMBfLsNQzBVXF4iLbgj9hrhsJ5VfD2DQK9BtRr5',
      documents: 5,
      verified: false,
    },
    {
      id: 3,
      title: 'Agricultural Land - Galle',
      propertyType: 'Agricultural Land',
      address: 'Plantation Road, Galle',
      city: 'Galle',
      district: 'Galle',
      province: 'Southern Province',
      landArea: '10',
      landUnit: 'acres',
      owner: 'Mike Johnson',
      ownerNIC: '197706543210V',
      status: 'Verified',
      registrationDate: '2024-01-20',
      blockchainHash: '0x567890abcdef1234567890abcdef1234567890ab',
      ipfsHash: 'QmC8hdxcMBfLsNQzBVXF4iLbgj9hrhsJ5VfD2DQK9BtRr5',
      documents: 4,
      verified: true,
    },
    {
      id: 4,
      title: 'Industrial Land - Anuradhapura',
      propertyType: 'Industrial Land',
      address: 'Industrial Zone, Anuradhapura',
      city: 'Anuradhapura',
      district: 'Anuradhapura',
      province: 'North Central Province',
      landArea: '2',
      landUnit: 'hectares',
      owner: 'Sarah Wilson',
      ownerNIC: '199203456789V',
      status: 'Under Review',
      registrationDate: '2024-02-15',
      blockchainHash: '0xcdef1234567890abcdef1234567890abcdef1234',
      ipfsHash: 'QmD7hdxcMBfLsNQzBVXF4iLbgj9hrhsJ5VfD2DQK9BtRr5',
      documents: 2,
      verified: false,
    },
  ];

  const propertyTypes = [
    'All Types',
    'Residential Land',
    'Commercial Land',
    'Agricultural Land',
    'Industrial Land',
    'Government Land',
    'Other'
  ];

  const statusOptions = [
    'All Status',
    'Verified',
    'Pending Verification',
    'Under Review',
    'Rejected'
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType && filterType !== 'All Types') {
      filtered = filtered.filter(property => property.propertyType === filterType);
    }

    if (filterStatus && filterStatus !== 'All Status') {
      filtered = filtered.filter(property => property.status === filterStatus);
    }

    setFilteredProperties(filtered);
  }, [searchTerm, filterType, filterStatus, properties]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified':
        return 'success';
      case 'Pending Verification':
        return 'warning';
      case 'Under Review':
        return 'info';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case 'Residential Land':
        return <HomeIcon />;
      case 'Commercial Land':
        return <HomeIcon />;
      case 'Agricultural Land':
        return <HomeIcon />;
      case 'Industrial Land':
        return <HomeIcon />;
      default:
        return <HomeIcon />;
    }
  };

  const handleViewProperty = (property) => {
    setSelectedProperty(property);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProperty(null);
  };

  const handleTransferProperty = (propertyId) => {
    router.push(`/transfer/${propertyId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading properties...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Property Registry
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage all registered properties in the system
        </Typography>
      </Box>

      {/* Search and Filter Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Properties"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Property Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Property Type"
              >
                {propertyTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setFilterType('');
                setFilterStatus('');
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Results Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">
          {filteredProperties.length} Properties Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredProperties.length} of {properties.length} total properties
        </Typography>
      </Box>

      {/* Properties Grid */}
      <Grid container spacing={3}>
        {filteredProperties.map((property) => (
          <Grid item xs={12} md={6} lg={4} key={property.id}>
            <Card 
              elevation={3}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease',
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getPropertyTypeIcon(property.propertyType)}
                    <Typography variant="h6" component="h2" noWrap>
                      {property.title}
                    </Typography>
                  </Box>
                  {property.verified && <VerifiedIcon color="success" />}
                </Box>

                <Chip 
                  label={property.status}
                  color={getStatusColor(property.status)}
                  size="small"
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                  <LocationIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {property.address}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {property.owner}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                  <HomeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {property.landArea} {property.landUnit}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                  <CalendarIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Registered: {new Date(property.registrationDate).toLocaleDateString()}
                  </Typography>
                </Box>

                <Typography variant="body2" color="primary" sx={{ fontFamily: 'monospace' }}>
                  ID: {property.blockchainHash.substring(0, 16)}...
                </Typography>
              </CardContent>

              <CardActions>
                <Button 
                  size="small" 
                  startIcon={<ViewIcon />}
                  onClick={() => handleViewProperty(property)}
                >
                  View Details
                </Button>
                <Button 
                  size="small"
                  onClick={() => handleTransferProperty(property.id)}
                >
                  Transfer
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No properties found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or register a new property
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 3 }}
            onClick={() => router.push('/register')}
          >
            Register New Property
          </Button>
        </Box>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add property"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => router.push('/register')}
      >
        <AddIcon />
      </Fab>

      {/* Property Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        {selectedProperty && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getPropertyTypeIcon(selectedProperty.propertyType)}
                {selectedProperty.title}
                {selectedProperty.verified && <VerifiedIcon color="success" />}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Property Information
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Type:</strong> {selectedProperty.propertyType}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Area:</strong> {selectedProperty.landArea} {selectedProperty.landUnit}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Address:</strong> {selectedProperty.address}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>City:</strong> {selectedProperty.city}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Province:</strong> {selectedProperty.province}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Owner Information
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Name:</strong> {selectedProperty.owner}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>NIC:</strong> {selectedProperty.ownerNIC}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Registration Date:</strong> {new Date(selectedProperty.registrationDate).toLocaleDateString()}
                  </Typography>
                  <Chip 
                    label={selectedProperty.status}
                    color={getStatusColor(selectedProperty.status)}
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Blockchain Information
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    <strong>Transaction Hash:</strong> {selectedProperty.blockchainHash}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    <strong>IPFS Hash:</strong> {selectedProperty.ipfsHash}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Documents:</strong> {selectedProperty.documents} files uploaded
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button 
                variant="contained" 
                onClick={() => {
                  handleCloseDialog();
                  handleTransferProperty(selectedProperty.id);
                }}
              >
                Transfer Property
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default AllProperties;
