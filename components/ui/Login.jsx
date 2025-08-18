'use client'

import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock authentication
      if (formData.email && formData.password) {
        // Store user data in localStorage for demo purposes
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          email: formData.email,
          role: formData.email.includes('admin') ? 'admin' : 'citizen',
          name: 'Demo User'
        }));

        // Redirect based on role
        if (formData.email.includes('admin')) {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Land Registry Login
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            <Divider sx={{ my: 2 }} />
            
            <Box textAlign="center">
              <Link
                href="/signup"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              Demo Accounts:
            </Typography>
            <Typography variant="caption" display="block" align="center">
              Admin: admin@demo.com / password
            </Typography>
            <Typography variant="caption" display="block" align="center">
              User: user@demo.com / password
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
