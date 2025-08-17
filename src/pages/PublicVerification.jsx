
import React, { useState } from 'react';
import {
  Box, Container, Paper, Typography, TextField, Button, Card, CardContent, Grid, Chip, List, ListItem, ListItemText, ListItemIcon, Divider, Alert, CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  Verified as VerifiedIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Description as DescriptionIcon,
  QrCodeScanner as QrCodeScannerIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';

// --- Mock Data & Helpers ---
import mockProperty from '../data/mockProperty.json';

function getStatusColor(status) {
  switch (status) {
    case 'verified': return 'success';
    case 'pending': return 'warning';
    case 'rejected': return 'error';
    default: return 'default';
  }
}


export default function PublicVerification() {
  const [searchResult, setSearchResult] = useState(undefined); // undefined = not searched yet
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // --- Handlers ---
  const onSearch = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (data.searchQuery && data.searchQuery.trim() !== '') {
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

  // Clear result if input is cleared
  const handleInputChange = (e) => {
    if (e.target.value.trim() === '') {
      setSearchResult(undefined);
      reset({ searchQuery: '' });
    }
  };

  // --- Render ---
  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // Remove height: '100vh' and overflow: 'hidden' to allow scrolling
    }}>
      <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', py: 0, minHeight: '100vh' }}>
        {/* Search Section */}
        <Paper sx={{
          p: { xs: 2, sm: 4 },
          mb: 4,
          borderRadius: 4,
          boxShadow: '0 4px 24px rgba(21,101,192,0.10)',
          background: 'rgba(255,255,255,0.98)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <SecurityIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
              Property Verification Portal
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Verify property ownership and registration status using blockchain technology
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSearch)} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%', maxWidth: 700 }}>
              <Grid item xs={12} md={7}>
                <TextField
                  fullWidth
                  label="Search Property"
                  placeholder="Enter plot number, NFT token ID, or property address"
                  {...register('searchQuery', { 
                    required: 'Please enter a search term' 
                  })}
                  error={!!errors.searchQuery}
                  helperText={errors.searchQuery?.message || 'Example: COL-07-2024-001 or 0x1234...5678'}
                  sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                  sx={{ height: 56, fontWeight: 600, borderRadius: 2 }}
                >
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<QrCodeScannerIcon />}
                  sx={{ height: 56, fontWeight: 600, borderRadius: 2 }}
                >
                  Scan QR
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Search Results */}
  {searchResult && searchResult !== null && (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
      <Paper sx={{ p: 3, maxWidth: 1100, width: '100%', bgcolor: 'background.default', boxShadow: '0 4px 24px rgba(21,101,192,0.08)', borderRadius: 5, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
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

        {/* First Row: Property Info | Owner Info */}
        <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ mb: 2, width: '100%' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Card sx={{ width: 500, borderRadius: 4, boxShadow: '0 2px 16px rgba(21,101,192,0.08)', bgcolor: 'background.paper', m: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
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
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Card sx={{ width: 500, borderRadius: 4, boxShadow: '0 2px 16px rgba(21,101,192,0.08)', bgcolor: 'background.paper', m: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
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
        </Grid>

        {/* Second Row: Blockchain Certification | Verification Status */}
        <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ width: '100%' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Card sx={{ width: 500, borderRadius: 4, boxShadow: '0 2px 16px rgba(21,101,192,0.08)', bgcolor: 'primary.light', color: 'primary.contrastText', m: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
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
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Card sx={{ width: 500, borderRadius: 4, boxShadow: '0 2px 16px rgba(21,101,192,0.08)', bgcolor: 'background.paper', m: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
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
    </Box>
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

        {/* Information Block: 3 sections in one row, no outlines */}
        <Box
          sx={{
            mt: 4,
            mb: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'stretch',
            justifyContent: 'center',
            gap: { xs: 2, md: 4 },
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: '0 2px 12px rgba(21,101,192,0.06)',
            p: { xs: 2, md: 3 },
            width: '100%',
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          <Box sx={{ flex: 1, textAlign: 'center', px: { xs: 0, md: 2 } }}>
            <SecurityIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Blockchain Security
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All property records are secured on the blockchain, ensuring they cannot be tampered with or falsified.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: 'center', px: { xs: 0, md: 2 } }}>
            <VerifiedIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Government Verified
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Every property registration is verified by official government land registry officers.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: 'center', px: { xs: 0, md: 2 } }}>
            <SearchIcon sx={{ fontSize: 48, color: 'info.main', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Public Access
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Anyone can verify property ownership and authenticity through this public portal.
            </Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 2, textAlign: 'center', flexShrink: 0 }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 Government of Sri Lanka - Department of Land Registry. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};


                
