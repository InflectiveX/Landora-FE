import CitizenLayout from "@/components/layouts/CitizenLayout";
import { Typography, Box } from "@mui/material";

export default function CitizenDashboard() {
  return (
    <CitizenLayout>
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Citizen Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to your dashboard! Here you can view your properties, register
          new land, and track your transactions.
        </Typography>
      </Box>
    </CitizenLayout>
  );
}
