
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from './theme/theme';
import Layout from './components/common/Layout';
import AdminLayout from './components/common/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LandRegistration from './pages/LandRegistration';
import VerificationQueue from './pages/VerificationQueue';
import PropertyDetails from './pages/PropertyDetails';
import PropertyTransfer from './pages/PropertyTransfer';
import PublicVerification from './pages/PublicVerification';


import AdminDashboard from './pages/AdminDashboard';
import AdminPropertySearch from './pages/AdminPropertySearch';
import OfficerManagement from './pages/OfficerManagement';
import AllProperties from './pages/AllProperties';
import Profile from './pages/Profile';
import TransactionHistory from './pages/TransactionHistory';
import Help from './pages/Help';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* User Layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route 
                  path="/help" 
                  element={
                    <ProtectedRoute>
                      <Help />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/transactions" 
                  element={
                    <ProtectedRoute>
                      <TransactionHistory />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <ProtectedRoute>
                      <LandRegistration />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/properties" 
                  element={
                    <ProtectedRoute>
                      <AllProperties />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/property/:id" 
                  element={
                    <ProtectedRoute>
                      <PropertyDetails />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/transfer/:id" 
                  element={
                    <ProtectedRoute>
                      <PropertyTransfer />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/verify" 
                  element={<PublicVerification />} 
                />

                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
              </Route>

              {/* Admin Layout */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route 
                  index
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="verification-queue"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <VerificationQueue />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="property-search"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminPropertySearch />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="officers"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <OfficerManagement />
                    </ProtectedRoute>
                  }
                />
              </Route>
              
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
