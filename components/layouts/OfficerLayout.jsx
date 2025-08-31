import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  alpha,
  Fade,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  ModernAppBar,
  ModernToolbar,
  BrandLogo,
} from "@/components/ui/ModernNavigation";

const drawerWidth = 280;

import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  AddLocationAlt as AddLocationAltIcon,
  Description as DescriptionIcon,
  FactCheck as FactCheckIcon,
  AccountBalance as AccountBalanceIcon,
  ListAlt as ListAltIcon,
  BarChart as BarChartIcon,
  Help as HelpIcon,
  VerifiedUser as VerifiedUserIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";

const officerMenuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/officer/dashboard" },
  {
    text: "Properties",
    icon: <DescriptionIcon />,
    path: "/officer/properties",
    subItems: [
      {
        text: "All Properties",
        icon: <ListAltIcon />,
        path: "/officer/properties",
      },
      {
        text: "Verify a Property",
        icon: <VerifiedUserIcon />,
        path: "/officer/properties/verify",
      },
    ],
  },
  {
    text: "Verification Queue",
    icon: <FactCheckIcon />,
    path: "/officer/verification-queue",
    subItems: [
      {
        text: "Register Queue",
        icon: <ListAltIcon />,
        path: "/officer/verification-queue/register",
      },
      {
        text: "Transfer Queue",
        icon: <ListAltIcon />,
        path: "/officer/verification-queue/transfer",
      },
    ],
  },
  {
    text: "Transactions",
    icon: <AccountBalanceIcon />,
    path: "/officer/transactions",
  },
  { text: "Reports", icon: <BarChartIcon />, path: "/officer/reports" },
  { text: "Profile", icon: <PersonIcon />, path: "/officer/profile" },
  { text: "Help & Support", icon: <HelpIcon />, path: "/officer/help" },
];

// Dummy notification data
const dummyNotifications = [
  {
    id: 1,
    type: "success",
    title: "Property Verification Completed",
    message: "Sunset Villa has been successfully verified and approved.",
    time: "5 minutes ago",
    icon: <CheckCircleIcon />,
  },
  {
    id: 2,
    type: "warning",
    title: "Pending Verification Alert",
    message: "3 new properties are waiting for verification in the queue.",
    time: "15 minutes ago",
    icon: <WarningIcon />,
  },
  {
    id: 3,
    type: "info",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight at 2:00 AM.",
    time: "1 hour ago",
    icon: <InfoIcon />,
  },
  {
    id: 4,
    type: "info",
    title: "New Registration",
    message: "Green Acres Farm has been registered and added to queue.",
    time: "2 hours ago",
    icon: <ScheduleIcon />,
  },
  {
    id: 5,
    type: "success",
    title: "Transfer Request Approved",
    message: "City Center Apartment transfer has been approved.",
    time: "3 hours ago",
    icon: <CheckCircleIcon />,
  },
];

const OfficerLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
  const [navIconFocused, setNavIconFocused] = useState(false);
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
    {
      text: "User Management",
      icon: <PersonIcon />,
      path: "/officer/user-management",
    },
  ];
  const isAdminUser = !!user && user.role === "admin";
  // allow officers and admins to access the User Management sidebar
  const canManageUsers =
    !!user &&
    (user.role === "admin" ||
      user.role === "government_officer" ||
      user.role === "officer");

  // Officer sidebar nav with sub-items for Verification Queue
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const drawer = (
    <Box
      id="navigation-drawer"
      sx={{ height: "100%", display: "flex", flexDirection: "column", mt: 1 }}
    >
      <Box sx={{ flex: 1 }}>
        <List>
          {officerMenuItems.map((item) =>
            item.subItems ? (
              <Box key={item.text}>
                <ListItemButton
                  onClick={() =>
                    setOpenSubMenu(openSubMenu === item.text ? null : item.text)
                  }
                  sx={{
                    borderRadius: theme.shape.borderRadius,
                    mx: 1,
                    mb: 0.5,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <ExpandMoreIcon
                    sx={{
                      transform:
                        openSubMenu === item.text
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItemButton>
                <Fade in={openSubMenu === item.text} timeout={300}>
                  <List component="div" disablePadding sx={{ pl: 2, mb: 1 }}>
                    {openSubMenu === item.text &&
                      item.subItems.map((sub) => (
                        <ListItemButton
                          key={sub.text}
                          onClick={() => router.push(sub.path)}
                          sx={{
                            borderRadius: theme.shape.borderRadius,
                            mx: 1,
                            mb: 0.5,
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.08
                              ),
                              transform: "translateX(4px)",
                            },
                            ...(router.pathname === sub.path && {
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.12
                              ),
                              borderLeft: `3px solid ${theme.palette.primary.main}`,
                            }),
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: theme.palette.text.primary,
                              minWidth: 36,
                            }}
                          >
                            {sub.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={sub.text}
                            primaryTypographyProps={{
                              fontWeight: 500,
                              fontSize: "0.875rem",
                            }}
                          />
                        </ListItemButton>
                      ))}
                  </List>
                </Fade>
              </Box>
            ) : (
              <ListItemButton
                key={item.text}
                onClick={() => router.push(item.path)}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  mx: 1,
                  mb: 0.5,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    transform: "translateX(4px)",
                  },
                  ...(router.pathname === item.path && {
                    backgroundColor: alpha(theme.palette.primary.main, 0.12),
                    borderLeft: `3px solid ${theme.palette.primary.main}`,
                  }),
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            )
          )}

          {/* Officer Management (Admins and Officers) */}
          {canManageUsers && (
            <ListItemButton
              key="User Management"
              onClick={() => router.push("/officer/user-management")}
              sx={{
                borderRadius: theme.shape.borderRadius,
                mx: 1,
                mb: 0.5,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  transform: "translateX(4px)",
                },
                ...(router.pathname === "/officer/user-management" && {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  borderLeft: `3px solid ${theme.palette.primary.main}`,
                }),
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary="User Management"
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          )}
        </List>
      </Box>
      {/* Sidebar Footer: User Avatar and Name */}
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
          <Avatar
            sx={{
              width: 36,
              height: 36,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            {user?.name?.[0] || "U"}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {user?.name || "User"}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.role || "Officer"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <ModernAppBar
        variant="glass"
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <ModernToolbar sx={{ minHeight: 72 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => {
              setOpen((v) => !v);
              // Maintain focus on the button when clicked
              setTimeout(() => {
                const button = document.querySelector('[aria-label="Toggle navigation menu"]');
                if (button) button.focus();
              }, 100);
            }}
            onFocus={() => setNavIconFocused(true)}
            onBlur={() => setNavIconFocused(false)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="navigation-drawer"
            sx={{
              mr: 2,
              display: { md: "none" },
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
              "&:focus": {
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: "2px",
              },
              "&:focus-visible": {
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: "2px",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => {
              setOpen((v) => !v);
              // Maintain focus on the button when clicked
              setTimeout(() => {
                const button = document.querySelector('[aria-label="Toggle navigation menu"]');
                if (button) button.focus();
              }, 100);
            }}
            onFocus={() => setNavIconFocused(true)}
            onBlur={() => setNavIconFocused(false)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="navigation-drawer"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
              "&:focus": {
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: "2px",
              },
              "&:focus-visible": {
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: "2px",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <BrandLogo onClick={() => router.push("/officer/dashboard")}>
            <AccountBalanceIcon className="brand-icon" />
            <Typography
              className="brand-text"
              variant="h6"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Landora Officer
            </Typography>
          </BrandLogo>

          <Box sx={{ flexGrow: 1 }} />

          <ThemeToggle />

          <IconButton
            color="inherit"
            onClick={(e) => setNotificationAnchor(e.currentTarget)}
            sx={{
              mx: 1,
              position: "relative",
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <NotificationsIcon />
            {/* Notification badge */}
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: theme.palette.error.main,
                border: `2px solid ${theme.palette.background.paper}`,
              }}
            />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                fontWeight: 600,
              }}
            >
              {user?.name?.[0] || "U"}
            </Avatar>
          </IconButton>

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
                router.push("/officer/profile");
              }}
              sx={{
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              Profile
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                logout();
              }}
              sx={{
                "&:hover": {
                  backgroundColor: alpha(theme.palette.error.main, 0.08),
                  color: theme.palette.error.main,
                },
              }}
            >
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
                   {dummyNotifications.length} new
                 </Typography>
               </Box>
             </Box>

             {/* Notifications List */}
             <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
               {dummyNotifications.map((notification, index) => (
                 <Box
                   key={notification.id}
                   sx={{
                     p: 2,
                     borderBottom: index < dummyNotifications.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : "none",
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
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(20, 21, 24, 0.8)",
              backdropFilter: "blur(20px)",
              borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              top: 0,
              height: "100vh",
              zIndex: (theme) => theme.zIndex.drawer,
            },
          }}
        >
          <Toolbar sx={{ minHeight: 72 }} />
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          backgroundColor: "background.default",
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

export default OfficerLayout;
