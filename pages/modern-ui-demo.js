"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  TextField,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

// Import our modern components
import ModernDialog from "@/components/ui/ModernDialog";
import ModernButton from "@/components/ui/ModernButton";
import ModernCard from "@/components/ui/ModernCard";
import ModernLoadingOverlay from "@/components/ui/ModernLoadingOverlay";
import { useToast, ToastContainer } from "@/components/ui/ModernNotification";
import { DropdownMenu, ModernMenuItem } from "@/components/ui/ModernMenu";
import {
  useResponsiveLayout,
  ResponsiveSection,
} from "@/components/ui/ResponsiveLayout";
import CitizenLayout from "@/components/layouts/CitizenLayout";

export default function ModernUIDemo() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogVariant, setDialogVariant] = useState("glass");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { isMobile, isTablet } = useResponsiveLayout();

  const handleShowToast = (type) => {
    toast[type](`This is a ${type} notification!`, {
      title: type.charAt(0).toUpperCase() + type.slice(1),
      showProgress: true,
      duration: 4000,
    });
  };

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const dialogVariants = [
    { value: "glass", label: "Glass" },
    { value: "gradient", label: "Gradient" },
    { value: "neon", label: "Neon" },
    { value: "solid", label: "Solid" },
  ];

  return (
    <CitizenLayout>
      <ResponsiveSection variant="spacious">
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
            }}
          >
            Modern UI Components Demo
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            This page demonstrates all the modern UI improvements including blur
            effects, responsive design, and enhanced user experience. Device:{" "}
            {isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"}
          </Typography>

          <Grid container spacing={4}>
            {/* Dialog Demos */}
            <Grid item xs={12} md={6}>
              <ModernCard variant="glass" interactive>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Modern Dialogs
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Enhanced dialogs with background blur, glassmorphism, and
                    responsive design.
                  </Typography>

                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}
                  >
                    {dialogVariants.map((variant) => (
                      <Chip
                        key={variant.value}
                        label={variant.label}
                        onClick={() => setDialogVariant(variant.value)}
                        color={
                          dialogVariant === variant.value
                            ? "primary"
                            : "default"
                        }
                        variant={
                          dialogVariant === variant.value
                            ? "filled"
                            : "outlined"
                        }
                      />
                    ))}
                  </Box>

                  <ModernButton
                    variant="gradient"
                    onClick={() => setDialogOpen(true)}
                    fullWidth
                  >
                    Open {dialogVariant} Dialog
                  </ModernButton>
                </CardContent>
              </ModernCard>
            </Grid>

            {/* Notification Demos */}
            <Grid item xs={12} md={6}>
              <ModernCard variant="gradient" interactive>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Modern Notifications
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Toast notifications with progress indicators and
                    glassmorphism styling.
                  </Typography>

                  <Grid container spacing={1}>
                    {["success", "error", "warning", "info"].map((type) => (
                      <Grid item xs={6} key={type}>
                        <Button
                          size="small"
                          onClick={() => handleShowToast(type)}
                          sx={{
                            textTransform: "capitalize",
                            width: "100%",
                            mb: 1,
                          }}
                        >
                          {type}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </ModernCard>
            </Grid>

            {/* Button Variants */}
            <Grid item xs={12} md={6}>
              <ModernCard variant="outlined" interactive>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Modern Buttons
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Enhanced button variants with animations and modern styling.
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <ModernButton variant="gradient" size="large">
                      Gradient Button
                    </ModernButton>
                    <ModernButton variant="glass" size="medium">
                      Glass Button
                    </ModernButton>
                    <ModernButton variant="neon" size="small">
                      Neon Button
                    </ModernButton>
                  </Box>
                </CardContent>
              </ModernCard>
            </Grid>

            {/* Loading and Menu Demos */}
            <Grid item xs={12} md={6}>
              <ModernCard variant="minimal" interactive>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Loading & Menus
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Loading overlays with blur effects and modern dropdown
                    menus.
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <ModernButton
                      variant="outlined"
                      onClick={handleLoadingDemo}
                    >
                      Show Loading
                    </ModernButton>

                    <DropdownMenu
                      trigger={
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      }
                    >
                      <ModernMenuItem>
                        <ViewIcon sx={{ mr: 1 }} fontSize="small" />
                        View Details
                      </ModernMenuItem>
                      <ModernMenuItem>
                        <SettingsIcon sx={{ mr: 1 }} fontSize="small" />
                        Settings
                      </ModernMenuItem>
                      <ModernMenuItem variant="danger">
                        <NotificationsIcon sx={{ mr: 1 }} fontSize="small" />
                        Notifications
                      </ModernMenuItem>
                    </DropdownMenu>
                  </Box>
                </CardContent>
              </ModernCard>
            </Grid>

            {/* Card Variants Demo */}
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Card Variants
              </Typography>
              <Grid container spacing={3}>
                {["glass", "gradient", "outlined", "neon", "minimal"].map(
                  (variant) => (
                    <Grid item xs={12} sm={6} md={4} lg={2.4} key={variant}>
                      <ModernCard variant={variant} interactive>
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {variant}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {variant} card variant with modern styling and
                            animations.
                          </Typography>
                        </CardContent>
                      </ModernCard>
                    </Grid>
                  )
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ResponsiveSection>

      {/* Demo Dialog */}
      <ModernDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={`${
          dialogVariant.charAt(0).toUpperCase() + dialogVariant.slice(1)
        } Dialog Demo`}
        size="medium"
        variant={dialogVariant}
        transition="zoom"
        actions={
          <>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <ModernButton
              variant="gradient"
              onClick={() => {
                setDialogOpen(false);
                toast.success("Dialog action completed!");
              }}
            >
              Confirm
            </ModernButton>
          </>
        }
      >
        <Box sx={{ py: 2 }}>
          <Typography variant="body1" paragraph>
            This is a demo of the <strong>{dialogVariant}</strong> dialog
            variant with enhanced background blur effects and modern styling.
          </Typography>

          <TextField
            fullWidth
            label="Sample Input"
            placeholder="Type something here..."
            sx={{ mb: 2 }}
          />

          <Typography variant="body2" color="text.secondary">
            Notice how the background is blurred and the dialog has a modern
            glassmorphism effect. The dialog is also fully responsive and will
            adapt to different screen sizes.
          </Typography>
        </Box>
      </ModernDialog>

      {/* Loading Overlay */}
      <ModernLoadingOverlay
        open={loading}
        message="Processing..."
        submessage="Demonstrating the modern loading overlay"
        variant="gradient"
        showParticles={true}
      />

      {/* Toast Container */}
      <ToastContainer maxToasts={5} />
    </CitizenLayout>
  );
}
