"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import {
  AccountBalance as AccountBalanceIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { apiClient } from "@/lib/api";

export default function ForgotPassword() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Forgot password form submitted with:", data);
    setLoading(true);
    try {
      console.log("Making API call to forgotPassword...");
      console.log(
        "API URL:",
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
        }/auth/forgotPassword`
      );
      console.log("Request body:", JSON.stringify({ email: data.email }));

      const response = await apiClient.auth.forgotPassword(data.email);
      console.log("API response:", response);
      enqueueSnackbar(
        "If the email exists, a reset link has been sent to your email address",
        { variant: "success" }
      );
      router.push("/login");
    } catch (e) {
      console.error("Forgot password error:", e);
      console.error("Error details:", {
        message: e.message,
        stack: e.stack,
        name: e.name,
      });
      enqueueSnackbar(e.message || "Failed to send reset email", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (data) => {
    console.log("Form submit handler called with:", data);
    onSubmit(data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        background: "linear-gradient(135deg, #eef2f7 0%, #e8f0ff 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={12} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <AccountBalanceIcon
              sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
            />
            <Typography variant="h4" fontWeight="bold">
              Forgot Password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Enter your email address and we'll send you a link to reset your
              password
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
            <TextField
              fullWidth
              label="Email"
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
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} /> : null}
              sx={{ py: 1.25, mb: 2 }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <Button
              type="button"
              fullWidth
              variant="outlined"
              onClick={() => {
                console.log("Test button clicked");
                apiClient.auth
                  .forgotPassword("test@example.com")
                  .then((res) => console.log("Test API success:", res))
                  .catch((err) => console.error("Test API error:", err));
              }}
              sx={{ py: 1.25, mb: 2 }}
            >
              Test API Call
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                onClick={() => router.push("/login")}
                sx={{ textTransform: "none" }}
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
