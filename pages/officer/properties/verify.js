import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  TextField,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Alert,
  alpha,
  useTheme,
  Fade,
} from "@mui/material";
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Description as DescriptionIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
} from "@mui/icons-material";
import OfficerLayout from "@/components/layouts/OfficerLayout";
import ModernCard, {
  ModernCardContent,
  ModernCardHeader,
} from "@/components/ui/ModernCard";
import ModernButton from "@/components/ui/ModernButton";
import { SearchField } from "@/components/ui/ModernForm";
import LoadingSpinner from "@/components/ui/LoadingComponents";
import { useApi } from "@/lib/api";
import CalendarIcon from "@mui/icons-material/CalendarMonth";

const steps = [
  "Search Property",
  "Document Review",
  "Verification Decision",
  "Complete Verification",
];

export default function VerifyPropertyPage() {
  const theme = useTheme();
  const router = useRouter();
  const { getProperties, getPropertyById } = useApi();

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [verificationDecision, setVerificationDecision] = useState("");

  // Search properties
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const data = await getProperties();
      const filtered = data.filter(
        (property) =>
          (property.landName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (property.id || "").toString().includes(searchTerm) ||
          (property.ownerName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Select property for verification
  const handleSelectProperty = async (property) => {
    setSelectedProperty(property);
    setActiveStep(1);

    // Load property documents (mock data for now)
    setDocuments([
      {
        id: 1,
        name: "Land Deed",
        type: "deed",
        status: "verified",
        uploadDate: "2024-01-15",
      },
      {
        id: 2,
        name: "Survey Plan",
        type: "survey",
        status: "pending",
        uploadDate: "2024-01-18",
      },
      {
        id: 3,
        name: "Tax Certificate",
        type: "tax",
        status: "verified",
        uploadDate: "2024-01-20",
      },
    ]);
  };

  // Handle verification decision
  const handleVerificationDecision = (decision) => {
    setVerificationDecision(decision);
    setActiveStep(3);
  };

  // Complete verification
  const handleCompleteVerification = async () => {
    try {
      setLoading(true);
      // Here you would call the API to update the property status
      // await apiClient.property.update(selectedProperty.id, {
      //   status: verificationDecision,
      //   verificationNotes,
      //   verifiedBy: currentUser.id,
      //   verificationDate: new Date().toISOString()
      // });

      // Show success message and redirect
      router.push("/officer/properties");
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setSearchTerm("");
    setSearchResults([]);
    setSelectedProperty(null);
    setDocuments([]);
    setVerificationNotes("");
    setVerificationDecision("");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "verified":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
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
              Verify Property
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ opacity: 0.8, mb: 3 }}
            >
              Review and verify property registration documents
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {/* Stepper */}
          <Grid item xs={12} md={4}>
            <ModernCard variant="glass">
              <ModernCardContent>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                      <StepContent>
                        <Typography variant="body2" color="text.secondary">
                          {index === 0 &&
                            "Search for the property you want to verify"}
                          {index === 1 && "Review all submitted documents"}
                          {index === 2 && "Make your verification decision"}
                          {index === 3 && "Complete the verification process"}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>

                {activeStep > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <ModernButton
                      variant="outlined"
                      size="small"
                      onClick={handleReset}
                      fullWidth
                    >
                      Start Over
                    </ModernButton>
                  </Box>
                )}
              </ModernCardContent>
            </ModernCard>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <ModernCard variant="glass">
              <ModernCardContent>
                {/* Step 0: Search Property */}
                {activeStep === 0 && (
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Search Property
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      Enter property name, ID, or owner name to find the
                      property you want to verify.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                      <SearchField
                        placeholder="Search by property name, ID, or owner..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        sx={{ flex: 1 }}
                      />
                      <ModernButton
                        variant="gradient"
                        onClick={handleSearch}
                        disabled={!searchTerm.trim() || loading}
                      >
                        {loading ? <LoadingSpinner size={20} /> : "Search"}
                      </ModernButton>
                    </Box>

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          gutterBottom
                        >
                          Search Results ({searchResults.length})
                        </Typography>
                        <Grid container spacing={3}>
                          {searchResults.map((property) => (
                            <Grid item xs={12} sm={6} lg={4} key={property.id}>
                              <ModernCard
                                variant="glass"
                                interactive
                                sx={{
                                  height: "100%",
                                  minHeight: 380,
                                  maxHeight: 380,
                                  display: "flex",
                                  flexDirection: "column",
                                  cursor: "pointer",
                                  "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: theme.shadows[8],
                                  },
                                }}
                              >
                                {/* Status Badge */}
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 12,
                                    left: 12,
                                    zIndex: 1,
                                  }}
                                >
                                  <Chip
                                    label={property.status || "Unknown"}
                                    color={getStatusColor(property.status)}
                                    size="small"
                                    sx={{
                                      backdropFilter: "blur(10px)",
                                      fontWeight: 600,
                                    }}
                                  />
                                </Box>

                                <ModernCardContent
                                  sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    position: "relative",
                                  }}
                                >
                                  {/* Main Content */}
                                  <Box sx={{ flex: 1 }}>
                                    {/* Property Title */}
                                    <Box sx={{ mb: 2, mt: 3 }}>
                                      <Typography
                                        variant="h6"
                                        fontWeight={600}
                                        gutterBottom
                                        sx={{
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                          lineHeight: 1.2,
                                        }}
                                      >
                                        {property.landName ||
                                          `Property #${property.id}`}
                                      </Typography>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 0.5,
                                          mb: 1,
                                          minHeight: 24,
                                        }}
                                      >
                                        <LocationIcon
                                          sx={{
                                            fontSize: 16,
                                            color: "text.secondary",
                                          }}
                                        />
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            flex: 1,
                                          }}
                                        >
                                          {property.location || "N/A"}
                                        </Typography>
                                      </Box>
                                    </Box>

                                    {/* Property Details */}
                                    <Box sx={{ mb: 2 }}>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Owner:</strong>{" "}
                                        {property.ownerName || "N/A"}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Area:</strong>{" "}
                                        {property.area || "N/A"}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        <strong>Type:</strong>{" "}
                                        {property.landType || "N/A"}
                                      </Typography>
                                    </Box>
                                  </Box>

                                  {/* Footer with Select Button */}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      pt: 2,
                                      borderTop: `1px solid ${alpha(
                                        theme.palette.divider,
                                        0.1
                                      )}`,
                                    }}
                                  >
                                    <ModernButton
                                      size="small"
                                      onClick={() =>
                                        handleSelectProperty(property)
                                      }
                                    >
                                      Select Property
                                    </ModernButton>
                                  </Box>
                                </ModernCardContent>
                              </ModernCard>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Step 1: Document Review */}
                {activeStep === 1 && selectedProperty && (
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Document Review
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      Review all submitted documents for{" "}
                      {selectedProperty.landName ||
                        `Property #${selectedProperty.id}`}
                    </Typography>

                    {/* Property Info */}
                    <Alert severity="info" sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Property Information
                      </Typography>
                      <Typography variant="body2">
                        <strong>Name:</strong>{" "}
                        {selectedProperty.landName || "N/A"} <br />
                        <strong>Owner:</strong>{" "}
                        {selectedProperty.ownerName || "N/A"} <br />
                        <strong>Location:</strong>{" "}
                        {selectedProperty.location || "N/A"} <br />
                        <strong>Area:</strong> {selectedProperty.area || "N/A"}
                      </Typography>
                    </Alert>

                    {/* Documents List */}
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Submitted Documents
                    </Typography>
                    <List>
                      {documents.map((doc) => (
                        <ListItem
                          key={doc.id}
                          sx={{
                            border: `1px solid ${alpha(
                              theme.palette.divider,
                              0.1
                            )}`,
                            borderRadius: theme.shape.borderRadius,
                            mb: 1,
                          }}
                        >
                          <ListItemIcon>
                            <DescriptionIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={doc.name}
                            secondary={
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <CalendarIcon sx={{ fontSize: 14 }} />
                                <Typography variant="caption">
                                  Uploaded:{" "}
                                  {new Date(
                                    doc.uploadDate
                                  ).toLocaleDateString()}
                                </Typography>
                                <Chip
                                  label={doc.status}
                                  color={getStatusColor(doc.status)}
                                  size="small"
                                />
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton size="small" color="primary">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton size="small" color="primary">
                              <DownloadIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>

                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <ModernButton
                        variant="gradient"
                        onClick={() => setActiveStep(2)}
                      >
                        Proceed to Decision
                      </ModernButton>
                    </Box>
                  </Box>
                )}

                {/* Step 2: Verification Decision */}
                {activeStep === 2 && (
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Verification Decision
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      Make your verification decision based on the document
                      review.
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Verification Notes
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Add your verification notes here..."
                        value={verificationNotes}
                        onChange={(e) => setVerificationNotes(e.target.value)}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Decision
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <ModernButton
                          variant={
                            verificationDecision === "approved"
                              ? "contained"
                              : "outlined"
                          }
                          color="success"
                          startIcon={<ThumbUpIcon />}
                          onClick={() => handleVerificationDecision("approved")}
                        >
                          Approve
                        </ModernButton>
                        <ModernButton
                          variant={
                            verificationDecision === "rejected"
                              ? "contained"
                              : "outlined"
                          }
                          color="error"
                          startIcon={<ThumbDownIcon />}
                          onClick={() => handleVerificationDecision("rejected")}
                        >
                          Reject
                        </ModernButton>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Step 3: Complete Verification */}
                {activeStep === 3 && (
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Complete Verification
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      Review your decision and complete the verification
                      process.
                    </Typography>

                    <Alert
                      severity={
                        verificationDecision === "approved"
                          ? "success"
                          : "warning"
                      }
                      sx={{ mb: 3 }}
                    >
                      <Typography variant="subtitle2">
                        Decision:{" "}
                        {verificationDecision === "approved"
                          ? "APPROVED"
                          : "REJECTED"}
                      </Typography>
                      <Typography variant="body2">
                        Property:{" "}
                        {selectedProperty?.landName ||
                          `Property #${selectedProperty?.id}`}
                      </Typography>
                    </Alert>

                    {verificationNotes && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Your Notes:
                        </Typography>
                        <Paper
                          sx={{
                            p: 2,
                            bgcolor: alpha(theme.palette.background.paper, 0.5),
                          }}
                        >
                          <Typography variant="body2">
                            {verificationNotes}
                          </Typography>
                        </Paper>
                      </Box>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button onClick={() => setActiveStep(2)}>Back</Button>
                      <ModernButton
                        variant="gradient"
                        onClick={handleCompleteVerification}
                        disabled={loading}
                      >
                        {loading ? (
                          <LoadingSpinner size={20} />
                        ) : (
                          "Complete Verification"
                        )}
                      </ModernButton>
                    </Box>
                  </Box>
                )}
              </ModernCardContent>
            </ModernCard>
          </Grid>
        </Grid>
      </Box>
    </OfficerLayout>
  );
}
