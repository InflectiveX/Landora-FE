import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  IconButton,
  Zoom,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Badge as BadgeIcon,
  Email as EmailIcon,
  Visibility,
  VisibilityOff,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import { alpha, keyframes } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(5px) rotate(-1deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;



const SignUp = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const password = watch('password', '');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Here you would send data to backend or update users.json
      enqueueSnackbar('Sign up successful! You can now log in.', { variant: 'success' });
      navigate('/login', { replace: true });
    } catch (error) {
      enqueueSnackbar('Sign up failed. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
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
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              background: alpha('#ffffff', 0.95),
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
              position: 'relative',
              overflow: 'hidden',
              maxHeight: { xs: '95vh', sm: 700 },
              minHeight: { xs: 'auto', sm: 0 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
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
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <AccountBalanceIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" fontWeight="bold" color="primary.main" gutterBottom>
                Create Your Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Land Registry System - Government of Sri Lanka
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                {...register('name', { required: 'Full name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
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
                      <EmailIcon color="action" />
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
                label="NIC Number"
                margin="normal"
                {...register('nic', {
                  required: 'NIC number is required',
                  pattern: {
                    value: /^[0-9]{9}[vVxX]|[0-9]{12}$/,
                    message: 'Invalid NIC number',
                  },
                })}
                error={!!errors.nic}
                helperText={errors.nic?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon color="action" />
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

              <TextField
                fullWidth
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match',
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
                  mt: 3,
                  mb: 1.5,
                  py: 1.2,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #7209b7, #1e90ff)',
                  fontSize: '1.05rem',
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
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary" fontWeight="500">
                  OR
                </Typography>
              </Divider>
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <span
                  style={{
                    color: '#7209b7',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '1rem',
                  }}
                  onClick={() => navigate('/login')}
                >
                  Back to Login
                </span>
              </Box>
            </Box>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
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

export default SignUp;
