import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Chip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationIcon from '@mui/icons-material/LocationOn';

// Mock data (replace with real data fetching later)
const allProperties = [
  {
    id: 1,
    title: 'Residential Plot - Colombo 07',
    status: 'verified',
    registrationDate: '2024-08-10',
    area: '10 perches',
  },
  {
    id: 2,
    title: 'Commercial Building - Kandy',
    status: 'verified',
    registrationDate: '2024-08-05',
    area: '25 perches',
  },
  {
    id: 3,
    title: 'Agricultural Land - Galle',
    status: 'pending',
    registrationDate: '2024-08-15',
    area: '2 acres',
  },
];

const getStatusChip = (status) => {
  const statusConfig = {
    verified: { label: 'Verified', color: 'success' },
    pending: { label: 'Pending', color: 'warning' },
    rejected: { label: 'Rejected', color: 'error' },
  };
  return statusConfig[status] || { label: status, color: 'default' };
};

const AllProperties = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Properties
      </Typography>
      <Card>
        <CardContent>
          <List>
            {allProperties.map((property, index) => (
              <React.Fragment key={property.id}>
                <ListItem
                  button
                  onClick={() => navigate(`/property/${property.id}`)}
                  sx={{ borderRadius: 1 }}
                >
                  <LocationIcon color="primary" sx={{ mr: 2 }} />
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {property.title}
                        </Typography>
                        <Chip
                          size="small"
                          label={getStatusChip(property.status).label}
                          color={getStatusChip(property.status).color}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" component="span">
                          Area: {property.area} • Registered: {property.registrationDate}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < allProperties.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AllProperties;
