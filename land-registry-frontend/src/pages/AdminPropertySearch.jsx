import React, { useState } from 'react';
import {
  Box, Container, Paper, Typography, TextField, Button, Card, CardContent, Grid, Chip, List, ListItem, ListItemText, ListItemIcon, Divider, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Verified as VerifiedIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Description as DescriptionIcon,
  QrCode as QrCodeIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  SwapHoriz as SwapHorizIcon,
  AccountBalance as AccountBalanceIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

// Mock property data (replace with API call in production)
const mockProperty = {
  id: 1,
  title: 'Residential Plot - Colombo 07',
  plotNumber: 'COL-07-2024-001',
  status: 'verified',
  registrationDate: '2024-08-10',
  verificationDate: '2024-08-12',
  nftTokenId: '0x1234...5678',
  blockchainTxHash: '0xabcd...efgh',
  owner: {
    name: 'John Doe',
    nic: '199012345678',
    email: 'john.doe@example.com',
  },
  location: {
    address: 'No. 123, Galle Road, Colombo 07',
    district: 'Colombo',
    province: 'Western Province',
    coordinates: '6.9271° N, 79.8612° E',
  },
  details: {
    landArea: '10 perches',
    propertyType: 'Residential',
    surveyNumber: 'SUR-2024-789',
    estimatedValue: 'LKR 15,000,000',
  },
  documents: [
    { id: 1, name: 'Title Deed', type: 'PDF', size: '2.3 MB', ipfsHash: 'QmX...abc' },
    { id: 2, name: 'Survey Plan', type: 'PDF', size: '1.8 MB', ipfsHash: 'QmY...def' },
    { id: 3, name: 'Ownership History', type: 'PDF', size: '1.2 MB', ipfsHash: 'QmZ...ghi' },
  ],
  history: [
    { date: '2024-08-12', action: 'Property Verified', actor: 'Land Registry Officer' },
    { date: '2024-08-11', action: 'Documents Reviewed', actor: 'Verification Department' },
    { date: '2024-08-10', action: 'Registration Submitted', actor: 'John Doe' },
  ],
};

function getStatusColor(status) {
  switch (status) {
    case 'verified': return 'success';
    case 'pending': return 'warning';
    case 'rejected': return 'error';
    default: return 'default';
  }
}

export default function AdminPropertySearch() {
  const [searchResult, setSearchResult] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    if (searchQuery && searchQuery.trim() !== '') {
      setSearchResult(mockProperty);
    } else {
      setSearchResult(null);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setSearchResult(undefined);
    }
  };

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 2, md: 6 } }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 2, md: 5 }, borderRadius: 5, mb: 5, background: 'linear-gradient(90deg, #f8fafc 60%, #e3f2fd 100%)', boxShadow: '0 4px 24px rgba(21,101,192,0.10)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography variant="h4" fontWeight={700} color="primary.main">
              Admin Property Search
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Search for any property and view full details. Use plot number, NFT token ID, or address.
          </Typography>
          <Box component="form" onSubmit={onSearch} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <TextField
              label="Search Property"
              placeholder="e.g. COL-07-2024-001"
              value={searchQuery}
              onChange={handleInputChange}
              sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 2 }}
              size="large"
            />
            <Button
              variant="contained"
              type="submit"
              startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
              disabled={loading}
              sx={{ height: 56, fontWeight: 600, borderRadius: 2, minWidth: 120 }}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Box>
        </Paper>

        {/* Search Results */}
        {searchResult && searchResult !== null && (
          <Paper elevation={2} sx={{ p: { xs: 2, md: 5 }, borderRadius: 5, mb: 5, background: 'white', boxShadow: '0 4px 24px rgba(21,101,192,0.08)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 4, flexDirection: { xs: 'column', md: 'row' } }}>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {searchResult.title}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Plot Number: {searchResult.plotNumber}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={searchResult.status.toUpperCase()}
                    color={getStatusColor(searchResult.status)}
                    icon={<VerifiedIcon />}
                    sx={{ fontWeight: 600, fontSize: 16, px: 2, py: 1 }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, gap: 2, mt: { xs: 2, md: 0 } }}>
                <Tooltip title="Transfer Property">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<SwapHorizIcon />}
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  >
                    Transfer
                  </Button>
                </Tooltip>
                <Tooltip title="Show QR Code">
                  <Button
                    variant="outlined"
                    startIcon={<QrCodeIcon />}
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  >
                    QR Code
                  </Button>
                </Tooltip>
              </Box>
            </Box>
            <Grid container spacing={4}>
              {/* Property Information */}
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  {/* Location Details */}
                  <Grid item xs={12}>
                    <Card elevation={0} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(21,101,192,0.04)' }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                          Location Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <List dense>
                              <ListItem>
                                <ListItemText primary="Address" secondary={searchResult.location.address} />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="District" secondary={searchResult.location.district} />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="Province" secondary={searchResult.location.province} />
                              </ListItem>
                            </List>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <List dense>
                              <ListItem>
                                <ListItemText primary="Coordinates" secondary={searchResult.location.coordinates} />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="Land Area" secondary={searchResult.details.landArea} />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="Property Type" secondary={searchResult.details.propertyType} />
                              </ListItem>
                            </List>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* Owner Information */}
                  <Grid item xs={12}>
                    <Card elevation={0} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(21,101,192,0.04)' }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                          <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                          Owner Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">Full Name</Typography>
                            <Typography variant="body1" fontWeight={600}>{searchResult.owner.name}</Typography>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">NIC Number</Typography>
                            <Typography variant="body1" fontWeight={600}>{searchResult.owner.nic}</Typography>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                            <Typography variant="body1" fontWeight={600}>{searchResult.owner.email}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* Documents */}
                  <Grid item xs={12}>
                    <Card elevation={0} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(21,101,192,0.04)' }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                          <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                          Property Documents
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                          {searchResult.documents.map((doc, index) => (
                            <React.Fragment key={doc.id}>
                              <ListItem>
                                <ListItemIcon>
                                  <DescriptionIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={doc.name}
                                  secondary={`${doc.type} • ${doc.size} • IPFS: ${doc.ipfsHash}`}
                                />
                                <Box>
                                  <Tooltip title="View Document">
                                    <IconButton onClick={() => handleViewDocument(doc)}>
                                      <VisibilityIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Download">
                                    <IconButton>
                                      <DownloadIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </ListItem>
                              {index < searchResult.documents.length - 1 && <Divider />}
                            </React.Fragment>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              {/* Sidebar */}
              <Grid item xs={12} md={4}>
                <Grid container spacing={3}>
                  {/* Blockchain Information */}
                  <Grid item xs={12}>
                    <Card elevation={0} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(21,101,192,0.04)' }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                          <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
                          Blockchain Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List dense>
                          <ListItem>
                            <ListItemText 
                              primary="NFT Token ID" 
                              secondary={searchResult.nftTokenId}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Transaction Hash" 
                              secondary={searchResult.blockchainTxHash}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Network" 
                              secondary="Polygon Mainnet"
                            />
                          </ListItem>
                        </List>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<AccountBalanceIcon />}
                          sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}
                        >
                          View on Blockchain
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* Registration Timeline */}
                  <Grid item xs={12}>
                    <Card elevation={0} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(21,101,192,0.04)' }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                          <ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
                          Registration Timeline
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List dense>
                          {searchResult.history.map((event, index) => (
                            <ListItem key={index}>
                              <ListItemText
                                primary={event.action}
                                secondary={`${event.date} • ${event.actor}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* Property Value */}
                  <Grid item xs={12}>
                    <Card elevation={0} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(21,101,192,0.04)', bgcolor: 'success.light', color: 'success.contrastText' }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                          Estimated Value
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {searchResult.details.estimatedValue}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                          Based on current market rates
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Document Viewer Dialog */}
            <Dialog 
              open={openDialog} 
              onClose={() => setOpenDialog(false)}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle sx={{ fontWeight: 700 }}>
                {selectedDocument?.name}
              </DialogTitle>
              <DialogContent>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <DescriptionIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                  <Typography variant="body1" gutterBottom>
                    Document Viewer
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    IPFS Hash: {selectedDocument?.ipfsHash}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    File Size: {selectedDocument?.size}
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} sx={{ fontWeight: 600 }}>Close</Button>
                <Button variant="contained" startIcon={<DownloadIcon />} sx={{ fontWeight: 600 }}>
                  Download
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        )}
        {/* No Results */}
        {searchResult === null && !loading && (
          <Paper elevation={1} sx={{ p: 4, textAlign: 'center', borderRadius: 4, background: 'linear-gradient(90deg, #f8fafc 60%, #e3f2fd 100%)' }}>
            <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom fontWeight={700}>
              No results found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please check your search terms and try again. Make sure to enter a valid plot number, NFT token ID, or property address.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
