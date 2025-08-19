'use client';
import { useEffect, useState } from 'react';
import { Box, Container, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon, Dashboard as DashboardIcon, AddBox as AddBoxIcon, Description as DescriptionIcon, AccountBalance as AccountBalanceIcon, Search as SearchIcon, Person as PersonIcon, Help as HelpIcon, VerifiedUser as VerifiedUserIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

const drawerWidth = 280;

const baseMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Register Property', icon: <AddBoxIcon />, path: '/land-registration' },
  { text: 'All Properties', icon: <DescriptionIcon />, path: '/properties' },
  { text: 'Transaction History', icon: <AccountBalanceIcon />, path: '/transactions' },
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { text: 'Help & Support', icon: <HelpIcon />, path: '/help' },
  { text: 'Public Verification', icon: <SearchIcon />, path: '/verify' },
];

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  useEffect(() => { setOpen(!isMobile); }, [isMobile]);
  const router = useRouter();

  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const adminMenuItems = [
    { text: 'Admin Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Verification Queue', icon: <VerifiedUserIcon />, path: '/admin/verification-queue' },
    { text: 'Property Search', icon: <SearchIcon />, path: '/admin/property-search' },
    { text: 'Manage Officers', icon: <PersonIcon />, path: '/admin/officers' },
  ];
  const isAdminUser = !!user && user.role === 'admin';

  const drawer = (
    <Box sx={{ height: '100%' }}>
      <List>
        {baseMenuItems.map((item) => (
          <ListItemButton key={item.text} onClick={() => router.push(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        {isAdminUser && (
          <>
            <Divider sx={{ my: 1 }} />
            {adminMenuItems.map((item) => (
              <ListItemButton key={item.text} onClick={() => router.push(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(12px)',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          <IconButton 
            color="inherit" 
            edge="start" 
            onClick={() => setOpen((v) => !v)} 
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton 
            color="inherit" 
            edge="start" 
            onClick={() => setOpen((v) => !v)} 
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Land Registry System
          </Typography>
          <ThemeToggle />
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ width: 32, height: 32 }}>{user?.name?.[0] || 'U'}</Avatar>
          </IconButton>
          <Menu 
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => { setAnchorEl(null); router.push('/profile'); }}>Profile</MenuItem>
            <Divider />
            <MenuItem onClick={() => { setAnchorEl(null); logout(); }}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box 
        component="nav" 
        sx={{ 
          width: { md: drawerWidth }, 
          flexShrink: { md: 0 }
        }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backdropFilter: 'blur(12px)',
              backgroundColor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
              top: 0,
              height: '100vh',
              zIndex: (theme) => theme.zIndex.drawer,
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Box>
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default'
        }}
      >
        <Toolbar sx={{ minHeight: 72 }} />
        <Container maxWidth="xl" sx={{ py: 3 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;


