import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function ProfileRedirect() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      // Redirect based on user role
      if (
        user.role === "officer" ||
        user.role === "government_officer" ||
        user.role === "admin"
      ) {
        router.replace("/officer/profile");
      } else {
        router.replace("/citizen/profile");
      }
    } else if (!loading && !user) {
      // Redirect to login if not authenticated
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Show loading while determining redirect
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body1" color="text.secondary">
        Redirecting to your profile...
      </Typography>
    </Box>
  );
}
