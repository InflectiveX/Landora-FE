import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  AddBox as AddBoxIcon,
  Description as DescriptionIcon,
  AccountBalance as AccountBalanceIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Help as HelpIcon,
  VerifiedUser as VerifiedUserIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  ModernAppBar,
  ModernToolbar,
  BrandLogo,
  ActionButtons,
  ModernIconButton,
  ModernAvatar,
  ModernBadge,
  FloatingActionBar,
} from "@/components/ui/ModernNavigation";

const drawerWidth = 280;

const baseMenuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "citizen/dashboard" },
  {
    text: "Register Property",
    icon: <AddBoxIcon />,
    path: "citizen/land-registration",
  },
  {
    text: "All Properties",
    icon: <DescriptionIcon />,
    path: "citizen/properties",
  },
  {
    text: "Transaction History",
    icon: <AccountBalanceIcon />,
    path: "citizen/transactions",
  },
  { text: "Profile", icon: <PersonIcon />, path: "citizen/profile" },
  { text: "Help & Support", icon: <HelpIcon />, path: "citizen/help" },
  { text: "Public Verification", icon: <SearchIcon />, path: "citizen/verify" },
];

// Dummy notification data for citizens
const citizenNotifications = [
  {
    id: 1,
    type: "success",
    title: "Property Registration Approved",
    message: "Your property 'Sunset Villa' has been successfully registered and approved.",
    time: "2 hours ago",
    icon: <CheckCircleIcon />,
  },
  {
    id: 2,
    type: "warning",
    title: "Document Verification Required",
    message: "Additional documents are required for your property registration.",
    time: "1 day ago",
    icon: <WarningIcon />,
  },
  {
    id: 3,
    type: "info",
    title: "Transfer Request Submitted",
    message: "Your property transfer request has been submitted for review.",
    time: "2 days ago",
    icon: <AssignmentIcon />,
  },
  {
    id: 4,
    type: "success",
    title: "Payment Confirmed",
    message: "Registration fee payment has been confirmed for your property.",
    time: "3 days ago",
    icon: <CheckCircleIcon />,
  },
  {
    id: 5,
    type: "info",
    title: "System Update",
    message: "New features have been added to the land registry system.",
    time: "1 week ago",
    icon: <InfoIcon />,
  },
];

const CitizenLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);
  const router = useRouter();

  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const adminMenuItems = [
    { text: "Admin Dashboard", icon: <DashboardIcon />, path: "/admin" },
    {
      text: "Verification Queue",
      icon: <VerifiedUserIcon />,
      path: "/admin/verification-queue",
    },
    {
      text: "Property Search",
      icon: <SearchIcon />,
      path: "/admin/property-search",
    },
    { text: "Manage Officers", icon: <PersonIcon />, path: "/admin/officers" },
  ];
  const isAdminUser = !!user && user.role === "admin";

  // Check if current route is active
  const isActiveRoute = (path) => {
    return (
      router.pathname === `/${path}` || router.pathname.startsWith(`/${path}/`)
    );
  };

  // Enhanced Drawer with modern styling
  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Sidebar Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.05
          )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        }}
      >
        <BrandLogo onClick={() => router.push("/citizen/dashboard")}>
          <AccountBalanceIcon
            className="brand-icon"
            sx={{
              color: theme.palette.primary.main,
              fontSize: 32,
            }}
          />
          <Typography
            className="brand-text"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
              fontSize: "1.25rem",
            }}
          >
            Landora
          </Typography>
        </BrandLogo>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, py: 2 }}>
        <List>
          {baseMenuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => router.push(`/${item.path}`)}
              selected={isActiveRoute(item.path)}
              sx={{
                mx: 1,
                borderRadius: theme.shape.borderRadius,
                mb: 0.5,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "3px",
                  height: "100%",
                  backgroundColor: theme.palette.primary.main,
                  transform: "scaleY(0)",
                  transition: "transform 0.3s ease",
                  transformOrigin: "center",
                },
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  transform: "translateX(8px)",
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.main,
                    transform: "scale(1.1)",
                  },
                  "&::before": {
                    transform: "scaleY(1)",
                  },
                },
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  color: theme.palette.primary.main,
                  "&::before": {
                    transform: "scaleY(1)",
                  },
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActiveRoute(item.path)
                    ? theme.palette.primary.main
                    : theme.palette.mode === "light"
                    ? theme.palette.text.secondary
                    : theme.palette.text.primary,
                  transition: "color 0.3s ease",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: isActiveRoute(item.path) ? 600 : 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Sidebar Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
          backgroundColor:
            theme.palette.mode === "light"
              ? alpha(theme.palette.background.default, 0.5)
              : alpha(theme.palette.background.paper, 0.3),
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1 }}>
          <ModernAvatar
            src={user?.avatar}
            sx={{ width: 36, height: 36 }}
            status={user?.status || "online"}
          >
            {user?.name?.[0] || "U"}
          </ModernAvatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {user?.name || "User"}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.role || "Citizen"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Modern App Bar */}
      <ModernAppBar
        position="fixed"
        variant="glass"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(20, 21, 24, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <ModernToolbar>
          <ModernIconButton
            variant="glass"
            edge="start"
            onClick={() => setOpen((v) => !v)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </ModernIconButton>

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600,
            }}
          >
            Land Registry System
          </Typography>

          <ActionButtons>
            <ThemeToggle />

            <ModernBadge badgeContent={citizenNotifications.length} color="error">
              <ModernIconButton 
                variant="glass"
                onClick={(e) => setNotificationAnchor(e.currentTarget)}
              >
                <NotificationsIcon />
              </ModernIconButton>
            </ModernBadge>

            <ModernAvatar
              src={user?.avatar}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              status={user?.status || "online"}
              sx={{ cursor: "pointer" }}
            >
              {user?.name?.[0] || "U"}
            </ModernAvatar>
          </ActionButtons>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                mt: 1,
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                backdropFilter: "blur(20px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                borderRadius: 2,
                minWidth: 200,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                router.push("/citizen/profile");
              }}
              sx={{
                gap: 1.5,
                py: 1.5,
                borderRadius: theme.shape.borderRadius,
                mx: 1,
                mb: 0.5,
              }}
            >
              <PersonIcon fontSize="small" />
              Profile
            </MenuItem>
            <Divider sx={{ mx: 1 }} />
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                logout();
              }}
              sx={{
                gap: 1.5,
                py: 1.5,
                borderRadius: theme.shape.borderRadius,
                mx: 1,
                mt: 0.5,
                color: theme.palette.error.main,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.error.main, 0.08),
                },
              }}
            >
              <LogoutIcon fontSize="small" />
              Logout
            </MenuItem>
          </Menu>

          {/* Notification Popup */}
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={() => setNotificationAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                mt: 1,
                backgroundColor: alpha(theme.palette.background.paper, 0.95),
                backdropFilter: "blur(20px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                borderRadius: 2,
                minWidth: 380,
                maxWidth: 400,
                maxHeight: 500,
                overflow: "hidden",
              },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 2,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight={600}>
                  Notifications
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {citizenNotifications.length} new
                </Typography>
              </Box>
            </Box>

            {/* Notifications List */}
            <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
              {citizenNotifications.map((notification, index) => (
                <Box
                  key={notification.id}
                  sx={{
                    p: 2,
                    borderBottom: index < citizenNotifications.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    // Handle notification click
                    console.log("Notification clicked:", notification.title);
                    setNotificationAnchor(null);
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: 
                          notification.type === "success" ? alpha(theme.palette.success.main, 0.1) :
                          notification.type === "warning" ? alpha(theme.palette.warning.main, 0.1) :
                          alpha(theme.palette.info.main, 0.1),
                        color: 
                          notification.type === "success" ? theme.palette.success.main :
                          notification.type === "warning" ? theme.palette.warning.main :
                          theme.palette.info.main,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {notification.icon}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        {notification.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Footer */}
            <Box
              sx={{
                p: 2,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                backgroundColor: alpha(theme.palette.background.default, 0.5),
              }}
            >
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  fontWeight: 500,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => {
                  // Handle view all notifications
                  console.log("View all notifications clicked");
                  setNotificationAnchor(null);
                }}
              >
                View All Notifications
              </Typography>
            </Box>
          </Menu>
        </ModernToolbar>
      </ModernAppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(20, 21, 24, 0.95)",
              backdropFilter: "blur(20px)",
              borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              top: 0,
              height: "100vh",
              zIndex: (theme) => theme.zIndex.drawer,
            },
          }}
        >
          <ModernToolbar /> {/* Spacer for app bar */}
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          backgroundColor: "transparent",
        }}
      >
        <ModernToolbar /> {/* Spacer for app bar */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {children}
        </Container>
      </Box>

      {/* Floating Action Bar for Mobile */}
      <FloatingActionBar>
        <ModernIconButton variant="glass" size="small">
          <DashboardIcon />
        </ModernIconButton>
        <ModernIconButton variant="glass" size="small">
          <AddBoxIcon />
        </ModernIconButton>
        <ModernIconButton variant="glass" size="small">
          <DescriptionIcon />
        </ModernIconButton>
        <ModernIconButton variant="glass" size="small">
          <PersonIcon />
        </ModernIconButton>
      </FloatingActionBar>
    </Box>
  );
};

export default CitizenLayout;
