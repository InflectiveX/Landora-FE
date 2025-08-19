'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Paper, Box, Typography, TextField, Button, Tab, Tabs, Alert, InputAdornment, IconButton, Fade, CircularProgress } from '@mui/material';
import { AccountBalance as AccountBalanceIcon, Visibility, VisibilityOff, Person as PersonIcon, Lock as LockIcon, AdminPanelSettings as GovernmentIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';

export default function Login() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await apiClient.auth.login({ email: data.email, password: data.password });
      // Handle various backend response shapes
      let token;
      if (res && typeof res === 'object' && res.token) token = res.token;
      else if (typeof res === 'string') token = res;
      else if (res && res.jwt) token = res.jwt;
      if (!token) throw new Error('No token returned from server');

      // Try to fetch user info from protected endpoint
      let userInfo = null;
      try {
        const protectedRes = await apiClient.auth.protected();
        // Accept either object with user or just object representing user
        userInfo = protectedRes?.user || protectedRes || null;
      } catch {
        // Fallback minimal user
        userInfo = { name: data.email.split('@')[0], email: data.email, role: tabValue === 0 ? 'citizen' : 'officer' };
      }
      login(userInfo, token);
      enqueueSnackbar('Logged in successfully', { variant: 'success' });
      router.push('/dashboard');
    } catch (e) {
      enqueueSnackbar(e.message || 'Login failed', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6, background: 'linear-gradient(135deg, #eef2f7 0%, #e8f0ff 100%)' }}>
      <Container maxWidth="sm">
        <Fade in timeout={600}>
          <Paper elevation={12} sx={{ p: 4, borderRadius: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <AccountBalanceIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">Sign in</Typography>
              <Typography variant="body2" color="text.secondary">Access your Land Registry account</Typography>
            </Box>

            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 2 }}>
              <Tab icon={<PersonIcon />} label="Citizen" iconPosition="start" />
              <Tab icon={<GovernmentIcon />} label="Officer" iconPosition="start" />
            </Tabs>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
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
                sx={{ mb: 3 }}
              />

              <Button type="submit" fullWidth variant="contained" disabled={loading} startIcon={loading ? <CircularProgress size={18} /> : null} sx={{ py: 1.25 }}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}


