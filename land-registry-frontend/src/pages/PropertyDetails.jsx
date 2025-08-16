import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  Verified as VerifiedIcon,
  Schedule as ScheduleIcon,
  SwapHoriz as SwapHorizIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  AccountBalance as AccountBalanceIcon,
  Security as SecurityIcon,
  QrCode as QrCodeIcon,
} from '@mui/icons-material';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Mock property data
  const property = {
    id: id,
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setOpenDialog(true);
  };

  const handleTransferProperty = () => {
    navigate(`/transfer/${id}`);
  };

  return (
    <Box>
      {/* Header */}
  <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {property.title}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Plot Number: {property.plotNumber}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip
                label={property.status.toUpperCase()}
                color={getStatusColor(property.status)}
                icon={<VerifiedIcon />}
              />
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SwapHorizIcon />}
              onClick={handleTransferProperty}
              sx={{ mb: 1, display: 'block' }}
            >
              Transfer Property
            </Button>
            <Button
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
              startIcon={<QrCodeIcon />}
            >
              QR Code
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* 3 rows, 2 columns each, equal width/height, stacked vertically */}
  <Grid container spacing={3} direction="column" sx={{ maxWidth: 1200, width: '100%', justifyContent: 'center', alignItems: 'center', mx: 'auto' }}>
        {/* Row 1: Location & Blockchain */}
        <Grid container item spacing={3} alignItems="stretch" sx={{ maxWidth: 1000, width: '100%', mx: 'auto' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 420, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Location Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Address" secondary={property.location.address} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="District" secondary={property.location.district} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Province" secondary={property.location.province} />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Coordinates" secondary={property.location.coordinates} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Land Area" secondary={property.details.landArea} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Property Type" secondary={property.details.propertyType} />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 420, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Blockchain Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="NFT Token ID" 
                      secondary={property.nftTokenId}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Transaction Hash" 
                      secondary={property.blockchainTxHash}
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
                  sx={{ mt: 2 }}
                >
                  View on Blockchain
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Row 2: Owner & Estimated Value */}
        <Grid container item spacing={3} alignItems="stretch" sx={{ maxWidth: 1000, width: '100%', mx: 'auto' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 420, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Owner Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2">Full Name</Typography>
                    <Typography variant="body1">{property.owner.name}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2">NIC Number</Typography>
                    <Typography variant="body1">{property.owner.nic}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2">Email</Typography>
                    <Typography variant="body1">{property.owner.email}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 420, bgcolor: 'rgba(3, 255, 108, 0.29)', color: 'success.contrastText', borderRadius: 1, boxShadow: '0 2px 12px rgba(39,174,96,0.10)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={700}>
                  Estimated Value
                </Typography>
                <Typography variant="h4" fontWeight={900}>
                  {property.details.estimatedValue}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                  Based on current market rates
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Row 3: Documents & Registration Timeline */}
        <Grid container item spacing={3} alignItems="stretch" sx={{ maxWidth: 1000, width: '100%', mx: 'auto' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 420, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Property Documents
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {property.documents.map((doc, index) => (
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
                      {index < property.documents.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 420, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Registration Timeline
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  {property.history.map((event, index) => (
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
        </Grid>
      </Grid>

      {/* Document Viewer Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
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
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PropertyDetails;
