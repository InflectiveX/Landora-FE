"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Fade,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  AccountBalance as AccountBalanceIcon,
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api";
import ModernCard, { ModernCardContent } from "@/components/ui/ModernCard";
import ModernTextField, { PasswordField } from "@/components/ui/ModernForm";
import ModernButton from "@/components/ui/ModernButton";

// Lightweight JWT decoder (no external deps)
const decodeJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export default function Login() {
  const router = useRouter();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await apiClient.auth.login({
        email: data.email,
        password: data.password,
      });
      // Handle various backend response shapes
      let token;
      if (res && typeof res === "object" && res.token) token = res.token;
      else if (typeof res === "string") token = res;
      else if (res && res.jwt) token = res.jwt;
      if (!token) throw new Error("No token returned from server");

      // Persist token first so protected call includes Authorization header
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      // Build user info from JWT claims
      let userInfo = null;
      const payload = decodeJwt(token);
      if (payload) {
        userInfo = {
          id: payload.id ?? payload.sub ?? undefined,
          name: payload.username ?? payload.name ?? data.email.split("@")[0],
          email: payload.email ?? data.email,
          role: payload.role ?? "citizen",
          status: payload.status ?? undefined,
        };
      } else {
        // Fallback: try protected, then minimal
        try {
          const protectedRes = await apiClient.auth.protected();
          userInfo = protectedRes?.user ||
            protectedRes || {
              name: data.email.split("@")[0],
              email: data.email,
              role: "citizen",
            };
        } catch {
          userInfo = {
            name: data.email.split("@")[0],
            email: data.email,
            role: "citizen",
          };
        }
      }

      login(userInfo, token);
      enqueueSnackbar("Logged in successfully", { variant: "success" });
      // Redirect based on role
      if (userInfo.role === "officer") {
        router.push("/officer/dashboard");
      } else {
        router.push("/citizen/dashboard");
      }
    } catch (e) {
      enqueueSnackbar(e.message || "Login failed", { variant: "error" });
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
                  Welcome Back
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ opacity: 0.8 }}
                >
                  Sign in to access your Land Registry account
                </Typography>
              </Box>

              {/* Login Form */}
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mb: 3 }}
              >
                <ModernTextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: "Email is required" })}
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

                <PasswordField
                  fullWidth
                  label="Password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ textAlign: "right", mb: 4 }}>
                  <ModernButton
                    variant="minimal"
                    size="small"
                    onClick={() => router.push("/forgot")}
                  >
                    Forgot Password?
                  </ModernButton>
                </Box>

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
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
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
                  Don't have an account?
                </Typography>
                <ModernButton
                  variant="outlined"
                  fullWidth
                  onClick={() => router.push("/signup")}
                >
                  Create Citizen Account
                </ModernButton>
              </Box>
            </ModernCardContent>
          </ModernCard>
        </Fade>
      </Container>
    </Box>
  );
}
