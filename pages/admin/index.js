'use client';
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TrendingUp as TrendingUpIcon, People as PeopleIcon, Verified as VerifiedIcon, Pending as PendingIcon, Cancel as CancelIcon, Analytics as AnalyticsIcon, Security as SecurityIcon, Refresh as RefreshIcon, Download as DownloadIcon } from '@mui/icons-material';
import MainLayout from '@/components/layouts/MainLayout';
import apiClient from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { title: 'Total Registrations', value: 0, change: '', changeType: 'increase', icon: <AnalyticsIcon />, color: 'primary' },
    { title: 'Verified Properties', value: 0, change: '', changeType: 'increase', icon: <VerifiedIcon />, color: 'success' },
    { title: 'Pending Verification', value: 0, change: '', changeType: 'increase', icon: <PendingIcon />, color: 'warning' },
    { title: 'Rejected Applications', value: 0, change: '', changeType: 'decrease', icon: <CancelIcon />, color: 'error' },
  ]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const properties = await apiClient.property.getDetails().catch(() => []);
        const list = Array.isArray(properties) ? properties : [];
        const total = list.length;
        const verified = list.filter(p => (p.status || '').toLowerCase() === 'verified').length;
        const pending = list.filter(p => (p.status || '').toLowerCase() === 'pending' || (p.status || '').toLowerCase() === 'under_review').length;
        const rejected = list.filter(p => (p.status || '').toLowerCase() === 'rejected').length;
        if (!mounted) return;
        setStats([
          { title: 'Total Registrations', value: total, change: '', changeType: 'increase', icon: <AnalyticsIcon />, color: 'primary' },
          { title: 'Verified Properties', value: verified, change: '', changeType: 'increase', icon: <VerifiedIcon />, color: 'success' },
          { title: 'Pending Verification', value: pending, change: '', changeType: 'increase', icon: <PendingIcon />, color: 'warning' },
          { title: 'Rejected Applications', value: rejected, change: '', changeType: 'decrease', icon: <CancelIcon />, color: 'error' },
        ]);
      } catch {
        if (!mounted) return;
      }
    })();
    return () => { mounted = false; };
  }, []);

  const recentActivities = [
    { id: 1, action: 'Property Verified', property: 'COL-2024-001', officer: 'Sarah Johnson', timestamp: '2 hours ago', type: 'verification' },
    { id: 2, action: 'Registration Submitted', property: 'KAN-2024-045', officer: 'System', timestamp: '3 hours ago', type: 'submission' },
    { id: 3, action: 'Property Transferred', property: 'GAL-2024-022', officer: 'Michael Brown', timestamp: '5 hours ago', type: 'transfer' },
  ];

  return (
    <MainLayout>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">Administrative Dashboard</Typography>
          <Box>
            <Button color="primary" startIcon={<RefreshIcon />}>Refresh</Button>
            <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ ml: 1 }}>Export Report</Button>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((s, i) => (
            <Grid xs={12} sm={6} md={3} key={i}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">{s.value}</Typography>
                      <Typography variant="body2" color="text.secondary">{s.title}</Typography>
                      {s.change !== '' && (<Typography variant="body2" color={s.changeType === 'increase' ? 'success.main' : 'error.main'} sx={{ mt: 0.5 }}>{s.change} from last month</Typography>)}
                    </Box>
                    <Avatar sx={{ bgcolor: `${s.color}.main`, width: 56, height: 56 }}>{s.icon}</Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Recent Activities</Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {recentActivities.map((a, i) => (
                  <div key={a.id}>
                    <ListItem>
                      <ListItemAvatar><Avatar sx={{ bgcolor: 'background.paper' }}>{a.type === 'verification' ? <VerifiedIcon color="success"/> : a.type === 'transfer' ? <TrendingUpIcon color="primary"/> : <PendingIcon color="warning"/>}</Avatar></ListItemAvatar>
                      <ListItemText primary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Typography variant="body1">{a.action}</Typography><Typography variant="caption" sx={{ opacity: 0.8 }}>{a.property}</Typography></Box>} secondary={`By ${a.officer} • ${a.timestamp}`} />
                    </ListItem>
                    {i < recentActivities.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}><SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />System Status</Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                {[{ metric: 'Average Verification Time', value: '2.3 days', status: 'good' }, { metric: 'System Uptime', value: '99.9%', status: 'excellent' }, { metric: 'Blockchain Sync Status', value: 'Synchronized', status: 'good' }].map((m, i) => (
                  <ListItem key={i}><ListItemText primary={m.metric} secondary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}><Typography variant="body2">{m.value}</Typography></Box>} /></ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}


