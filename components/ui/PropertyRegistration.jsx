'use client'

import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import FileUpload from './FileUpload';
import LoadingSpinner from './LoadingSpinner';

const steps = [
  'Property Details',
  'Owner Information',
  'Document Upload',
  'Review & Submit'
];

const PropertyRegistration = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [propertyData, setPropertyData] = useState({
    // Property Details
    title: '',
    description: '',
    propertyType: '',
    address: '',
    city: '',
    district: '',
    province: '',
    postalCode: '',
    landArea: '',
    landUnit: 'sq_ft',
    coordinates: '',
    
    // Owner Information
    ownerName: '',
    ownerNIC: '',
    ownerAddress: '',
    ownerPhone: '',
    ownerEmail: '',
    
    // Additional Details
    previousOwner: '',
    purchaseDate: '',
    purchasePrice: '',
    surveyNumber: '',
    deedNumber: '',
  });

  const [errors, setErrors] = useState({});

  const propertyTypes = [
    'Residential Land',
    'Commercial Land',
    'Agricultural Land',
    'Industrial Land',
    'Government Land',
    'Other'
  ];

  const landUnits = [
    { value: 'sq_ft', label: 'Square Feet' },
    { value: 'acres', label: 'Acres' },
    { value: 'perches', label: 'Perches' },
    { value: 'hectares', label: 'Hectares' }
  ];

  const sriLankanProvinces = [
    'Central Province',
    'Eastern Province',
    'North Central Province',
    'Northern Province',
    'North Western Province',
    'Sabaragamuwa Province',
    'Southern Province',
    'Uva Province',
    'Western Province'
  ];

  const handleChange = (field, value) => {
    setPropertyData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0: // Property Details
        if (!propertyData.title) newErrors.title = 'Property title is required';
        if (!propertyData.propertyType) newErrors.propertyType = 'Property type is required';
        if (!propertyData.address) newErrors.address = 'Address is required';
        if (!propertyData.city) newErrors.city = 'City is required';
        if (!propertyData.district) newErrors.district = 'District is required';
        if (!propertyData.province) newErrors.province = 'Province is required';
        if (!propertyData.landArea) newErrors.landArea = 'Land area is required';
        break;
        
      case 1: // Owner Information
        if (!propertyData.ownerName) newErrors.ownerName = 'Owner name is required';
        if (!propertyData.ownerNIC) newErrors.ownerNIC = 'Owner NIC is required';
        if (!propertyData.ownerAddress) newErrors.ownerAddress = 'Owner address is required';
        if (!propertyData.ownerPhone) newErrors.ownerPhone = 'Owner phone is required';
        break;
        
      case 2: // Document Upload
        if (uploadedFiles.length === 0) {
          newErrors.documents = 'At least one document must be uploaded';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) {
      enqueueSnackbar('Please complete all required fields', { variant: 'error' });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call for property registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock blockchain transaction
      const mockTransactionHash = '0x' + Math.random().toString(16).substr(2, 40);
      
      enqueueSnackbar('Property registered successfully!', { variant: 'success' });
      enqueueSnackbar(`Transaction Hash: ${mockTransactionHash}`, { variant: 'info' });
      
      // Redirect to properties page
      setTimeout(() => {
        router.push('/properties');
      }, 2000);
      
    } catch (error) {
      enqueueSnackbar('Registration failed. Please try again.', { variant: 'error' });
    }
    setLoading(false);
  };

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  if (loading) {
    return <LoadingSpinner message="Registering property on blockchain..." />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Register New Property
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Register your property on the Sri Lankan Land Registry Blockchain
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  {index === 0 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Property Title"
                          value={propertyData.title}
                          onChange={(e) => handleChange('title', e.target.value)}
                          error={!!errors.title}
                          helperText={errors.title}
                          required
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Property Description"
                          value={propertyData.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                          multiline
                          rows={3}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required error={!!errors.propertyType}>
                          <InputLabel>Property Type</InputLabel>
                          <Select
                            value={propertyData.propertyType}
                            onChange={(e) => handleChange('propertyType', e.target.value)}
                            label="Property Type"
                          >
                            {propertyTypes.map((type) => (
                              <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required error={!!errors.province}>
                          <InputLabel>Province</InputLabel>
                          <Select
                            value={propertyData.province}
                            onChange={(e) => handleChange('province', e.target.value)}
                            label="Province"
                          >
                            {sriLankanProvinces.map((province) => (
                              <MenuItem key={province} value={province}>{province}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          value={propertyData.address}
                          onChange={(e) => handleChange('address', e.target.value)}
                          error={!!errors.address}
                          helperText={errors.address}
                          required
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="City"
                          value={propertyData.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          error={!!errors.city}
                          helperText={errors.city}
                          required
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="District"
                          value={propertyData.district}
                          onChange={(e) => handleChange('district', e.target.value)}
                          error={!!errors.district}
                          helperText={errors.district}
                          required
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Postal Code"
                          value={propertyData.postalCode}
                          onChange={(e) => handleChange('postalCode', e.target.value)}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Land Area"
                          value={propertyData.landArea}
                          onChange={(e) => handleChange('landArea', e.target.value)}
                          error={!!errors.landArea}
                          helperText={errors.landArea}
                          required
                          type="number"
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Land Unit</InputLabel>
                          <Select
                            value={propertyData.landUnit}
                            onChange={(e) => handleChange('landUnit', e.target.value)}
                            label="Land Unit"
                          >
                            {landUnits.map((unit) => (
                              <MenuItem key={unit.value} value={unit.value}>{unit.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="GPS Coordinates (Optional)"
                          value={propertyData.coordinates}
                          onChange={(e) => handleChange('coordinates', e.target.value)}
                          placeholder="e.g., 6.9271° N, 79.8612° E"
                        />
                      </Grid>
                    </Grid>
                  )}

                  {index === 1 && (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          Current Owner Information
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Owner Full Name"
                          value={propertyData.ownerName}
                          onChange={(e) => handleChange('ownerName', e.target.value)}
                          error={!!errors.ownerName}
                          helperText={errors.ownerName}
                          required
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="NIC Number"
                          value={propertyData.ownerNIC}
                          onChange={(e) => handleChange('ownerNIC', e.target.value)}
                          error={!!errors.ownerNIC}
                          helperText={errors.ownerNIC}
                          required
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Owner Address"
                          value={propertyData.ownerAddress}
                          onChange={(e) => handleChange('ownerAddress', e.target.value)}
                          error={!!errors.ownerAddress}
                          helperText={errors.ownerAddress}
                          required
                          multiline
                          rows={2}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={propertyData.ownerPhone}
                          onChange={(e) => handleChange('ownerPhone', e.target.value)}
                          error={!!errors.ownerPhone}
                          helperText={errors.ownerPhone}
                          required
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          value={propertyData.ownerEmail}
                          onChange={(e) => handleChange('ownerEmail', e.target.value)}
                          type="email"
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Additional Information (Optional)
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Previous Owner"
                          value={propertyData.previousOwner}
                          onChange={(e) => handleChange('previousOwner', e.target.value)}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Purchase Date"
                          value={propertyData.purchaseDate}
                          onChange={(e) => handleChange('purchaseDate', e.target.value)}
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Survey Number"
                          value={propertyData.surveyNumber}
                          onChange={(e) => handleChange('surveyNumber', e.target.value)}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Deed Number"
                          value={propertyData.deedNumber}
                          onChange={(e) => handleChange('deedNumber', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {index === 2 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Upload Required Documents
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Please upload the following documents: Title Deed, Survey Plan, Identity Documents, Previous Ownership Records
                      </Typography>
                      
                      <FileUpload onFileUpload={handleFileUpload} />
                      
                      {errors.documents && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          {errors.documents}
                        </Alert>
                      )}
                      
                      {uploadedFiles.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Uploaded Files:
                          </Typography>
                          {uploadedFiles.map((file, index) => (
                            <Typography key={index} variant="body2" color="success.main">
                              ✓ {file.name}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}

                  {index === 3 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Review Your Information
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" color="primary">Property Details</Typography>
                          <Typography>Title: {propertyData.title}</Typography>
                          <Typography>Type: {propertyData.propertyType}</Typography>
                          <Typography>Address: {propertyData.address}, {propertyData.city}</Typography>
                          <Typography>Land Area: {propertyData.landArea} {propertyData.landUnit}</Typography>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" color="primary" sx={{ mt: 2 }}>Owner Information</Typography>
                          <Typography>Name: {propertyData.ownerName}</Typography>
                          <Typography>NIC: {propertyData.ownerNIC}</Typography>
                          <Typography>Phone: {propertyData.ownerPhone}</Typography>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" color="primary" sx={{ mt: 2 }}>Documents</Typography>
                          <Typography>{uploadedFiles.length} document(s) uploaded</Typography>
                        </Grid>
                      </Grid>
                      
                      <Alert severity="info" sx={{ mt: 3 }}>
                        By submitting this form, you confirm that all information provided is accurate and you have the legal right to register this property.
                      </Alert>
                    </Box>
                  )}
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={loading}
                    >
                      {index === steps.length - 1 ? 'Submit Registration' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Container>
  );
};

export default PropertyRegistration;
