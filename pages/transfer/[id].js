'use client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Paper, Typography, Stepper, Step, StepLabel, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import MainLayout from '@/components/layouts/MainLayout';
import FileUpload from '@/components/common/FileUpload';
import apiClient from '@/lib/api';
import { useSnackbar } from 'notistack';
import { apiClient } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const steps = ['Buyer Information', 'Transfer Documents', 'Verification', 'Summary'];

export default function PropertyTransfer() {
  const router = useRouter();
  const { id } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [docs, setDocs] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const schema = yup.object({
    buyerName: yup.string().required('Required'),
    buyerNIC: yup.string().required('Required'),
    buyerEmail: yup.string().email('Invalid email').required('Required'),
    buyerPhone: yup.string().required('Required'),
    buyerAddress: yup.string().required('Required'),
  });
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const handleNext = () => setActiveStep((s) => s + 1);
  const handleBack = () => setActiveStep((s) => s - 1);
  const onFilesChange = (files, key) => setDocs((d) => ({ ...d, [key]: files && files[0]?.file }));

  const onSubmit = async (data) => {
    setConfirmOpen(false);
    setLoading(true);
    try {
      const body = {
        propertyId: id,
        buyerName: data.buyerName,
        buyerNIC: data.buyerNIC,
        buyerEmail: data.buyerEmail,
        buyerPhone: data.buyerPhone,
        buyerAddress: data.buyerAddress,
      };
      await apiClient.transfer.register(body);
      const docKeys = Object.keys(docs);
      for (const key of docKeys) {
        const file = docs[key];
        if (!file) continue;
        const fd = new FormData();
        fd.append('file', file);
        fd.append('documentType', key);
        fd.append('transferFor', String(id));
        await apiClient.document.register(fd);
      }
      enqueueSnackbar('Transfer submitted successfully!', { variant: 'success' });
      router.push(`/properties/${id}`);
    } catch {
      enqueueSnackbar('Transfer failed. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    if (activeStep === 0) {
      return (
        <Grid container spacing={2}>
          <Grid xs={12} md={6}><TextField fullWidth label="Buyer Full Name" {...register('buyerName', { required: 'Required' })} error={!!errors.buyerName} helperText={errors.buyerName?.message} /></Grid>
          <Grid xs={12} md={6}><TextField fullWidth label="Buyer NIC" {...register('buyerNIC', { required: 'Required' })} error={!!errors.buyerNIC} helperText={errors.buyerNIC?.message} /></Grid>
          <Grid xs={12} md={6}><TextField fullWidth type="email" label="Buyer Email" {...register('buyerEmail', { required: 'Required' })} error={!!errors.buyerEmail} helperText={errors.buyerEmail?.message} /></Grid>
          <Grid xs={12} md={6}><TextField fullWidth label="Buyer Phone" {...register('buyerPhone', { required: 'Required' })} error={!!errors.buyerPhone} helperText={errors.buyerPhone?.message} /></Grid>
          <Grid xs={12}><TextField fullWidth label="Buyer Address" multiline rows={2} {...register('buyerAddress', { required: 'Required' })} error={!!errors.buyerAddress} helperText={errors.buyerAddress?.message} /></Grid>
        </Grid>
      );
    }
    if (activeStep === 1) {
      return (
        <Grid container spacing={2}>
          <Grid xs={12} md={6}><FileUpload label="Sale Agreement" onFilesChange={(f) => onFilesChange(f, 'saleAgreement')} maxFiles={1} /></Grid>
          <Grid xs={12} md={6}><FileUpload label="Affidavit" onFilesChange={(f) => onFilesChange(f, 'affidavit')} maxFiles={1} /></Grid>
          <Grid xs={12} md={6}><FileUpload label="Consent Letters" onFilesChange={(f) => onFilesChange(f, 'consentLetters')} maxFiles={2} /></Grid>
        </Grid>
      );
    }
    if (activeStep === 2) {
      return (
        <Box>
          <Typography variant="body1">Please verify the buyer information and the uploaded documents are correct. You may be required to visit the land registry office for in-person verification.</Typography>
        </Box>
      );
    }
    return (
      <Box>
        <Typography variant="subtitle1" gutterBottom>Summary</Typography>
        <Typography variant="body2">Buyer: {watch('buyerName')} ({watch('buyerNIC')})</Typography>
        <Typography variant="body2">Email: {watch('buyerEmail')} • Phone: {watch('buyerPhone')}</Typography>
        <Typography variant="body2">Address: {watch('buyerAddress')}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>Documents: {[ 'saleAgreement','affidavit','consentLetters' ].filter(k => docs[k]).length} attached</Typography>
      </Box>
    );
  };

  return (
    <MainLayout>
      <Box>
        <Typography variant="h4" gutterBottom>Transfer Property #{id}</Typography>
        <Paper sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>{steps.map((s) => (<Step key={s}><StepLabel>{s}</StepLabel></Step>))}</Stepper>
          {renderStep()}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>Back</Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={() => setConfirmOpen(true)} disabled={loading} startIcon={loading && <CircularProgress size={20} />}>{loading ? 'Submitting...' : 'Submit Transfer'}</Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>Next</Button>
            )}
          </Box>
        </Paper>
      </Box>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Transfer</DialogTitle>
        <DialogContent>Are you sure you want to submit this property transfer?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>Confirm & Submit</Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}


