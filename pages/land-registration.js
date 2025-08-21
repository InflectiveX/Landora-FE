'use client';
import { useState } from 'react';
import { Box, Paper, Typography, Stepper, Step, StepLabel, Button, TextField, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider, Alert, CircularProgress, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Description as DescriptionIcon, CheckCircle as CheckCircleIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import FileUpload from '@/components/common/FileUpload';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useApi } from '@/lib/api';
import apiClient from '@/lib/api';
import MainLayout from '@/components/layouts/MainLayout';

const steps = ['Property Information', 'Document Upload', 'Review & Submit'];

export default function LandRegistration() {
  const { enqueueSnackbar } = useSnackbar();
  const { registerProperty } = useApi();
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const schema = yup.object({
    propertyTitle: yup.string().required('Property title is required'),
    plotNumber: yup.string().required('Plot number is required'),
    address: yup.string().required('Address is required'),
    district: yup.string().required('District is required'),
    province: yup.string().required('Province is required'),
    landArea: yup.number().typeError('Enter a number').required('Land area is required'),
    propertyType: yup.string().required('Property type is required'),
    ownerNIC: yup.string().required('Owner NIC is required'),
  });
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const requiredDocuments = [
    { id: 'titleDeed', name: 'Title Deed', required: true },
    { id: 'surveyPlan', name: 'Survey Plan', required: true },
    { id: 'ownershipHistory', name: 'Previous Ownership Records', required: false },
    { id: 'taxReceipts', name: 'Property Tax Receipts', required: false },
  ];

  const handleNext = () => setActiveStep((s) => s + 1);
  const handleBack = () => setActiveStep((s) => s - 1);
  const handleFileUpload = (files, id) => {
    const file = files && files.length > 0 ? files[0].file : null;
    setUploadedFiles((prev) => ({ ...prev, [id]: file }));
    if (file) enqueueSnackbar(`${file.name} uploaded successfully`, { variant: 'success' });
  };

  const onSubmit = async (data) => {
    console.log("clicked");
    setLoading(true);
    try {
      const body = {
        address: data.address,
        district: data.district,
        province: data.province,
        land_area: String(data.landArea),
        property_type: data.propertyType,
        survey_number: data.plotNumber,
        currentowner_nic: data.ownerNIC
      };
      const res = await registerProperty(body);
      const newLandId = (res && typeof res === 'object') ? res.id : undefined;

      // Register documents as JSON if we have a new land id
      if (newLandId) {
        const keys = Object.keys(uploadedFiles);
        for (const k of keys) {
          const file = uploadedFiles[k];
          if (!file) continue;
          await apiClient.document.register({
            land_id: newLandId,
            name: file.name,
            doc_type: k,
            url: ''
          });
        }
      }

      enqueueSnackbar('Registration submitted successfully!', { variant: 'success' });
      setActiveStep(0);
      setUploadedFiles({});
    } catch (e) {
      enqueueSnackbar('Registration failed. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    if (activeStep === 0) {
      return (
        <Box>
          <Typography variant="h6" gutterBottom>Property Information</Typography>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}><TextField fullWidth label="Property Title" {...register('propertyTitle', { required: 'Property title is required' })} error={!!errors.propertyTitle} helperText={errors.propertyTitle?.message} /></Grid>
            <Grid xs={12} md={6}><TextField fullWidth label="Survey/Plot Number" {...register('plotNumber', { required: 'Plot number is required' })} error={!!errors.plotNumber} helperText={errors.plotNumber?.message} /></Grid>
            <Grid xs={12}><TextField fullWidth label="Property Address" multiline rows={2} {...register('address', { required: 'Address is required' })} error={!!errors.address} helperText={errors.address?.message} /></Grid>
            <Grid xs={12} md={4}><TextField fullWidth label="District" {...register('district', { required: 'District is required' })} error={!!errors.district} helperText={errors.district?.message} /></Grid>
            <Grid xs={12} md={4}><TextField fullWidth label="Province" {...register('province', { required: 'Province is required' })} error={!!errors.province} helperText={errors.province?.message} /></Grid>
            <Grid xs={12} md={4}><TextField fullWidth label="Land Area (in perches)" type="number" {...register('landArea', { required: 'Land area is required' })} error={!!errors.landArea} helperText={errors.landArea?.message} /></Grid>
            <Grid xs={12} md={6}><TextField fullWidth select SelectProps={{ native: true }} {...register('propertyType', { required: 'Property type is required' })} error={!!errors.propertyType} helperText={errors.propertyType?.message}><option value="">Select Property Type</option><option value="residential">Residential</option><option value="commercial">Commercial</option><option value="agricultural">Agricultural</option><option value="industrial">Industrial</option></TextField></Grid>
            <Grid xs={12} md={6}><TextField fullWidth label="Current Owner's NIC" {...register('ownerNIC', { required: 'Owner NIC is required' })} error={!!errors.ownerNIC} helperText={errors.ownerNIC?.message} /></Grid>
          </Grid>
        </Box>
      );
    }
    if (activeStep === 1) {
      return (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>Document Upload</Typography>
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2, fontSize: 16 }}>Please upload clear, high-resolution scans. Accepted: PDF, JPG, PNG (Max 10MB)</Alert>
          <Grid container spacing={3}>
            {requiredDocuments.map((doc) => (
              <Grid xs={12} sm={6} md={4} lg={3} key={doc.id}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <DescriptionIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{doc.name}{doc.required && (<Chip label="Required" size="small" color="error" sx={{ ml: 1 }} />)}</Typography>
                    </Box>
                    <FileUpload onFilesChange={(files) => handleFileUpload(files, doc.id)} acceptedTypes={{ 'application/pdf': ['.pdf'], 'image/*': ['.png', '.jpg', '.jpeg'] }} maxFiles={1} maxSize={10 * 1024 * 1024} required={doc.required} label={null} description={`Upload file for ${doc.name}`} />
                    {uploadedFiles[doc.id] && (<Typography variant="body2" color="success.main" sx={{ mt: 1 }}>✓ {uploadedFiles[doc.id].name}</Typography>)}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }
    return (
      <Box>
        <Typography variant="h6" gutterBottom>Review & Submit</Typography>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card><CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><LocationIcon sx={{ mr: 1 }} />Property Details</Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                <ListItem><ListItemText primary="Property Title" secondary={watch('propertyTitle')} /></ListItem>
                <ListItem><ListItemText primary="Plot Number" secondary={watch('plotNumber')} /></ListItem>
                <ListItem><ListItemText primary="Address" secondary={watch('address')} /></ListItem>
                <ListItem><ListItemText primary="Land Area" secondary={`${watch('landArea')} perches`} /></ListItem>
              </List>
            </CardContent></Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Card><CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><DescriptionIcon sx={{ mr: 1 }} />Uploaded Documents</Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                {requiredDocuments.map((doc) => (
                  <ListItem key={doc.id}>
                    <ListItemIcon>{uploadedFiles[doc.id] ? (<CheckCircleIcon color="success" />) : (<DescriptionIcon color="disabled" />)}</ListItemIcon>
                    <ListItemText primary={doc.name} secondary={uploadedFiles[doc.id] ? uploadedFiles[doc.id].name : 'Not uploaded'} />
                  </ListItem>
                ))}
              </List>
            </CardContent></Card>
          </Grid>
        </Grid>
        <Alert severity="warning" sx={{ mt: 3 }}>By submitting, you confirm information is accurate and documents are authentic.</Alert>
      </Box>
    );
  };

  return (
    <MainLayout>
      <Box>
        <Typography variant="h4" gutterBottom>Register New Property</Typography>
        <Paper sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (<Step key={label}><StepLabel>{label}</StepLabel></Step>))}
          </Stepper>
          {renderStep()}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>Back</Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={loading} startIcon={loading && <CircularProgress size={20} />}>{loading ? 'Submitting...' : 'Submit Registration'}</Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>Next</Button>
            )}
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}


