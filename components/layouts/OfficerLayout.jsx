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
  { text: "Help & Support", icon: <HelpIcon />, path: "/officer/help" },
];

const OfficerLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
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

  // Officer sidebar nav with sub-items for Verification Queue
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const drawer = (
    <Box sx={{ height: "100%", mt: 1 }}>
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
      </List>
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
            onClick={() => setOpen((v) => !v)}
            sx={{
              mr: 2,
              display: { md: "none" },
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen((v) => !v)}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
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
            sx={{
              mx: 1,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <NotificationsIcon />
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
                router.push("/profile");
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
