'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Paper, Box, Typography, TextField, Button, Alert, InputAdornment, IconButton, Fade, CircularProgress } from '@mui/material';
import { AccountBalance as AccountBalanceIcon, Visibility, VisibilityOff, Lock as LockIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';

// Lightweight JWT decoder (no external deps)
const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export default function Login() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();
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

      // Persist token first so protected call includes Authorization header
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }

      // Build user info from JWT claims
      let userInfo = null;
      const payload = decodeJwt(token);
      if (payload) {
        userInfo = {
          id: payload.id ?? payload.sub ?? undefined,
          name: payload.username ?? payload.name ?? data.email.split('@')[0],
          email: payload.email ?? data.email,
          role: payload.role ?? 'citizen',
          status: payload.status ?? undefined,
        };
      } else {
        // Fallback: try protected, then minimal
        try {
          const protectedRes = await apiClient.auth.protected();
          userInfo = protectedRes?.user || protectedRes || { name: data.email.split('@')[0], email: data.email, role: 'citizen' };
        } catch {
          userInfo = { name: data.email.split('@')[0], email: data.email, role: 'citizen' };
        }
      }

      // Finalize login
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

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                autoComplete="email"
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
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
                sx={{ mb: 1 }}
              />

              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => router.push('/forgot')}
                  sx={{ textTransform: 'none' }}
                >
                  Forgot Password?
                </Button>
              </Box>

              <Button type="submit" fullWidth variant="contained" disabled={loading} startIcon={loading ? <CircularProgress size={18} /> : null} sx={{ py: 1.25 }}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Don't have an account?
                </Typography>
                <Button
                  variant="text"
                  onClick={() => router.push('/signup')}
                  sx={{ textTransform: 'none' }}
                >
                  Sign up as Citizen
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}


