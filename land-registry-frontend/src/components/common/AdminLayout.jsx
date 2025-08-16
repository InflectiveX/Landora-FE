import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  VerifiedUser as VerifiedUserIcon,
  AdminPanelSettings as AdminIcon,
  ExitToApp as ExitToAppIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock admin user
  const user = {
    name: 'Admin User',
    role: 'admin',
    email: 'admin@example.com',
  };

  const adminMenuItems = [
    { text: 'Admin Dashboard', icon: <AdminIcon />, path: '/admin' },
    { text: 'Verification Queue', icon: <VerifiedUserIcon />, path: '/admin/verification-queue' },
    { text: 'Property Search', icon: <DashboardIcon />, path: '/admin/property-search' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      bgcolor: '#FFFFFF',
      borderRight: '1px solid #E5E7E9',
    }}>
      <Box sx={{ 
        p: 4, 
        textAlign: 'center',

        color: '#000000ff',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
          zIndex: 1
        }
      }}>
        <AdminIcon color="primary"  sx={{ fontSize: 52, mb: 2, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
        <Typography  color="primary" variant="h5" fontWeight="bold" sx={{ mb: 1,  }}>
          Admin Panel
        </Typography>
        <Typography variant="body2" sx={{  color:"primary", letterSpacing: '0.5px' }}>
          Land Registry Admin
        </Typography>
      </Box>
      <List sx={{ px: 2, py: 2 }}>
        {adminMenuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => navigate(item.path)}
            sx={{
              py: 1.8,
              px: 2,
              mb: 1,
              bgcolor: location.pathname === item.path ? 'rgba(23,165,137,0.1)' : 'transparent',
              color: location.pathname === item.path ? '#17A589' : '#4A4A4A',
              position: 'relative',
              '&:before': location.pathname === item.path ? {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                height: '70%',
                width: 3,
                background: 'linear-gradient(180deg, #17A589, #5DADE2)',
              } : {},
              '&:hover': {
                bgcolor: location.pathname === item.path ? 'rgba(23,165,137,0.12)' : 'rgba(93,173,226,0.08)',
                color: location.pathname === item.path ? '#17A589' : '#5DADE2',
                '& .MuiListItemIcon-root': {
                  color: '#5DADE2',
                },
              },
              '& .MuiListItemIcon-root': {
                color: location.pathname === item.path ? '#17A589' : '#4A4A4A',
                minWidth: 40,
                transition: 'color 0.3s ease',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #E5E7E9',
          color: '#1F3A93',
          boxShadow: '0 4px 20px rgba(31,58,147,0.06)',
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '-0.5px' }}>
            Land Registry Admin
          </Typography>
          <Button
            onClick={handleProfileMenuOpen}
            startIcon={
              <Avatar sx={{ width: 36, height: 36, bgcolor: '#17A589' }}>
                <PersonIcon />
              </Avatar>
            }
            sx={{
              color: '#4A4A4A',
              fontWeight: 600,
              fontSize: '1rem',
              px: 2,
              boxShadow: '0 2px 8px rgba(31,58,147,0.10)',
              background: 'rgba(255,255,255,0.8)',
              '&:hover': {
                background: 'rgba(23,165,137,0.08)',
              },
            }}
          >
            {user.name}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRadius: 0,
              boxShadow: '0 4px 24px rgba(31,58,147,0.10)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRadius: 0,
              boxShadow: '0 4px 24px rgba(31,58,147,0.10)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: '#FAFAFA',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar sx={{ minHeight: 72 }} />
        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 3, md: 5 },
            px: { xs: 2, md: 4 },
            boxShadow: '0 4px 24px rgba(31,58,147,0.06)',
            background: '#FFFFFF',
            minHeight: 'calc(100vh - 100px)',
            mt: 3,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #17A589, #5DADE2)',
            },
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminLayout;
