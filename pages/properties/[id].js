'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Chip, List, ListItem, ListItemText, Divider, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Description as DescriptionIcon, LocationOn as LocationIcon, QrCode as QrCodeIcon, Download as DownloadIcon, SwapHoriz as SwapHorizIcon } from '@mui/icons-material';
import MainLayout from '@/components/layouts/MainLayout';
import { useApi } from '@/lib/api';

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { getProperties } = useApi();
  const [property, setProperty] = useState(null);
  const [docDialog, setDocDialog] = useState(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const list = await getProperties();
        const found = (list || []).find((p) => String(p.id) === String(id)) || null;
        setProperty(found);
      } catch {}
    };
    load();
  }, [id, getProperties]);

  if (!property) {
    return (
      <MainLayout>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Loading property...</Typography>
        </Box>
      </MainLayout>
    );
  }

  const statusColor = { verified: 'success', pending: 'warning', rejected: 'error', under_review: 'info' }[property.status] || 'default';

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" gutterBottom>{property.title || 'Property'}</Typography>
            <Chip label={(property.status || '').toUpperCase()} color={statusColor} />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" color="secondary" startIcon={<SwapHorizIcon />} onClick={() => router.push(`/transfer/${id}`)}>Transfer Property</Button>
            <Button variant="outlined" startIcon={<QrCodeIcon />}>QR Code</Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <Card><CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><LocationIcon sx={{ mr: 1 }} />Location</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    <ListItem><ListItemText primary="Plot Number" secondary={property.plotNumber} /></ListItem>
                    <ListItem><ListItemText primary="District" secondary={property.district} /></ListItem>
                    <ListItem><ListItemText primary="Province" secondary={property.province} /></ListItem>
                    <ListItem><ListItemText primary="Address" secondary={property.address} /></ListItem>
                  </List>
                </CardContent></Card>
              </Grid>
              <Grid xs={12}>
                <Card><CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><DescriptionIcon sx={{ mr: 1 }} />Documents</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    {(property.documents || []).map((d, i) => (
                      <ListItem key={i} secondaryAction={
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton onClick={() => setDocDialog(d)}><DescriptionIcon /></IconButton>
                          <IconButton><DownloadIcon /></IconButton>
                        </Box>
                      }>
                        <ListItemText primary={d.name || `Document ${i+1}`} secondary={d.type || 'File'} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent></Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Details</Typography>
              <Divider sx={{ mb: 1 }} />
              <List dense>
                <ListItem><ListItemText primary="Land Area" secondary={property.landArea} /></ListItem>
                <ListItem><ListItemText primary="Type" secondary={property.propertyType} /></ListItem>
                <ListItem><ListItemText primary="Owner NIC" secondary={property.ownerNIC} /></ListItem>
                {property.registrationDate && <ListItem><ListItemText primary="Registered" secondary={new Date(property.registrationDate).toLocaleDateString()} /></ListItem>}
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Dialog open={!!docDialog} onClose={() => setDocDialog(null)} maxWidth="md" fullWidth>
          <DialogTitle>Document Viewer</DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <DescriptionIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="body1">{docDialog?.name || 'Document'}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDocDialog(null)}>Close</Button>
            <Button variant="contained" startIcon={<DownloadIcon />}>Download</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
}


