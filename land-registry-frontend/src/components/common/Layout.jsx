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
  AddBox as AddBoxIcon,
  VerifiedUser as VerifiedUserIcon,
  AccountBalance as AccountBalanceIcon,
  ExitToApp as ExitToAppIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Search as SearchIcon,
  SwapHoriz as SwapHorizIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Mock user data - replace with actual auth context
  const user = {
    name: 'John Doe',
    role: 'citizen', // 'citizen' | 'admin'
    email: 'john.doe@example.com'
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Register Property', icon: <AddBoxIcon />, path: '/register' },
    { text: 'All Properties', icon: <DescriptionIcon />, path: '/properties' },
    { text: 'Public Verification', icon: <SearchIcon />, path: '/verify' },
  ];



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout logic
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
        color: '#FFFFFF',
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
        <AccountBalanceIcon sx={{ 
          fontSize: 52, 
          color: 'primary.main', 
          mb: 2,
          filter: 'drop-shadow(0 2px 4px rgba(44,62,80,0.2))'
        }} />
        <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
          Land Registry
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: '0.5px' }}>
          Government of Sri Lanka
        </Typography>
      </Box>
      
      <Divider />
      
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              py: 1.8,
              px: 2,
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
                borderRadius: '0 4px 4px 0',
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
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        
  {/* Admin section removed for user layout */}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: {
          xs: 'linear-gradient(135deg, #F5F6FA 60%, #ECF0F1 100%)',
          md: 'linear-gradient(120deg, #F5F6FA 70%, #ECF0F1 100%)',
        },
      }}
    >
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
            size="large"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '-0.5px' }}
          >
            Sri Lankan Land Registry System
          </Typography>

          <Button
            color="inherit"
            onClick={handleProfileMenuOpen}
            startIcon={
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.light' }}>
                <PersonIcon />
              </Avatar>
            }
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              px: 2,
              my: 1,
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(21,101,192,0.10)',
              background: 'rgba(255,255,255,0.04)',
              '&:hover': {
                background: 'rgba(255,255,255,0.10)',
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
            PaperProps={{
              sx: {
                borderRadius: 1,
                minWidth: 180,
                boxShadow: '0 4px 24px rgba(21,101,192,0.13)',
              },
            }}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon><PersonIcon sx={{ color: 'black' }} /></ListItemIcon>
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon><ExitToAppIcon sx={{ color: 'error.main' }}/></ListItemIcon>
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
          bgcolor: 'transparent',
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
            borderRadius: 4,
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
              borderRadius: '4px 4px 0 0',
            },
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
