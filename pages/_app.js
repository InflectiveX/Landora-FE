import "@/styles/globals.css";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeModeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, CircularProgress, CssBaseline } from "@mui/material";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const RouterGuard = ({ children }) => {
    const router = useRouter();
    const [checking, setChecking] = useState(true);
    useEffect(() => {
      const publicRoutes = [
        "/login",
        "/signup",
        "/verify",
        "/forgot",
        "/_error",
        "/api",
      ];
      const isPublic = publicRoutes.some(
        (p) => router.pathname === p || router.pathname.startsWith(p + "/")
      );
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const userRaw =
          typeof window !== "undefined" ? localStorage.getItem("user") : null;
        const user = userRaw ? JSON.parse(userRaw) : null;
        const isAdminRoute = router.pathname.startsWith("/admin");
        if (!isPublic && !token) {
          router.replace("/login");
          return;
        }
        if (isAdminRoute && (!user || user.role !== "admin")) {
          router.replace("/dashboard");
          return;
        }
      } finally {
        setChecking(false);
      }
    }, [router]);
    if (checking) {
      return (
        <Box
          sx={{
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <AuthProvider>
            <RouterGuard>
              <Component {...pageProps} />
            </RouterGuard>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeModeProvider>
    </QueryClientProvider>
  );
}
