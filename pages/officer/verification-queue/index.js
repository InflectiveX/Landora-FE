import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Badge,
  alpha,
  useTheme,
  Fade,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material";
import OfficerLayout from "@/components/layouts/OfficerLayout";
import RegisterQueue from "./register";
import TransferQueue from "./transfer";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`verification-tabpanel-${index}`}
      aria-labelledby={`verification-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function VerificationQueuePage() {
  const theme = useTheme();
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  // Mock counts - you would get these from your API
  const [registerCount, setRegisterCount] = useState(12);
  const [transferCount, setTransferCount] = useState(8);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <OfficerLayout>
      <Box>
        {/* Header */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Verification Queue
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ opacity: 0.8 }}
            >
              Review pending property registrations and transfers
            </Typography>
          </Box>
        </Fade>

        {/* Tabs */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: alpha(theme.palette.divider, 0.1),
            mb: 3,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="verification queue tabs"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
                minHeight: 64,
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                },
              },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab
              icon={
                <Badge badgeContent={registerCount} color="warning">
                  <AssignmentIcon />
                </Badge>
              }
              iconPosition="start"
              label="Property Registrations"
              id="verification-tab-0"
              aria-controls="verification-tabpanel-0"
            />
            <Tab
              icon={
                <Badge badgeContent={transferCount} color="info">
                  <SwapHorizIcon />
                </Badge>
              }
              iconPosition="start"
              label="Property Transfers"
              id="verification-tab-1"
              aria-controls="verification-tabpanel-1"
            />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          <RegisterQueue />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <TransferQueue />
        </TabPanel>
      </Box>
    </OfficerLayout>
  );
}
