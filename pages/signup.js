"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  Typography,
  Alert,
  InputAdornment,
  Fade,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  AccountBalance as AccountBalanceIcon,
  Person as PersonIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { apiClient } from "@/lib/api";
import ModernCard, { ModernCardContent } from "@/components/ui/ModernCard";
import ModernTextField, { PasswordField } from "@/components/ui/ModernForm";
import ModernButton from "@/components/ui/ModernButton";

export default function SignUp() {
  const router = useRouter();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // API call to register user
      const response = await apiClient.user.register({
        fullname: data.fullName, // Changed to match backend 'fullname'
        email: data.email,
        nic: data.nicNumber, // Changed to match backend 'nic'
        password: data.password,
        role: "citizen", // Only citizens can sign up through this page
      });

      enqueueSnackbar(
        "Account created successfully! Please check your email for activation instructions.",
        { variant: "success" }
      );
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      enqueueSnackbar(
        error.message || "Registration failed. Please try again.",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        background:
          theme.palette.mode === "light"
            ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
            : `linear-gradient(135deg, ${
                theme.palette.background.default
              } 0%, ${theme.palette.background.paper} 50%, ${alpha(
                theme.palette.primary.dark,
                0.3
              )} 100%)`,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === "light"
              ? `radial-gradient(circle at 20% 80%, ${alpha(
                  theme.palette.primary.main,
                  0.2
                )} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${alpha(
                  theme.palette.secondary.main,
                  0.15
                )} 0%, transparent 50%)`
              : `radial-gradient(circle at 20% 80%, ${alpha(
                  theme.palette.primary.main,
                  0.1
                )} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${alpha(
                  theme.palette.accent?.main || theme.palette.secondary.main,
                  0.08
                )} 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={800}>
          <ModernCard variant="glass" interactive={false}>
            <ModernCardContent className="spacious">
              {/* Header Section */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    mb: 2,
                    boxShadow: `0 8px 32px ${alpha(
                      theme.palette.primary.main,
                      0.3
                    )}`,
                  }}
                >
                  <AccountBalanceIcon sx={{ fontSize: 40, color: "white" }} />
                </Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  Create Account
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ opacity: 0.8 }}
                >
                  Join the Land Registry System as a Citizen
                </Typography>
              </Box>

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mb: 3 }}
              >
                <ModernTextField
                  fullWidth
                  label="Full Name"
                  autoComplete="name"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <ModernTextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <ModernTextField
                  fullWidth
                  label="NIC Number"
                  autoComplete="off"
                  {...register("nicNumber", {
                    required: "NIC number is required",
                    pattern: {
                      value: /^([0-9]{9}[VXvx]|[0-9]{12})$/,
                      message:
                        "Invalid NIC format (e.g., 123456789V or 20012345695)",
                    },
                  })}
                  error={!!errors.nicNumber}
                  helperText={errors.nicNumber?.message}
                  sx={{ mb: 3 }}
                />

                <PasswordField
                  fullWidth
                  label="Password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message:
                        "Password must contain uppercase, lowercase, and number",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 3 }}
                />

                <PasswordField
                  fullWidth
                  label="Confirm Password"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  sx={{ mb: 3 }}
                />

                <Alert
                  severity="info"
                  sx={{
                    mb: 4,
                    borderRadius: theme.shape.borderRadius,
                    background: alpha(theme.palette.info.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography variant="body2">
                    By creating an account, you agree to our Terms of Service
                    and Privacy Policy.
                  </Typography>
                </Alert>

                <ModernButton
                  type="submit"
                  fullWidth
                  variant="gradient"
                  size="large"
                  disabled={loading}
                  sx={{ mb: 3 }}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ mr: 1, color: "inherit" }}
                      />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </ModernButton>
              </Box>
              {/* Footer Section */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, opacity: 0.8 }}
                >
                  Already have an account?
                </Typography>
                <ModernButton
                  variant="outlined"
                  fullWidth
                  onClick={() => router.push("/login")}
                >
                  Back to Login
                </ModernButton>
              </Box>
            </ModernCardContent>
          </ModernCard>
        </Fade>
      </Container>
    </Box>
  );
}
