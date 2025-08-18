'use client'

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material';
import {
  Search as SearchIcon,
  VerifiedUser as VerifiedIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
  Description as DocumentIcon,
  Security as SecurityIcon,
  AccountBalance as BlockchainIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const PublicVerification = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('propertyId');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationDetails, setVerificationDetails] = useState(null);

  // Mock property data
  const mockProperties = {
    'PROP001': {
      id: 'PROP001',
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
      verificationDetails: {
        verifiedBy: 'Land Registry Authority',
        verificationDate: '2024-01-20',
        verificationScore: 95,
        documentsVerified: ['Title Deed', 'Survey Plan', 'Identity Document'],
        blockchainConfirmations: 1245,
        lastUpdated: '2024-02-10',
      },
      transferHistory: [
        {
          date: '2024-01-15',
          from: 'Government Registry',
          to: 'John Doe',
          type: 'Initial Registration',
          txHash: '0x1234567890abcdef1234567890abcdef12345678'
        }
      ]
    },
    '0x1234567890abcdef1234567890abcdef12345678': {
      id: 'PROP001',
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
      verificationDetails: {
        verifiedBy: 'Land Registry Authority',
        verificationDate: '2024-01-20',
        verificationScore: 95,
        documentsVerified: ['Title Deed', 'Survey Plan', 'Identity Document'],
        blockchainConfirmations: 1245,
        lastUpdated: '2024-02-10',
      },
      transferHistory: [
        {
          date: '2024-01-15',
          from: 'Government Registry',
          to: 'John Doe',
          type: 'Initial Registration',
          txHash: '0x1234567890abcdef1234567890abcdef12345678'
        }
      ]
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      enqueueSnackbar('Please enter a search term', { variant: 'warning' });
      return;
    }

    setLoading(true);
    setSearchResults(null);
    setVerificationDetails(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const property = mockProperties[searchQuery];
      if (property) {
        setSearchResults(property);
        setVerificationDetails(property.verificationDetails);
        enqueueSnackbar('Property found and verified!', { variant: 'success' });
      } else {
        setSearchResults(null);
        enqueueSnackbar('Property not found in registry', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Search failed. Please try again.', { variant: 'error' });
    }
    
    setLoading(false);
  };

  const getVerificationScoreColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  const getVerificationIcon = (score) => {
    if (score >= 90) return <CheckIcon color="success" />;
    if (score >= 70) return <WarningIcon color="warning" />;
    return <ErrorIcon color="error" />;
  };

  const handleViewBlockchain = (hash) => {
    const explorerUrl = `https://etherscan.io/tx/${hash}`;
    window.open(explorerUrl, '_blank');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Public Property Verification
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Verify the authenticity of any property registered on the Sri Lankan Land Registry Blockchain
        </Typography>
        
        <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
          <Typography variant="subtitle2" gutterBottom>
            How to use this verification system:
          </Typography>
          <Typography variant="body2">
            • Enter a Property ID (e.g., PROP001) or Transaction Hash to search<br/>
            • View complete property details and ownership information<br/>
            • Check blockchain confirmations and document authenticity<br/>
            • All information is publicly verifiable and tamper-proof
          </Typography>
        </Alert>
      </Box>

      {/* Search Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Search Property Registry
        </Typography>
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Enter Property ID or Transaction Hash"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., PROP001 or 0x1234..."
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSearch}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
            >
              {loading ? 'Searching...' : 'Verify Property'}
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Examples:</strong> Try searching "PROP001" or "0x1234567890abcdef1234567890abcdef12345678"
          </Typography>
        </Box>
      </Paper>

      {/* Search Results */}
      {searchResults && (
        <Grid container spacing={4}>
          {/* Property Information */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <HomeIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h5" component="h2">
                    {searchResults.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Property ID: {searchResults.id}
                  </Typography>
                </Box>
                {searchResults.verified && (
                  <VerifiedIcon color="success" sx={{ ml: 'auto', fontSize: 32 }} />
                )}
              </Box>

              <Chip 
                label={searchResults.status}
                color={searchResults.status === 'Verified' ? 'success' : 'warning'}
                sx={{ mb: 3 }}
              />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><HomeIcon /></ListItemIcon>
                      <ListItemText 
                        primary="Property Type" 
                        secondary={searchResults.propertyType}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><LocationIcon /></ListItemIcon>
                      <ListItemText 
                        primary="Address" 
                        secondary={searchResults.address}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><LocationIcon /></ListItemIcon>
                      <ListItemText 
                        primary="Area" 
                        secondary={`${searchResults.landArea} ${searchResults.landUnit}`}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><PersonIcon /></ListItemIcon>
                      <ListItemText 
                        primary="Current Owner" 
                        secondary={searchResults.owner}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CalendarIcon /></ListItemIcon>
                      <ListItemText 
                        primary="Registration Date" 
                        secondary={new Date(searchResults.registrationDate).toLocaleDateString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><DocumentIcon /></ListItemIcon>
                      <ListItemText 
                        primary="Documents" 
                        secondary={`${searchResults.documents} verified documents`}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>

            {/* Blockchain Information */}
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <BlockchainIcon sx={{ mr: 1 }} />
                Blockchain Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Transaction Hash:</strong>
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ fontFamily: 'monospace', wordBreak: 'break-all', mb: 2 }}
                  >
                    <Link 
                      component="button"
                      onClick={() => handleViewBlockchain(searchResults.blockchainHash)}
                    >
                      {searchResults.blockchainHash}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    <strong>IPFS Hash:</strong>
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}
                  >
                    {searchResults.ipfsHash}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Verification Details */}
          <Grid item xs={12} lg={4}>
            {verificationDetails && (
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <SecurityIcon sx={{ mr: 1 }} />
                  Verification Status
                </Typography>

                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                      variant="determinate"
                      value={verificationDetails.verificationScore}
                      size={80}
                      thickness={4}
                      color={getVerificationScoreColor(verificationDetails.verificationScore)}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography variant="h6" component="div" color="text.secondary">
                        {verificationDetails.verificationScore}%
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Verification Score
                  </Typography>
                </Box>

                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      {getVerificationIcon(verificationDetails.verificationScore)}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Verified By" 
                      secondary={verificationDetails.verifiedBy}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CalendarIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Verification Date" 
                      secondary={new Date(verificationDetails.verificationDate).toLocaleDateString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><BlockchainIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Confirmations" 
                      secondary={verificationDetails.blockchainConfirmations.toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CalendarIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Last Updated" 
                      secondary={new Date(verificationDetails.lastUpdated).toLocaleDateString()}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Verified Documents:
                </Typography>
                {verificationDetails.documentsVerified.map((doc, index) => (
                  <Chip 
                    key={index}
                    label={doc} 
                    size="small" 
                    color="success" 
                    sx={{ mr: 1, mb: 1 }}
                    icon={<CheckIcon />}
                  />
                ))}
              </Paper>
            )}

            {/* Transfer History */}
            {searchResults.transferHistory && searchResults.transferHistory.length > 0 && (
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Transfer History
                </Typography>
                
                {searchResults.transferHistory.map((transfer, index) => (
                  <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent sx={{ py: 2 }}>
                      <Typography variant="subtitle2" color="primary">
                        {transfer.type}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>From:</strong> {transfer.from}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>To:</strong> {transfer.to}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(transfer.date).toLocaleDateString()}
                      </Typography>
                      <Link 
                        component="button"
                        variant="caption"
                        onClick={() => handleViewBlockchain(transfer.txHash)}
                        sx={{ fontFamily: 'monospace' }}
                      >
                        {transfer.txHash.substring(0, 20)}...
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </Paper>
            )}
          </Grid>
        </Grid>
      )}

      {/* Features Section */}
      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Verification Features
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <BlockchainIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Blockchain Security
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All property records are stored on an immutable blockchain, ensuring tamper-proof verification.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <VerifiedIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Government Verified
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All properties are verified by authorized government officials and land registry authorities.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <SecurityIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Public Access
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Anyone can verify property ownership and authenticity without needing special permissions.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PublicVerification;
