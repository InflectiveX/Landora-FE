'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, List, ListItemText, Chip, Typography, Paper, CircularProgress, ListItemButton } from '@mui/material';
import { useApi } from '@/lib/api';
import MainLayout from '@/components/layouts/MainLayout';

export default function AllProperties() {
  const router = useRouter();
  const { getProperties } = useApi();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties().catch((error) => {
          console.error('Error fetching properties:', error);
          return [];
        });
        setProperties(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Properties page error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
    const intervalId = setInterval(fetchProperties, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [getProperties]);

  const statusColors = { verified: 'success', pending: 'warning', rejected: 'error', under_review: 'info' };

  if (loading) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box>
        <Typography variant="h4" gutterBottom>All Properties</Typography>
        <Paper sx={{ mt: 2 }}>
          <List>
            {properties.map((p, idx) => {
              const title = p.title || p.address || `${p.district || 'Property'}`;
              const plotNumber = p.survey_number || p.plotNumber;
              const landArea = p.land_area || p.landArea;
              const registrationDate = p.registration_date || p.registrationDate;
              return (
                <ListItemButton key={p.id || idx} onClick={() => router.push(`/properties/${p.id}`)} divider={idx < properties.length - 1}>
                  <ListItemText
                    primary={title}
                    secondary={(
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">Plot: {plotNumber}</Typography>
                        <Typography variant="body2" color="text.secondary">Area: {landArea}</Typography>
                        <Typography variant="body2" color="text.secondary">Registered: {registrationDate ? new Date(registrationDate).toLocaleDateString() : '-'}</Typography>
                      </Box>
                    )}
                  />
                  <Chip label={(p.status || 'unknown').replace('_', ' ').toUpperCase()} color={statusColors[p.status] || 'default'} size="small" />
                </ListItemButton>
              );
            })}
          </List>
          {properties.length === 0 && (<Box sx={{ p: 4, textAlign: 'center' }}><Typography variant="body1" color="text.secondary">No properties found.</Typography></Box>)}
        </Paper>
      </Box>
    </MainLayout>
  );
}


