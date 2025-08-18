'use client'

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from '../lib/theme.js';
import '../styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Land Registry Frontend</title>
        <meta name="description" content="Land Registry Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
