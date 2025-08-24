import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
  Fade,
} from "@mui/material";
import {
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon,
  SwapHoriz as SwapHorizIcon,
  Speed as SpeedIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import OfficerLayout from "@/components/layouts/OfficerLayout";
import ModernCard, {
  ModernCardContent,
  ModernCardHeader,
} from "@/components/ui/ModernCard";
import ModernButton from "@/components/ui/ModernButton";
import LoadingSpinner from "@/components/ui/LoadingComponents";
import { useApi } from "@/lib/api";

const reportTypes = [
  {
    id: "verification-summary",
    title: "Verification Summary",
    description: "Summary of property verifications by status",
    icon: <CheckCircleIcon />,
    category: "Verification",
  },
  {
    id: "transaction-report",
    title: "Transaction Report",
    description: "Detailed report of all transactions",
    icon: <SwapHorizIcon />,
    category: "Transactions",
  },
  {
    id: "property-registrations",
    title: "Property Registrations",
    description: "Report on property registration activities",
    icon: <AssignmentIcon />,
    category: "Properties",
  },
  {
    id: "performance-metrics",
    title: "Performance Metrics",
    description: "Officer performance and processing times",
    icon: <SpeedIcon />,
    category: "Performance",
  },
  {
    id: "monthly-summary",
    title: "Monthly Summary",
    description: "Comprehensive monthly activity report",
    icon: <BarChartIcon />,
    category: "Summary",
  },
  {
    id: "trend-analysis",
    title: "Trend Analysis",
    description: "Property market trends and patterns",
    icon: <TimelineIcon />,
    category: "Analysis",
  },
];

const recentReports = [
  {
    id: 1,
    name: "Monthly Verification Report - January 2024",
    type: "Verification Summary",
    generatedDate: "2024-01-31",
    status: "completed",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Transaction Analysis Q4 2023",
    type: "Transaction Report",
    generatedDate: "2024-01-15",
    status: "completed",
    size: "5.1 MB",
  },
  {
    id: 3,
    name: "Property Registration Trends",
    type: "Trend Analysis",
    generatedDate: "2024-01-10",
    status: "processing",
    size: "3.2 MB",
  },
];

const ReportCard = ({ report, onGenerate }) => {
  const theme = useTheme();

  const getCategoryColor = (category) => {
    switch (category) {
      case "Verification":
        return theme.palette.success.main;
      case "Transactions":
        return theme.palette.info.main;
      case "Properties":
        return theme.palette.primary.main;
      case "Performance":
        return theme.palette.warning.main;
      case "Summary":
        return theme.palette.secondary.main;
      case "Analysis":
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 25px ${alpha(
            getCategoryColor(report.category),
            0.15
          )}`,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              backgroundColor: alpha(getCategoryColor(report.category), 0.1),
              color: getCategoryColor(report.category),
            }}
          >
            {report.icon}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {report.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {report.description}
            </Typography>
            <Chip
              label={report.category}
              size="small"
              sx={{
                backgroundColor: alpha(getCategoryColor(report.category), 0.1),
                color: getCategoryColor(report.category),
              }}
            />
          </Box>
        </Box>
        <ModernButton
          variant="outlined"
          fullWidth
          onClick={() => onGenerate(report)}
          startIcon={<AssessmentIcon />}
        >
          Generate Report
        </ModernButton>
      </CardContent>
    </Card>
  );
};

export default function ReportsPage() {
  const theme = useTheme();
  const router = useRouter();
  const { getProperties, getTransactions } = useApi();

  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [format, setFormat] = useState("pdf");
  const [generatingReport, setGeneratingReport] = useState(null);

  // Dashboard statistics
  const [stats, setStats] = useState({
    totalProperties: 0,
    verifiedProperties: 0,
    pendingVerifications: 0,
    totalTransactions: 0,
    completedTransactions: 0,
    processingTime: 0,
  });

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [properties, transactions] = await Promise.all([
          getProperties(),
          getTransactions(),
        ]);

        const verifiedCount = properties.filter(
          (p) =>
            (p.status || "").toLowerCase() === "verified" ||
            (p.status || "").toLowerCase() === "approved"
        ).length;

        const pendingCount = properties.filter(
          (p) => (p.status || "").toLowerCase() === "pending"
        ).length;

        const completedTxCount = transactions.filter(
          (t) => (t.status || "").toLowerCase() === "completed"
        ).length;

        setStats({
          totalProperties: properties.length,
          verifiedProperties: verifiedCount,
          pendingVerifications: pendingCount,
          totalTransactions: transactions.length,
          completedTransactions: completedTxCount,
          processingTime: 2.5, // Mock average processing time in days
        });
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    };

    loadDashboardData();
  }, [getProperties, getTransactions]);

  const handleGenerateReport = async (report) => {
    setGeneratingReport(report.id);
    try {
      // Here you would call the API to generate the report
      // const reportData = await apiClient.reports.generate({
      //   type: report.id,
      //   dateFrom,
      //   dateTo,
      //   format
      // });

      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would download the generated report
      console.log(`Generated report: ${report.title}`);
    } catch (error) {
      console.error("Failed to generate report:", error);
    } finally {
      setGeneratingReport(null);
    }
  };

  const handleQuickReport = (reportId) => {
    setSelectedReport(reportId);
    const report = reportTypes.find((r) => r.id === reportId);
    if (report) {
      handleGenerateReport(report);
    }
  };

  const handleDownloadReport = (reportId) => {
    // Download existing report
    console.log(`Downloading report: ${reportId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "processing":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
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
              Reports & Analytics
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ opacity: 0.8 }}
            >
              Generate reports and view system analytics
            </Typography>
          </Box>
        </Fade>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2}>
            <ModernCard variant="glass">
              <ModernCardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" color="primary.main">
                  {stats.totalProperties}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Properties
                </Typography>
              </ModernCardContent>
            </ModernCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <ModernCard variant="glass">
              <ModernCardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  {stats.verifiedProperties}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Verified
                </Typography>
              </ModernCardContent>
            </ModernCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <ModernCard variant="glass">
              <ModernCardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" color="warning.main">
                  {stats.pendingVerifications}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
              </ModernCardContent>
            </ModernCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <ModernCard variant="glass">
              <ModernCardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" color="info.main">
                  {stats.totalTransactions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transactions
                </Typography>
              </ModernCardContent>
            </ModernCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <ModernCard variant="glass">
              <ModernCardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  {stats.completedTransactions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </ModernCardContent>
            </ModernCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <ModernCard variant="glass">
              <ModernCardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="secondary.main"
                >
                  {stats.processingTime}d
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg. Processing
                </Typography>
              </ModernCardContent>
            </ModernCard>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Report Generation */}
          <Grid item xs={12} lg={8}>
            <ModernCard variant="glass" sx={{ mb: 3 }}>
              <ModernCardHeader>
                <Typography variant="h6" fontWeight={600}>
                  Generate Custom Report
                </Typography>
              </ModernCardHeader>
              <ModernCardContent>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Report Type</InputLabel>
                      <Select
                        value={selectedReport}
                        label="Report Type"
                        onChange={(e) => setSelectedReport(e.target.value)}
                      >
                        {reportTypes.map((report) => (
                          <MenuItem key={report.id} value={report.id}>
                            {report.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Format</InputLabel>
                      <Select
                        value={format}
                        label="Format"
                        onChange={(e) => setFormat(e.target.value)}
                      >
                        <MenuItem value="pdf">PDF</MenuItem>
                        <MenuItem value="excel">Excel</MenuItem>
                        <MenuItem value="csv">CSV</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="From Date"
                      value={
                        dateFrom ? dateFrom.toISOString().split("T")[0] : ""
                      }
                      onChange={(e) =>
                        setDateFrom(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="To Date"
                      value={dateTo ? dateTo.toISOString().split("T")[0] : ""}
                      onChange={(e) =>
                        setDateTo(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>

                <ModernButton
                  variant="gradient"
                  onClick={() => {
                    const report = reportTypes.find(
                      (r) => r.id === selectedReport
                    );
                    if (report) handleGenerateReport(report);
                  }}
                  disabled={
                    !selectedReport || generatingReport === selectedReport
                  }
                  startIcon={
                    generatingReport === selectedReport ? (
                      <LoadingSpinner size={20} />
                    ) : (
                      <AssessmentIcon />
                    )
                  }
                >
                  {generatingReport === selectedReport
                    ? "Generating..."
                    : "Generate Report"}
                </ModernButton>
              </ModernCardContent>
            </ModernCard>

            {/* Quick Report Templates */}
            <ModernCard variant="glass">
              <ModernCardHeader>
                <Typography variant="h6" fontWeight={600}>
                  Quick Report Templates
                </Typography>
              </ModernCardHeader>
              <ModernCardContent>
                <Grid container spacing={2}>
                  {reportTypes.map((report) => (
                    <Grid item xs={12} md={6} key={report.id}>
                      <ReportCard
                        report={report}
                        onGenerate={handleGenerateReport}
                      />
                    </Grid>
                  ))}
                </Grid>
              </ModernCardContent>
            </ModernCard>
          </Grid>

          {/* Recent Reports */}
          <Grid item xs={12} lg={4}>
            <ModernCard variant="glass">
              <ModernCardHeader>
                <Typography variant="h6" fontWeight={600}>
                  Recent Reports
                </Typography>
              </ModernCardHeader>
              <ModernCardContent>
                <List disablePadding>
                  {recentReports.map((report, index) => (
                    <ListItem
                      key={report.id}
                      sx={{
                        border: `1px solid ${alpha(
                          theme.palette.divider,
                          0.1
                        )}`,
                        borderRadius: theme.shape.borderRadius,
                        mb: 1,
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.04
                          ),
                        },
                      }}
                    >
                      <ListItemIcon>
                        <AssessmentIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" fontWeight={600}>
                            {report.name}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {report.type} •{" "}
                              {new Date(
                                report.generatedDate
                              ).toLocaleDateString()}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mt: 0.5,
                              }}
                            >
                              <Chip
                                label={report.status}
                                color={getStatusColor(report.status)}
                                size="small"
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {report.size}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        {report.status === "completed" ? (
                          <IconButton
                            size="small"
                            onClick={() => handleDownloadReport(report.id)}
                          >
                            <DownloadIcon />
                          </IconButton>
                        ) : (
                          <Box sx={{ width: 24, height: 24 }}>
                            <LinearProgress size={20} />
                          </Box>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </ModernCardContent>
            </ModernCard>
          </Grid>
        </Grid>
      </Box>
    </OfficerLayout>
  );
}
