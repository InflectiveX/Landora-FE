'use client';
import { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Card, CardContent, Chip, List, ListItem, ListItemText, ListItemIcon, Divider, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Search as SearchIcon, Verified as VerifiedIcon, LocationOn as LocationIcon, Person as PersonIcon, Security as SecurityIcon, Description as DescriptionIcon, QrCode as QrCodeIcon, Download as DownloadIcon, Visibility as VisibilityIcon, SwapHoriz as SwapHorizIcon, AccountBalance as AccountBalanceIcon, Schedule as ScheduleIcon } from '@mui/icons-material';
import MainLayout from '@/components/layouts/MainLayout';
import apiClient from '@/lib/api';


const getStatusColor = (status) => ({ verified: 'success', pending: 'warning', rejected: 'error' }[status] || 'default');

export default function AdminPropertySearch() {
  const [searchResult, setSearchResult] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const q = searchQuery.trim();
      if (!q) {
        setSearchResult(null);
        return;
      }
      const properties = await apiClient.property.getDetails();
      const normalize = (v) => (v == null ? '' : String(v)).toLowerCase();
      const found = (Array.isArray(properties) ? properties : []).find((p) => {
        const byId = String(p?.id) === q;
        const qq = q.toLowerCase();
        const byPlot = normalize(p?.plotNumber).includes(qq);
        const byTitle = normalize(p?.title).includes(qq) || normalize(p?.name).includes(qq);
        const byAddress = normalize(p?.address).includes(qq) || normalize(p?.location).includes(qq);
        return byId || byPlot || byTitle || byAddress;
      });
      if (!found) {
        setSearchResult(null);
        return;
      }

      let documents = [];
      let nft = null;
      try { documents = await apiClient.document.getByLandId(found.id); } catch {}
      try { nft = await apiClient.nft.getByLandId(found.id); } catch {}

      setSearchResult({
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
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDocument = (doc) => { setSelectedDocument(doc); setOpenDialog(true); };

  return (
    <MainLayout>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 2, md: 6 } }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: { xs: 2, md: 5 }, borderRadius: 5, mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h4" fontWeight={700} color="primary.main">Admin Property Search</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" mb={3}>Search and view full details by plot number, NFT token ID, or address.</Typography>
            <Box component="form" onSubmit={onSearch} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <TextField label="Search Property" placeholder="e.g. COL-07-2024-001" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ flex: 1 }} />
              <Button variant="contained" type="submit" startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />} disabled={loading} sx={{ height: 56, fontWeight: 600, borderRadius: 2, minWidth: 120 }}>{loading ? 'Searching...' : 'Search'}</Button>
            </Box>
          </Paper>

          {searchResult && (
            <Paper elevation={2} sx={{ p: { xs: 2, md: 5 }, borderRadius: 5, mb: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                <Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>{searchResult.title}</Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>Plot Number: {searchResult.plotNumber}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label={searchResult.status.toUpperCase()} color={getStatusColor(searchResult.status)} icon={<VerifiedIcon />} sx={{ fontWeight: 600, px: 2, py: 1 }} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, gap: 2, mt: { xs: 2, md: 0 } }}>
                  <Tooltip title="Transfer Property"><Button variant="contained" color="secondary" startIcon={<SwapHorizIcon />} sx={{ fontWeight: 600, borderRadius: 2 }}>Transfer</Button></Tooltip>
                  <Tooltip title="Show QR Code"><Button variant="outlined" startIcon={<QrCodeIcon />} sx={{ fontWeight: 600, borderRadius: 2 }}>QR Code</Button></Tooltip>
                </Box>
              </Box>
              <Grid container spacing={4}>
                <Grid xs={12} md={8}>
                  <Grid container spacing={3}>
                    <Grid xs={12}><Card elevation={0}><CardContent><Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><LocationIcon sx={{ mr: 1, color: 'primary.main' }} />Location Details</Typography><Divider sx={{ mb: 2 }} /><Grid container spacing={2}><Grid xs={12} md={6}><List dense><ListItem><ListItemText primary="Address" secondary={searchResult.location.address} /></ListItem><ListItem><ListItemText primary="District" secondary={searchResult.location.district} /></ListItem><ListItem><ListItemText primary="Province" secondary={searchResult.location.province} /></ListItem></List></Grid><Grid xs={12} md={6}><List dense><ListItem><ListItemText primary="Coordinates" secondary={searchResult.location.coordinates} /></ListItem><ListItem><ListItemText primary="Land Area" secondary={searchResult.details.landArea} /></ListItem><ListItem><ListItemText primary="Property Type" secondary={searchResult.details.propertyType} /></ListItem></List></Grid></Grid></CardContent></Card></Grid>
                    <Grid xs={12}><Card elevation={0}><CardContent><Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><PersonIcon sx={{ mr: 1, color: 'primary.main' }} />Owner Information</Typography><Divider sx={{ mb: 2 }} /><Grid container spacing={2}><Grid xs={12} md={4}><Typography variant="subtitle2" color="text.secondary">Full Name</Typography><Typography variant="body1" fontWeight={600}>{searchResult.owner.name}</Typography></Grid><Grid xs={12} md={4}><Typography variant="subtitle2" color="text.secondary">NIC Number</Typography><Typography variant="body1" fontWeight={600}>{searchResult.owner.nic}</Typography></Grid><Grid xs={12} md={4}><Typography variant="subtitle2" color="text.secondary">Email</Typography><Typography variant="body1" fontWeight={600}>{searchResult.owner.email}</Typography></Grid></Grid></CardContent></Card></Grid>
                    <Grid xs={12}><Card elevation={0}><CardContent><Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />Property Documents</Typography><Divider sx={{ mb: 2 }} /><List>{searchResult.documents.map((doc, i) => (<div key={doc.id}><ListItem><ListItemIcon><DescriptionIcon color="primary" /></ListItemIcon><ListItemText primary={doc.name} secondary={`${doc.type} • ${doc.size} • IPFS: ${doc.ipfsHash}`} /><Box><Tooltip title="View Document"><IconButton onClick={() => handleViewDocument(doc)}><VisibilityIcon /></IconButton></Tooltip><Tooltip title="Download"><IconButton><DownloadIcon /></IconButton></Tooltip></Box></ListItem>{i < searchResult.documents.length - 1 && <Divider />}</div>))}</List></CardContent></Card></Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} md={4}>
                  <Grid container spacing={3}>
                    <Grid xs={12}><Card elevation={0}><CardContent><Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />Blockchain Information</Typography><Divider sx={{ mb: 2 }} /><List dense><ListItem><ListItemText primary="NFT Token ID" secondary={searchResult.nftTokenId} /></ListItem><ListItem><ListItemText primary="Transaction Hash" secondary={searchResult.blockchainTxHash} /></ListItem><ListItem><ListItemText primary="Network" secondary="Polygon" /></ListItem></List><Button fullWidth variant="outlined" startIcon={<AccountBalanceIcon />} sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}>View on Blockchain</Button></CardContent></Card></Grid>
                    <Grid xs={12}><Card elevation={0}><CardContent><Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />Registration Timeline</Typography><Divider sx={{ mb: 2 }} /><List dense>{searchResult.history.map((e, i) => (<ListItem key={i}><ListItemText primary={e.action} secondary={`${e.date} • ${e.actor}`} /></ListItem>))}</List></CardContent></Card></Grid>
                    <Grid xs={12}><Card elevation={0} sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}><CardContent><Typography variant="h6" fontWeight={700} gutterBottom>Estimated Value</Typography><Typography variant="h4" fontWeight="bold">{searchResult.details.estimatedValue}</Typography><Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>Based on market rates</Typography></CardContent></Card></Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>{selectedDocument?.name}</DialogTitle>
                <DialogContent>
                  <Box sx={{ textAlign: 'center', py: 4 }}><DescriptionIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} /><Typography variant="body1" gutterBottom>Document Viewer</Typography><Typography variant="body2" color="text.secondary">IPFS Hash: {selectedDocument?.ipfsHash}</Typography><Typography variant="body2" color="text.secondary">File Size: {selectedDocument?.size}</Typography></Box>
                </DialogContent>
                <DialogActions><Button onClick={() => setOpenDialog(false)} sx={{ fontWeight: 600 }}>Close</Button><Button variant="contained" startIcon={<DownloadIcon />} sx={{ fontWeight: 600 }}>Download</Button></DialogActions>
              </Dialog>
            </Paper>
          )}

          {searchResult === null && !loading && (
            <Paper elevation={1} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
              <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom fontWeight={700}>No results found</Typography>
              <Typography variant="body2" color="text.secondary">Check search terms and try again.</Typography>
            </Paper>
          )}
        </Container>
      </Box>
    </MainLayout>
  );
}


