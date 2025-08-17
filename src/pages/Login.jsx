import React, { useState } from 'react';
import users from '../data/users.json';
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
  Avatar,
  Fade,
  Zoom,
  CircularProgress,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Lock as LockIcon,
  AdminPanelSettings as GovernmentIcon,
  MyLocation as PandoraIcon,
  Home as HomeIcon,
  FiberManualRecord as StatusIcon,
} from '@mui/icons-material';
import { alpha, keyframes } from '@mui/material/styles';
// Floating animation keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Find user from imported users.json
      const role = tabValue === 0 ? 'citizen' : 'admin';
      const user = users.find(u => u.email === data.email && u.password === data.password && u.role === role);
      if (user) {
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify(user));
        enqueueSnackbar('Login successful!', { variant: 'success' });
        if (user.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        enqueueSnackbar('Invalid credentials or role.', { variant: 'error' });
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
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, transparent 70%)',
          animation: `${float} 6s ease-in-out infinite, ${pulse} 4s ease-in-out infinite`,
          filter: 'blur(1px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30, 144, 255, 0.3) 0%, transparent 70%)',
          animation: `${float} 8s ease-in-out infinite reverse, ${pulse} 6s ease-in-out infinite`,
          filter: 'blur(1px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '20%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75, 0, 130, 0.3) 0%, transparent 70%)',
          animation: `${float} 7s ease-in-out infinite, ${pulse} 5s ease-in-out infinite`,
          filter: 'blur(1px)',
        }}
      />

      <Container maxWidth="sm">
        <Zoom in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 2,
              background: alpha('#ffffff', 0.95),
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: 'linear-gradient(90deg, #7209b7, #1e90ff, #8a2be2)',
              },
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
              sx={{ 
                mb: 4,
                '& .MuiTab-root': {
                  borderRadius: 2,
                  mx: 0.5,
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, #7209b7, #1e90ff)',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(114, 9, 183, 0.3)',
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab 
                label="Citizen Login" 
                icon={<PersonIcon />} 
                iconPosition="start"
                sx={{ fontWeight: 600 }}
              />
              <Tab 
                label="Government Officer" 
                icon={<GovernmentIcon />} 
                iconPosition="start"
                sx={{ fontWeight: 600 }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: alpha('#f8f9fa', 0.8),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha('#f8f9fa', 1),
                      transform: 'translateY(-1px)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(114, 9, 183, 0.1)',
                    },
                  },
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
                        sx={{
                          transition: 'transform 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: alpha('#f8f9fa', 0.8),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha('#f8f9fa', 1),
                      transform: 'translateY(-1px)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(114, 9, 183, 0.1)',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ 
                  mt: 4, 
                  mb: 2, 
                  py: 2,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #7209b7, #1e90ff)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 8px 32px rgba(114, 9, 183, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #8a2be2, #4169e1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(114, 9, 183, 0.4)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #cccccc, #999999)',
                  },
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

              {tabValue === 0 && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    New user?{' '}
                    <span
                      style={{ color: '#7209b7', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => navigate('/signup')}
                    >
                      Sign up here
                    </span>
                  </Typography>
                </Box>
              )}
            </Box>

            {tabValue === 1 && (
              <Fade in timeout={600}>
                <Alert 
                  severity="info" 
                  icon={<GovernmentIcon />}
                  sx={{ 
                    mt: 3,
                    borderRadius: 3,
                    backgroundColor: alpha('#1e90ff', 0.1),
                    border: `1px solid ${alpha('#1e90ff', 0.2)}`,
                    '& .MuiAlert-message': {
                      fontWeight: 500,
                    },
                  }}
                >
                  <Typography variant="body2" fontWeight="600" gutterBottom>
                    Government Officer Access
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Use your official credentials provided by the Department of Land Registry.
                  </Typography>
                </Alert>
              </Fade>
            )}

            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                © 2024 Government of Sri Lanka. All rights reserved.
              </Typography>
            </Box>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default Login;
