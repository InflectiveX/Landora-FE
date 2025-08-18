'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      // Redirect based on role
      if (userData.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [router]);

  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <CircularProgress size={60} sx={{ mb: 4 }} />
      <Typography variant="h6" color="text.secondary">
        Loading Sri Lankan Land Registry System...
      </Typography>
    </Container>
  );
}
