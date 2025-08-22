import OfficerLayout from "@/components/layouts/OfficerLayout";
import { Typography, Box } from "@mui/material";

export default function OfficerDashboard() {
  return (
    <OfficerLayout>
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Officer Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to the officer dashboard! Here you can manage property
          verifications, transfers, and more.
        </Typography>
      </Box>
    </OfficerLayout>
  );
}
