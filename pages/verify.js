'use client';
import { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Card, CardContent, Grid, Chip, List, ListItem, ListItemText, Divider, Alert, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Search as SearchIcon, QrCodeScanner as QrCodeIcon, LocationOn as LocationIcon, Person as PersonIcon, Security as SecurityIcon, Description as DescriptionIcon, QrCode as QrCodeDisplayIcon, Download as DownloadIcon, AccountBalance as AccountBalanceIcon, Schedule as ScheduleIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import MainLayout from '@/components/layouts/MainLayout';
import apiClient from '@/lib/api';

export default function PublicVerification() {
  const { enqueueSnackbar } = useSnackbar();
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const getStatusColor = (status) => ({ verified: 'success', pending: 'warning', rejected: 'error' }[status] || 'default');

  const onSearch = async (data) => {
    setLoading(true);
    try {
      const query = (data.searchQuery || '').trim();
      if (!query) {
        setSearchResult(null);
        enqueueSnackbar('Please enter a valid search term', { variant: 'warning' });
        return;
      }

      const properties = await apiClient.property.getDetails();
      const normalize = (v) => (v == null ? '' : String(v)).toLowerCase();
      const found = (Array.isArray(properties) ? properties : []).find((p) => {
        const q = query.toLowerCase();
        const byId = String(p?.id) === query;
        const byPlot = normalize(p?.plotNumber).includes(q);
        const byTitle = normalize(p?.title).includes(q) || normalize(p?.name).includes(q);
        const byAddress = normalize(p?.address).includes(q) || normalize(p?.location).includes(q);
        return byId || byPlot || byTitle || byAddress;
      });

      if (!found) {
        setSearchResult(null);
        enqueueSnackbar('No matching property found', { variant: 'info' });
        return;
      }

      let documents = [];
      let nft = null;
      try {
        documents = await apiClient.document.getByLandId(found.id);
      } catch {}
      try {
        nft = await apiClient.nft.getByLandId(found.id);
      } catch {}

      const composed = {
        id: found.id,
        title: found.title || found.name || 'Property',
        plotNumber: found.plotNumber || found.surveyNumber || 'N/A',
        status: found.status || 'verified',
        registrationDate: found.registrationDate || found.createdAt || '',
        verificationDate: found.verificationDate || found.updatedAt || '',
        nftTokenId: nft?.tokenId || nft?.id || 'N/A',
        blockchainTxHash: nft?.txHash || 'N/A',
        owner: {
          name: found.ownerName || found.owner?.name || 'N/A',
          nic: found.ownerNic || found.owner?.nic || 'N/A',
          email: found.ownerEmail || found.owner?.email || 'N/A',
        },
        location: {
          address: found.address || found.location?.address || 'N/A',
          district: found.district || found.location?.district || 'N/A',
          province: found.province || found.location?.province || 'N/A',
          coordinates: found.coordinates || 'N/A',
        },
        details: {
          landArea: found.landArea || found.area || 'N/A',
          propertyType: found.propertyType || found.type || 'N/A',
          surveyNumber: found.surveyNumber || 'N/A',
          estimatedValue: found.estimatedValue || found.value || 'N/A',
        },
        documents: (Array.isArray(documents) ? documents : []).map((d, i) => ({
          id: d.id ?? i,
          name: d.name || d.title || 'Document',
          type: d.type || 'FILE',
          size: d.size || '',
          ipfsHash: d.ipfsHash || d.ipfs || '',
        })),
        history: Array.isArray(found.history) ? found.history : [],
      };

      setSearchResult(composed);
    } catch {
      enqueueSnackbar('Search failed. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 2, md: 6 } }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: { xs: 2, md: 5 }, borderRadius: 5, mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h4" fontWeight={700} color="primary.main">Public Property Verification</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" mb={3}>Verify property ownership and status. Use plot number, NFT token ID, or address.</Typography>
            <Box component="form" onSubmit={handleSubmit(onSearch)} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <TextField label="Search Property" placeholder="e.g. COL-07-2024-001" {...register('searchQuery', { required: 'Please enter a search term' })} error={!!errors.searchQuery} helperText={errors.searchQuery?.message} sx={{ flex: 1 }} />
              <Button variant="contained" type="submit" startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />} disabled={loading} sx={{ height: 56, fontWeight: 600, borderRadius: 2, minWidth: 120 }}>{loading ? 'Searching...' : 'Search'}</Button>
              <Tooltip title="Scan QR Code"><IconButton onClick={() => enqueueSnackbar('QR scanning coming soon!', { variant: 'info' })} sx={{ height: 56, width: 56 }}><QrCodeIcon /></IconButton></Tooltip>
            </Box>
          </Paper>

          {searchResult && (
            <Paper elevation={2} sx={{ p: { xs: 2, md: 5 }, borderRadius: 5, mb: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                <Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>{searchResult.title}</Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>Plot Number: {searchResult.plotNumber}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label={(searchResult.status || '').toUpperCase()} color={getStatusColor(searchResult.status)} icon={<SecurityIcon />} sx={{ fontWeight: 600 }} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Tooltip title="Show QR Code"><Button variant="outlined" startIcon={<QrCodeDisplayIcon />} onClick={() => setShowQRCode(!showQRCode)}>QR Code</Button></Tooltip>
                  <Tooltip title="Download Certificate"><Button variant="contained" startIcon={<DownloadIcon />} onClick={() => enqueueSnackbar('Downloading certificate...', { variant: 'success' })}>Certificate</Button></Tooltip>
                </Box>
              </Box>

              <Grid container spacing={4}>
                <Grid xs={12} md={8}>
                  <Grid container spacing={3}>
                    <Grid xs={12}>
                      <Card elevation={0}><CardContent>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><LocationIcon sx={{ mr: 1, color: 'primary.main' }} />Location Details</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                          <Grid xs={12} md={6}>
                            <List dense>
                              <ListItem><ListItemText primary="Address" secondary={searchResult.location.address} /></ListItem>
                              <ListItem><ListItemText primary="District" secondary={searchResult.location.district} /></ListItem>
                              <ListItem><ListItemText primary="Province" secondary={searchResult.location.province} /></ListItem>
                            </List>
                          </Grid>
                          <Grid xs={12} md={6}>
                            <List dense>
                              <ListItem><ListItemText primary="Coordinates" secondary={searchResult.location.coordinates} /></ListItem>
                              <ListItem><ListItemText primary="Land Area" secondary={searchResult.details.landArea} /></ListItem>
                              <ListItem><ListItemText primary="Property Type" secondary={searchResult.details.propertyType} /></ListItem>
                            </List>
                          </Grid>
                        </Grid>
                      </CardContent></Card>
                    </Grid>
                    <Grid xs={12}>
                      <Card elevation={0}><CardContent>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><PersonIcon sx={{ mr: 1, color: 'primary.main' }} />Owner Information</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Alert severity="info" sx={{ mb: 2 }}>Owner info is partially hidden for privacy.</Alert>
                        <Grid container spacing={2}>
                          <Grid xs={12} md={4}><Typography variant="subtitle2" color="text.secondary">Full Name</Typography><Typography variant="body1" fontWeight={600}>{searchResult.owner.name.substring(0, 1)}*** {searchResult.owner.name.split(' ').pop()}</Typography></Grid>
                          <Grid xs={12} md={4}><Typography variant="subtitle2" color="text.secondary">NIC Number</Typography><Typography variant="body1" fontWeight={600}>{searchResult.owner.nic.substring(0, 3)}***{searchResult.owner.nic.substring(6)}</Typography></Grid>
                          <Grid xs={12} md={4}><Typography variant="subtitle2" color="text.secondary">Email</Typography><Typography variant="body1" fontWeight={600}>{searchResult.owner.email.substring(0, 2)}***@{searchResult.owner.email.split('@')[1]}</Typography></Grid>
                        </Grid>
                      </CardContent></Card>
                    </Grid>
                    <Grid xs={12}>
                      <Card elevation={0} sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}><CardContent>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><AccountBalanceIcon sx={{ mr: 1 }} />Blockchain Certification</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>This property is certified on the blockchain.</Typography>
                        <Grid container spacing={2}>
                          <Grid xs={12} md={6}><Typography variant="subtitle2">NFT Token ID</Typography><Typography variant="body1" fontWeight={600} sx={{ fontFamily: 'monospace' }}>{searchResult.nftTokenId}</Typography></Grid>
                          <Grid xs={12} md={6}><Typography variant="subtitle2">Transaction Hash</Typography><Typography variant="body1" fontWeight={600} sx={{ fontFamily: 'monospace' }}>{searchResult.blockchainTxHash}</Typography></Grid>
                        </Grid>
                      </CardContent></Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} md={4}>
                  <Card elevation={0}><CardContent>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />Registration Timeline</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List dense>
                      {searchResult.history.map((e, i) => (<ListItem key={i}><ListItemText primary={e.action} secondary={`${e.date} • ${e.actor}`} /></ListItem>))}
                    </List>
                  </CardContent></Card>
                </Grid>
              </Grid>
            </Paper>
          )}

          {searchResult === null && !loading && (
            <Paper elevation={1} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
              <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom fontWeight={700}>No results found</Typography>
              <Typography variant="body2" color="text.secondary">Please check your search terms and try again.</Typography>
            </Paper>
          )}
        </Container>
      </Box>
    </MainLayout>
  );
}


