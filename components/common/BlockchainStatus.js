import React from 'react';
import { Chip, Box, Typography, Tooltip } from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  Block as BlockIcon 
} from '@mui/icons-material';

const BlockchainStatus = ({ status, parcelId, compact = false }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'registered':
        return {
          color: 'success',
          icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
          label: 'On Blockchain',
          description: 'Successfully registered on Arbitrum Sepolia'
        };
      case 'verified':
        return {
          color: 'primary',
          icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
          label: 'Verified',
          description: 'Government verified on blockchain'
        };
      case 'pending':
        return {
          color: 'warning',
          icon: <PendingIcon sx={{ fontSize: 16 }} />,
          label: 'Pending',
          description: 'Blockchain registration in progress'
        };
      case 'failed':
        return {
          color: 'error', 
          icon: <ErrorIcon sx={{ fontSize: 16 }} />,
          label: 'Failed',
          description: 'Blockchain registration failed'
        };
      default:
        return {
          color: 'default',
          icon: <BlockIcon sx={{ fontSize: 16 }} />,
          label: 'Not on Chain',
          description: 'Not registered on blockchain'
        };
    }
  };

  const config = getStatusConfig(status);

  const statusChip = (
    <Chip
      icon={config.icon}
      label={config.label}
      color={config.color}
      variant={status === 'registered' || status === 'verified' ? 'filled' : 'outlined'}
      size={compact ? 'small' : 'medium'}
    />
  );

  if (compact) {
    return (
      <Tooltip title={config.description} arrow>
        {statusChip}
      </Tooltip>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        {statusChip}
        {parcelId && (
          <Typography variant="caption" color="text.secondary">
            ID: {parcelId}
          </Typography>
        )}
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
        {config.description}
      </Typography>
    </Box>
  );
};

export default BlockchainStatus;