'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, Typography, Button, Box, Paper, Chip, Avatar, List, ListItem, ListItemText, ListItemIcon, Divider, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { AddBox as AddBoxIcon, Verified as VerifiedIcon, Pending as PendingIcon, Search as SearchIcon, TrendingUp as TrendingUpIcon, Description as DescriptionIcon, LocationOn as LocationIcon, AccountBalance as AccountBalanceIcon } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/lib/api';
import MainLayout from '@/components/layouts/MainLayout';

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { getProperties, getTransactions } = useApi();
  const [properties, setProperties] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const [p, t] = await Promise.all([
          getProperties().catch((error) => {
            console.error('Error fetching properties:', error);
            return [];
          }),
          getTransactions().catch((error) => {
            console.error('Error fetching transactions:', error);
            return [];
          }),
        ]);
        setProperties(Array.isArray(p) ? p : []);
        setTransactions(Array.isArray(t) ? t : []);
      } catch (error) {
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };
    run();
    const intervalId = setInterval(run, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [getProperties, getTransactions]);

  if (!isAuthenticated) return (
    <MainLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    </MainLayout>
  );

  if (loading) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  const stats = [
    { label: 'Properties', value: properties.length, icon: <DescriptionIcon />, color: 'primary' },
    { label: 'Transactions', value: transactions.length, icon: <TrendingUpIcon />, color: 'success' },
  ];

  return (
    <MainLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome{user?.name ? `, ${user.name}` : ''}
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          {stats.map((s) => (
            <Grid xs={12} sm={6} md={3} key={s.label}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">{s.value}</Typography>
                      <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: `${s.color}.main`, width: 56, height: 56 }}>
                      {s.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Recent Properties</Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {(properties || []).slice(0, 5).map((p) => (
                  <ListItem key={p.id} secondaryAction={<Button onClick={() => router.push(`/properties/${p.id}`)}>View</Button>}>
                    <ListItemText
                      primary={p.title}
                      secondary={`Plot: ${p.plotNumber} • Area: ${p.landArea}`}
                    />
                  </ListItem>
                ))}
                {properties.length === 0 && (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">No properties found.</Typography>
                  </Box>
                )}
              </List>
            </Paper>
          </Grid>
          <Grid xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Divider sx={{ mb: 2 }} />
              <Button fullWidth variant="contained" startIcon={<AddBoxIcon />} sx={{ mb: 1 }} onClick={() => router.push('/land-registration')}>
                Register Property
              </Button>
              <Button fullWidth variant="outlined" startIcon={<SearchIcon />} onClick={() => router.push('/verify')}>
                Public Verification
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}


