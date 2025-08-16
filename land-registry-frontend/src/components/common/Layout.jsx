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
    <Box sx={{ height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <AccountBalanceIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="h6" color="primary" fontWeight="bold">
          Land Registry
        </Typography>
        <Typography variant="body2" color="text.secondary">
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
              mb: 0.5,
              bgcolor: location.pathname === item.path ? 'primary.light' : 'transparent',
              color: location.pathname === item.path ? 'white' : 'text.primary',
              '&:hover': {
                bgcolor: location.pathname === item.path ? 'primary.main' : 'grey.100',
              },
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
          xs: 'linear-gradient(135deg, #f8f9fa 60%, #e3f2fd 100%)',
          md: 'linear-gradient(120deg, #f8f9fa 70%, #e3f2fd 100%)',
        },
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          borderBottom: '1.5px solid #e3eaf2',
          boxShadow: '0 2px 12px rgba(21,101,192,0.08)',
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
                borderRadius: 3,
                minWidth: 180,
                boxShadow: '0 4px 24px rgba(21,101,192,0.13)',
              },
            }}
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
              borderTopRightRadius: 18,
              borderBottomRightRadius: 18,
              boxShadow: '0 4px 24px rgba(21,101,192,0.10)',
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
              borderTopRightRadius: 18,
              borderBottomRightRadius: 18,
              boxShadow: '0 4px 24px rgba(21,101,192,0.10)',
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
            py: { xs: 2, md: 5 },
            px: { xs: 1, md: 4 },
            borderRadius: 5,
            boxShadow: {
              xs: '0 2px 8px rgba(21,101,192,0.05)',
              md: '0 4px 24px rgba(21,101,192,0.08)',
            },
            background: 'rgba(255,255,255,0.95)',
            minHeight: 'calc(100vh - 100px)',
            mt: 2,
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
