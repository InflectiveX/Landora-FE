import React, { useState } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import FileUpload from '../components/common/FileUpload';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const steps = ['Property Information', 'Document Upload', 'Review & Submit'];

const LandRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const requiredDocuments = [
    { id: 'titleDeed', name: 'Title Deed', required: true },
    { id: 'surveyPlan', name: 'Survey Plan', required: true },
    { id: 'ownershipHistory', name: 'Previous Ownership Records', required: false },
    { id: 'taxReceipts', name: 'Property Tax Receipts', required: false },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handler for each document's file upload
  const handleFileUpload = (files, documentId) => {
    // Only allow one file per document
    const file = files && files.length > 0 ? files[0].file : null;
    setUploadedFiles(prev => ({
      ...prev,
      [documentId]: file
    }));
    if (file) {
      enqueueSnackbar(`${file.name} uploaded successfully`, { variant: 'success' });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      enqueueSnackbar('Registration submitted successfully! You will receive updates via email.', { 
        variant: 'success' 
      });
      
      // Reset form or redirect
      setActiveStep(0);
      setUploadedFiles({});
    } catch (error) {
      enqueueSnackbar('Registration failed. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form">
            <Typography variant="h6" gutterBottom>
              Property Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Property Title"
                  {...register('propertyTitle', { required: 'Property title is required' })}
                  error={!!errors.propertyTitle}
                  helperText={errors.propertyTitle?.message}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Survey/Plot Number"
                  {...register('plotNumber', { required: 'Plot number is required' })}
                  error={!!errors.plotNumber}
                  helperText={errors.plotNumber?.message}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Property Address"
                  multiline
                  rows={2}
                  {...register('address', { required: 'Address is required' })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="District"
                  {...register('district', { required: 'District is required' })}
                  error={!!errors.district}
                  helperText={errors.district?.message}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Province"
                  {...register('province', { required: 'Province is required' })}
                  error={!!errors.province}
                  helperText={errors.province?.message}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Land Area (in perches)"
                  type="number"
                  {...register('landArea', { required: 'Land area is required' })}
                  error={!!errors.landArea}
                  helperText={errors.landArea?.message}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Property Type"
                  select
                  SelectProps={{ native: true }}
                  {...register('propertyType', { required: 'Property type is required' })}
                  error={!!errors.propertyType}
                  helperText={errors.propertyType?.message}
                >
                  <option value="">Select Property Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="agricultural">Agricultural</option>
                  <option value="industrial">Industrial</option>
                </TextField>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Current Owner's NIC"
                  {...register('ownerNIC', { required: 'Owner NIC is required' })}
                  error={!!errors.ownerNIC}
                  helperText={errors.ownerNIC?.message}
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
              Document Upload
            </Typography>
            <Alert severity="info" sx={{ mb: 3, borderRadius: 2, fontSize: 16 }}>
              Please upload clear, high-resolution scans or photos of your documents. <br />
              <b>Accepted formats: PDF, JPG, PNG (Max 10MB per file)</b>
            </Alert>
            <Grid container spacing={3} alignItems="stretch">
              {requiredDocuments.map((doc) => (
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
                      {uploadedFiles[doc.id] && (
                        <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                          ✓ {uploadedFiles[doc.id].name}
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
              Review & Submit
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 1 }} />
                      Property Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Property Title" 
                          secondary={watch('propertyTitle')} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Plot Number" 
                          secondary={watch('plotNumber')} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Address" 
                          secondary={watch('address')} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Land Area" 
                          secondary={`${watch('landArea')} perches`} 
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
                      <DescriptionIcon sx={{ mr: 1 }} />
                      Uploaded Documents
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List dense>
                      {requiredDocuments.map((doc) => (
                        <ListItem key={doc.id}>
                          <ListItemIcon>
                            {uploadedFiles[doc.id] ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <DescriptionIcon color="disabled" />
                            )}
                          </ListItemIcon>
                          <ListItemText 
                            primary={doc.name}
                            secondary={uploadedFiles[doc.id] ? uploadedFiles[doc.id].name : 'Not uploaded'}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Alert severity="warning" sx={{ mt: 3 }}>
              By submitting this registration, you confirm that all information provided is accurate 
              and all uploaded documents are authentic. False information may result in legal action.
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
        Register New Property
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
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? 'Submitting...' : 'Submit Registration'}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default LandRegistration;
