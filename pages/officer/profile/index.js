"use client";
import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  Fade,
} from "@mui/material";
import {
  Person as PersonIcon,
  Security as SecurityIcon,
  Work as WorkIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";
import OfficerLayout from "@/components/layouts/OfficerLayout";

// Import the new component tabs
import PersonalInfoTab from "./components/PersonalInfoTab";
import OfficialInfoTab from "./components/OfficialInfoTab";
import SecurityTab from "./components/SecurityTab";
import ActivityTab from "./components/ActivityTab";
import SettingsTab from "./components/SettingsTab";

export default function OfficerProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || "Officer John Smith",
    email: user?.email || "john.smith@landora.gov.lk",
    phone: "+94 77 123 4567",
    nicNumber: user?.nic || "912345678V",
    employeeId: user?.employeeId || "OFF001",
    department: user?.department || "Land Registry Department",
    position: user?.position || "Senior Land Officer",
    address: "123 Government Quarter, Colombo 07",
  });

  const tabs = [
    {
      label: "Personal Info",
      icon: <PersonIcon />,
      component: (
        <PersonalInfoTab
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          user={user}
        />
      ),
    },
    {
      label: "Official Info",
      icon: <WorkIcon />,
      component: <OfficialInfoTab userInfo={userInfo} user={user} />,
    },
    {
      label: "Security",
      icon: <SecurityIcon />,
      component: <SecurityTab />,
    },
    {
      label: "Activity",
      icon: <HistoryIcon />,
      component: <ActivityTab />,
    },
    {
      label: "Settings",
      icon: <SettingsIcon />,
      component: <SettingsTab />,
    },
  ];

  return (
    <OfficerLayout>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        {/* Professional Header */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ p: 4, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h4" fontWeight={600} color="text.primary" gutterBottom>
              Officer Profile
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your profile information and account settings
            </Typography>
          </Box>
        </Paper>

        {/* Professional Tabs */}
        <Paper
          elevation={1}
          sx={{ borderRadius: 2 }}
        >
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "grey.50" }}
          >
            <Tabs
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              variant="fullWidth"
              sx={{
                "& .MuiTab-root": {
                  minHeight: 72,
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  flexDirection: "column",
                  gap: 0.5,
                  color: "text.secondary",
                  "&.Mui-selected": {
                    color: "primary.main",
                    bgcolor: "background.paper",
                    fontWeight: 600,
                  },
                },
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: 1.5,
                },
              }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  label={tab.label}
                  iconPosition="top"
                />
              ))}
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ minHeight: "70vh" }}>
            {tabs.map((tab, index) => (
              <Fade
                key={index}
                in={activeTab === index}
                timeout={300}
                unmountOnExit
              >
                <Box>{activeTab === index && tab.component}</Box>
              </Fade>
            ))}
          </Box>
        </Paper>
      </Container>
    </OfficerLayout>
  );
}
