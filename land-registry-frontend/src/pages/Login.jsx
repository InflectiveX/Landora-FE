import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Lock as LockIcon,
  // Government as GovernmentIcon, // This icon does not exist in MUI
  AdminPanelSettings as GovernmentIcon, // Use AdminPanelSettings as a placeholder
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    reset();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Mock authentication - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser = {
        id: 1,
        name: tabValue === 0 ? 'John Doe' : 'Admin User',
        email: data.email,
        role: tabValue === 0 ? 'citizen' : 'admin',
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(mockUser));

      enqueueSnackbar('Login successful!', { variant: 'success' });
      // Redirect based on role
      if (mockUser.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      enqueueSnackbar('Login failed. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEnicLogin = () => {
    enqueueSnackbar('eNIC integration coming soon', { variant: 'info' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
        background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <AccountBalanceIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
              Land Registry System
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Government of Sri Lanka
            </Typography>
          </Box>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab 
              label="Citizen Login" 
              icon={<PersonIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="Government Officer" 
              icon={<GovernmentIcon />} 
              iconPosition="start"
            />
          </Tabs>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              margin="normal"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            {tabValue === 0 && (
              <>
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={handleEnicLogin}
                  sx={{ py: 1.5 }}
                >
                  Login with Sri Lankan eNIC
                </Button>
              </>
            )}
          </Box>

          {tabValue === 1 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Government officers should use their official credentials provided by the Department of Land Registry.
            </Alert>
          )}

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © 2024 Government of Sri Lanka. All rights reserved.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
