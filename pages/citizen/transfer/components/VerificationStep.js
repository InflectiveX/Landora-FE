import React from "react";
import { Box, Typography } from "@mui/material";

export default function VerificationStep() {
  return (
    <Box>
      <Typography variant="body1">
        Please verify the buyer NIC, description, amount, and uploaded documents
        are correct. You may be required to visit the land registry office for
        in-person verification.
      </Typography>
    </Box>
  );
}
