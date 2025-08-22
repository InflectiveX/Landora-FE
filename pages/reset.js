'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Paper, Box, Typography, TextField, Button, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { AccountBalance as AccountBalanceIcon, Visibility, VisibilityOff, Lock as LockIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { apiClient } from '@/lib/api';

export default function ResetPassword() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  useEffect(() => {
    if (router.query.token) {
      setToken(router.query.token);
    }
  }, [router.query.token]);

  const onSubmit = async (data) => {
    if (!token) {
      enqueueSnackbar('Invalid reset link', { variant: 'error' });
      return;
    }

    if (data.password !== data.confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    }

    setLoading(true);
    try {
      await apiClient.auth.resetPassword(token, data.password);
      enqueueSnackbar('Password updated successfully! You can now log in with your new password', { variant: 'success' });
      router.push('/login');
    } catch (e) {
      enqueueSnackbar(e.message || 'Failed to reset password', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6, background: 'linear-gradient(135deg, #eef2f7 0%, #e8f0ff 100%)' }}>
        <Container maxWidth="sm">
          <Paper elevation={12} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <AccountBalanceIcon sx={{ fontSize: 40, color: 'error.main', mb: 2 }} />
            <Typography variant="h5" color="error" gutterBottom>Invalid Reset Link</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              The password reset link is invalid or has expired. Please request a new one.
            </Typography>
            <Button variant="contained" onClick={() => router.push('/forgot')}>
              Request New Reset Link
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6, background: 'linear-gradient(135deg, #eef2f7 0%, #e8f0ff 100%)' }}>
      <Container maxWidth="sm">
        <Paper elevation={12} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <AccountBalanceIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" fontWeight="bold">Reset Password</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Enter your new password below
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
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
                    <IconButton onClick={() => setShowPassword((v) => !v)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
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
                    <IconButton onClick={() => setShowConfirmPassword((v) => !v)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 3 }}
            />

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              disabled={loading} 
              startIcon={loading ? <CircularProgress size={18} /> : null} 
              sx={{ py: 1.25 }}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
