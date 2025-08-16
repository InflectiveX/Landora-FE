import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Description as DescriptionIcon,
  Security as SecurityIcon,
  SwapHoriz as SwapHorizIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import FileUpload from '../components/common/FileUpload';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const steps = ['Buyer Information', 'Transfer Documents', 'Verification', 'Complete Transfer'];

const PropertyTransfer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  // Mock property data
  const property = {
    id: id,
    title: 'Residential Plot - Colombo 07',
    plotNumber: 'COL-07-2024-001',
    currentOwner: 'John Doe',
    nftTokenId: '0x1234...5678',
  };

  const transferDocuments = [
    { id: 'transferDeed', name: 'Transfer Deed', required: true },
    { id: 'buyerNIC', name: 'Buyer NIC Copy', required: true },
    { id: 'paymentProof', name: 'Payment Proof', required: true },
    { id: 'legalClearance', name: 'Legal Clearance Certificate', required: false },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handler for each document's file upload
  const handleFileUpload = (files, docId) => {
    // Only allow one file per document
    const file = files && files.length > 0 ? files[0].file : null;
    setUploadedDocs(prev => ({
      ...prev,
      [docId]: file
    }));
    if (file) {
      enqueueSnackbar(`${file.name} uploaded successfully`, { variant: 'success' });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Mock API call for transfer
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      enqueueSnackbar('Property transfer completed successfully!', { variant: 'success' });
      navigate(`/property/${id}`);
    } catch (error) {
      enqueueSnackbar('Transfer failed. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
      setConfirmDialog(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              New Owner Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Buyer's Full Name"
                  {...register('buyerName', { required: 'Buyer name is required' })}
                  error={!!errors.buyerName}
                  helperText={errors.buyerName?.message}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Buyer's NIC Number"
                  {...register('buyerNIC', { required: 'NIC number is required' })}
                  error={!!errors.buyerNIC}
                  helperText={errors.buyerNIC?.message}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  {...register('buyerEmail', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={!!errors.buyerEmail}
                  helperText={errors.buyerEmail?.message}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  {...register('buyerPhone', { required: 'Phone number is required' })}
                  error={!!errors.buyerPhone}
                  helperText={errors.buyerPhone?.message}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Buyer's Address"
                  multiline
                  rows={2}
                  {...register('buyerAddress', { required: 'Address is required' })}
                  error={!!errors.buyerAddress}
                  helperText={errors.buyerAddress?.message}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Buyer's Wallet Address (Optional)"
                  {...register('walletAddress')}
                  helperText="Ethereum/Polygon wallet address for NFT transfer"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Sale Amount (LKR)"
                  type="number"
                  {...register('saleAmount', { required: 'Sale amount is required' })}
                  error={!!errors.saleAmount}
                  helperText={errors.saleAmount?.message}
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
              Transfer Documents
            </Typography>
            <Alert severity="info" sx={{ mb: 3, borderRadius: 2, fontSize: 16 }}>
              Please upload all required documents for the property transfer. <br />
              <b>All documents must be signed by both parties.</b>
            </Alert>
            <Grid container spacing={3} alignItems="stretch">
              {transferDocuments.map((doc) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={doc.id} sx={{ display: 'flex' }}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      boxShadow: 2,
                      p: 1,
                      background: '#fafbfc',
                      minHeight: 400,
                      minWidth: 320,
                      maxWidth: 350,
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'stretch',
                      mx: 'auto',
                    }}
                  >
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <DescriptionIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {doc.name}
                          {doc.required && (
                            <Chip label="Required" size="small" color="error" sx={{ ml: 1 }} />
                          )}
                        </Typography>
                      </Box>
                      <FileUpload
                        onFilesChange={(files) => handleFileUpload(files, doc.id)}
                        acceptedTypes={{
                          'application/pdf': ['.pdf'],
                          'image/*': ['.png', '.jpg', '.jpeg'],
                        }}
                        maxFiles={1}
                        maxSize={10 * 1024 * 1024}
                        required={doc.required}
                        label={null}
                        description={`Upload file for ${doc.name}`}
                      />
                      {uploadedDocs[doc.id] && (
                        <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                          ✓ {uploadedDocs[doc.id].name}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
        
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Verification Required
            </Typography>
            
            <Alert severity="warning" sx={{ mb: 3 }} icon={<WarningIcon />}>
              This transfer requires government verification before completion. 
              The process may take 3-5 business days.
            </Alert>
            
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Verification Checklist
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                    <ListItemText primary="All required documents uploaded" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><SecurityIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Government officer will verify transfer documents" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><SwapHorizIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="NFT ownership will be transferred on blockchain" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        );
        
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Transfer Summary
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Property Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Property" secondary={property.title} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Plot Number" secondary={property.plotNumber} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Current Owner" secondary={property.currentOwner} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="NFT Token ID" secondary={property.nftTokenId} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Transfer Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List dense>
                      <ListItem>
                        <ListItemText primary="New Owner" secondary={watch('buyerName')} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Buyer NIC" secondary={watch('buyerNIC')} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Sale Amount" secondary={`LKR ${watch('saleAmount')}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Transfer Date" secondary={new Date().toLocaleDateString()} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Alert severity="error" sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Important Notice
              </Typography>
              This action is irreversible. Once confirmed, the property ownership 
              will be permanently transferred to the new owner on the blockchain.
            </Alert>
          </Box>
        );
        
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Transfer Property Ownership
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          
          {activeStep === steps.length - 1 ? (
            <Button 
              variant="contained" 
              color="error"
              onClick={() => setConfirmDialog(true)}
            >
              Complete Transfer
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>Confirm Property Transfer</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action cannot be undone. Are you sure you want to transfer 
            ownership of this property?
          </Alert>
          <Typography variant="body2">
            Property: {property.title}<br />
            New Owner: {watch('buyerName')}<br />
            Sale Amount: LKR {watch('saleAmount')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Processing...' : 'Confirm Transfer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PropertyTransfer;
