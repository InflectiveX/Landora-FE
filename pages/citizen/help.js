"use client";
import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Chip,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Help as HelpIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Description as DescriptionIcon,
  Security as SecurityIcon,
  AccountBalance as AccountBalanceIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import CitizenLayout from "@/components/layouts/CitizenLayout";

export default function Help() {
  const { enqueueSnackbar } = useSnackbar();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const faqData = [
    {
      category: "registration",
      question: "How do I register a new property?",
      answer:
        "Use Register Property and follow steps: info, documents, review.",
    },
    {
      category: "verification",
      question: "How long does verification take?",
      answer: "Typically 3-5 business days with email notifications.",
    },
    {
      category: "transfer",
      question: "How can I transfer ownership?",
      answer:
        "Start from the property details, provide buyer info and documents.",
    },
    {
      category: "documents",
      question: "What documents are required?",
      answer:
        "Title Deed, Survey Plan, previous records (if any), tax receipts.",
    },
    {
      category: "blockchain",
      question: "How does blockchain protect my property?",
      answer: "Property is minted as NFT; tamper-proof ownership record.",
    },
    {
      category: "security",
      question: "Is my personal info secure?",
      answer: "Yes, industry-standard encryption and RBAC are used.",
    },
  ];

  const userGuides = [
    {
      title: "Property Registration Guide",
      description: "Step-by-step guide for registering properties",
      icon: <DescriptionIcon />,
    },
    {
      title: "Document Requirements",
      description: "Required documents and formats",
      icon: <SecurityIcon />,
    },
    {
      title: "Property Transfer Process",
      description: "Guide for transferring ownership",
      icon: <AccountBalanceIcon />,
    },
    {
      title: "Blockchain Verification",
      description: "Understanding certification",
      icon: <CheckCircleIcon />,
    },
  ];

  const systemStatus = {
    services: [
      { name: "Property Registration", status: "operational", uptime: "99.9%" },
      { name: "Document Upload", status: "operational", uptime: "99.8%" },
      {
        name: "Blockchain Integration",
        status: "operational",
        uptime: "99.7%",
      },
      { name: "Email Notifications", status: "operational", uptime: "99.5%" },
    ],
  };

  const getStatusColor = (s) =>
    ({ operational: "success", degraded: "warning", outage: "error" }[s] ||
    "default");
  const getStatusIcon = (s) =>
    s === "operational" ? (
      <CheckCircleIcon color="success" />
    ) : s === "degraded" ? (
      <WarningIcon color="warning" />
    ) : s === "outage" ? (
      <ErrorIcon color="error" />
    ) : (
      <HelpIcon />
    );

  const filteredFAQs = faqData.filter(
    (f) =>
      (f.question + f.answer)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || f.category === selectedCategory)
  );

  const categories = [
    { value: "all", label: "All" },
    { value: "registration", label: "Registration" },
    { value: "verification", label: "Verification" },
    { value: "transfer", label: "Transfer" },
    { value: "documents", label: "Documents" },
    { value: "blockchain", label: "Blockchain" },
    { value: "security", label: "Security" },
  ];

  return (
    <CitizenLayout>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: { xs: 2, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            sx={{ mb: 4 }}
          >
            Help & Support Center
          </Typography>
          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            sx={{ mb: 4 }}
          >
            <Tab label="FAQ" />
            <Tab label="User Guides" />
            <Tab label="Contact" />
            <Tab label="System Status" />
          </Tabs>

          {activeTab === 0 && (
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <HelpIcon sx={{ mr: 1, color: "primary.main" }} />
                Frequently Asked Questions
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {categories.map((c) => (
                      <Chip
                        key={c.value}
                        label={c.label}
                        onClick={() => setSelectedCategory(c.value)}
                        color={
                          selectedCategory === c.value ? "primary" : "default"
                        }
                        variant={
                          selectedCategory === c.value ? "filled" : "outlined"
                        }
                        size="small"
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
              {filteredFAQs.map((faq, i) => (
                <Accordion key={i} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
              {filteredFAQs.length === 0 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No FAQs found.
                  </Typography>
                </Box>
              )}
            </Paper>
          )}

          {activeTab === 1 && (
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <DescriptionIcon sx={{ mr: 1, color: "primary.main" }} />
                User Guides
              </Typography>
              <Grid container spacing={3}>
                {userGuides.map((g, i) => (
                  <Grid xs={12} sm={6} md={3} key={i}>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          {g.icon}
                          <Typography
                            variant="h6"
                            sx={{ ml: 1, fontWeight: 600 }}
                          >
                            {g.title}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {g.description}
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          onClick={() =>
                            enqueueSnackbar(`Downloading ${g.title}...`, {
                              variant: "success",
                            })
                          }
                          fullWidth
                        >
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {activeTab === 2 && (
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
                Contact Support
              </Typography>
              <Grid container spacing={4}>
                <Grid xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Get in Touch
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <EmailIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Email"
                            secondary="support@landregistry.gov.lk"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PhoneIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Phone"
                            secondary="+94 11 2 123 456"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ChatIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Live Chat" secondary="24/7" />
                        </ListItem>
                      </List>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => setContactDialogOpen(true)}
                        sx={{ mt: 2 }}
                      >
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Support Hours
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Mon - Fri"
                            secondary="8:00 AM - 6:00 PM (IST)"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Saturday"
                            secondary="9:00 AM - 1:00 PM (IST)"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Sunday" secondary="Closed" />
                        </ListItem>
                      </List>
                      <Alert severity="info" sx={{ mt: 2 }}>
                        For urgent matters, use the emergency form.
                      </Alert>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Dialog
                open={contactDialogOpen}
                onClose={() => setContactDialogOpen(false)}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle>Contact Support</DialogTitle>
                <DialogContent>
                  <Box
                    component="form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      enqueueSnackbar(
                        "Message sent. We will respond within 24 hours.",
                        { variant: "success" }
                      );
                      setContactDialogOpen(false);
                    }}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      fullWidth
                      label="Subject"
                      required
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      required
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      required
                      sx={{ mb: 2 }}
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setContactDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      enqueueSnackbar(
                        "Message sent. We will respond within 24 hours.",
                        { variant: "success" }
                      );
                      setContactDialogOpen(false);
                    }}
                  >
                    Send
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
          )}

          {activeTab === 3 && (
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ScheduleIcon sx={{ mr: 1, color: "primary.main" }} />
                System Status
              </Typography>
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="h6">All systems operational</Typography>
                <Typography variant="body2">Uptime 99.9%.</Typography>
              </Alert>
              <Grid container spacing={2}>
                {systemStatus.services.map((s, i) => (
                  <Grid xs={12} sm={6} md={3} key={i}>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          {getStatusIcon(s.status)}
                          <Typography variant="h6" sx={{ ml: 1 }}>
                            {s.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Uptime: {s.uptime}
                        </Typography>
                        <Chip
                          label={s.status}
                          color={getStatusColor(s.status)}
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </Container>
      </Box>
    </CitizenLayout>
  );
}
