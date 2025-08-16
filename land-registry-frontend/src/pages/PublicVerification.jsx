import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  CircularProgress,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  AccountBalance as AccountBalanceIcon,
  Verified as VerifiedIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Description as DescriptionIcon,
  QrCodeScanner as QrCodeScannerIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';

const PublicVerification = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Mock search results
  const mockProperty = {
    id: 1,
    title: 'Residential Plot - Colombo 07',
    plotNumber: 'COL-07-2024-001',
    status: 'verified',
    registrationDate: '2024-08-10',
    verificationDate: '2024-08-12',
    nftTokenId: '0x1234...5678',
    owner: {
      name: 'John D***', // Partially hidden for privacy
      nic: '1990*****678',
    },
    location: {
      address: 'No. 123, Galle Road, Colombo 07',
      district: 'Colombo',
      province: 'Western Province',
    },
    details: {
      landArea: '10 perches',
      propertyType: 'Residential',
      surveyNumber: 'SUR-2024-789',
    },
    blockchainInfo: {
      network: 'Polygon Mainnet',
      contractAddress: '0xabcd...efgh',
      lastUpdate: '2024-08-12',
    }
  };

  const onSearch = async (data) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful search
      if (data.searchQuery) {
        setSearchResult(mockProperty);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <AccountBalanceIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sri Lankan Land Registry - Public Verification
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search Section */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <SecurityIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom color="primary">
              Property Verification Portal
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Verify property ownership and registration status using blockchain technology
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSearch)}>
            <Grid container spacing={2} alignItems="end">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Search Property"
                  placeholder="Enter plot number, NFT token ID, or property address"
                  {...register('searchQuery', { 
                    required: 'Please enter a search term' 
                  })}
                  error={!!errors.searchQuery}
                  helperText={errors.searchQuery?.message || 'Example: COL-07-2024-001 or 0x1234...5678'}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                >
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<QrCodeScannerIcon />}
                >
                  Scan QR
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Search Results */}
        {searchResult && (
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <VerifiedIcon sx={{ mr: 2, color: 'success.main' }} />
              <Typography variant="h5" color="success.main">
                Property Found & Verified
              </Typography>
              <Chip
                label={searchResult.status.toUpperCase()}
                color={getStatusColor(searchResult.status)}
                sx={{ ml: 2 }}
              />
            </Box>

            <Grid container spacing={3}>
              {/* Property Information */}
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                      Property Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <List dense>
                          <ListItem>
                            <ListItemText 
                              primary="Property Title" 
                              secondary={searchResult.title} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Plot Number" 
                              secondary={searchResult.plotNumber} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Survey Number" 
                              secondary={searchResult.details.surveyNumber} 
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <List dense>
                          <ListItem>
                            <ListItemText 
                              primary="Property Type" 
                              secondary={searchResult.details.propertyType} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Land Area" 
                              secondary={searchResult.details.landArea} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="District" 
                              secondary={searchResult.location.district} 
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>

                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                      Address
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {searchResult.location.address}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Owner Information */}
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                      Owner Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2">Registered Owner</Typography>
                        <Typography variant="body1">{searchResult.owner.name}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2">NIC Number</Typography>
                        <Typography variant="body1">{searchResult.owner.nic}</Typography>
                      </Grid>
                    </Grid>

                    <Alert severity="info" sx={{ mt: 2 }}>
                      Personal information is partially hidden for privacy protection
                    </Alert>
                  </CardContent>
                </Card>
              </Grid>

              {/* Blockchain Verification */}
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <SecurityIcon sx={{ mr: 1 }} />
                      Blockchain Verification
                    </Typography>
                    <Divider sx={{ mb: 2, borderColor: 'primary.contrastText' }} />
                    
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="NFT Token ID" 
                          secondary={searchResult.nftTokenId}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Network" 
                          secondary={searchResult.blockchainInfo.network}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Registration Date" 
                          secondary={searchResult.registrationDate}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Last Verification" 
                          secondary={searchResult.verificationDate}
                        />
                      </ListItem>
                    </List>

                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 2 }}
                    >
                      View on Blockchain
                    </Button>
                  </CardContent>
                </Card>

                {/* Verification Status */}
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Verification Status
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <VerifiedIcon color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Government Verified"
                          secondary="Authenticated by Land Registry"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <SecurityIcon color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Blockchain Secured"
                          secondary="Immutable record on blockchain"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DescriptionIcon color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Documents Verified"
                          secondary="All supporting docs validated"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* No Results */}
        {searchResult === null && !loading && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No results found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please check your search terms and try again. Make sure to enter a valid plot number, NFT token ID, or property address.
            </Typography>
          </Paper>
        )}

        {/* Information Cards */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <SecurityIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Blockchain Security
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All property records are secured on the blockchain, ensuring they cannot be tampered with or falsified.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <VerifiedIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Government Verified
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Every property registration is verified by official government land registry officers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <SearchIcon sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Public Access
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Anyone can verify property ownership and authenticity through this public portal.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 Government of Sri Lanka - Department of Land Registry. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PublicVerification;
                
