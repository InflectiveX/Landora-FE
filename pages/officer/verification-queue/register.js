import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  alpha,
  useTheme,
  Fade,
  Grow,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import ModernCard, {
  ModernCardContent,
  ModernCardHeader,
} from "@/components/ui/ModernCard";
import ModernButton from "@/components/ui/ModernButton";
import { SearchField } from "@/components/ui/ModernForm";
import LoadingSpinner, {
  CardSkeleton,
} from "@/components/ui/LoadingComponents";
import ModernDialog from "@/components/ui/ModernDialog";
import { createStaggerAnimation, createHoverLift } from "@/lib/animations";
import { useApi } from "@/lib/api";
import OfficerLayout from "@/components/layouts/OfficerLayout";

const RegisterCard = ({
  registration,
  index,
  onApprove,
  onReject,
  onViewDetails,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
      case "under_review":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  return (
    <Grow
      in={true}
      timeout={600}
      style={{
        transformOrigin: "0 0 0",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <ModernCard
        variant="glass"
        interactive
        sx={{
          height: "100%",
          minHeight: 380,
          maxHeight: 380,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          ...createHoverLift(-4),
        }}
      >
        {/* Status Badge */}
        <Box sx={{ position: "absolute", top: 12, left: 12, zIndex: 1 }}>
          <Chip
            label={registration.status || "Pending"}
            color={getStatusColor(registration.status)}
            size="small"
            sx={{
              backdropFilter: "blur(10px)",
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Actions Menu */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setAnchorEl(e.currentTarget);
          }}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 1,
            backgroundColor: alpha(
              theme.palette.background?.paper || "#ffffff",
              0.9
            ),
            backdropFilter: "blur(10px)",
            "&:hover": {
              backgroundColor: alpha(
                theme.palette.background?.paper || "#ffffff",
                1
              ),
            },
          }}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onViewDetails(registration);
            }}
          >
            <VisibilityIcon sx={{ mr: 1 }} fontSize="small" />
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onApprove(registration);
            }}
          >
            <CheckCircleIcon sx={{ mr: 1 }} fontSize="small" />
            Approve
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onReject(registration);
            }}
          >
            <CancelIcon sx={{ mr: 1 }} fontSize="small" />
            Reject
          </MenuItem>
        </Menu>

        <ModernCardContent
          onClick={() => onViewDetails(registration)}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Property Title & Details */}
          <Box sx={{ mb: 2, mt: 3, width: 200 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {registration.landName || `Registration #${registration.id}`}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                Province : {registration.province || "N/A"}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                District : {registration.district || "N/A"}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
            >
              <LocationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                Address : {registration.address || "N/A"}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
            >
              <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                Owner: {registration.owner_name || "N/A"}
              </Typography>
            </Box>
          </Box>

          {/* Property Details */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Area
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {registration.land_area + " sqm" || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="caption" color="text.secondary">
                Type
              </Typography>
              <Typography variant="body2" fontWeight={600} color="primary.main">
                {registration.property_type || "N/A"}
              </Typography>
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarIcon sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                {formatDate(registration.registration_date)}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              ID: {registration.id}
            </Typography>
          </Box>
        </ModernCardContent>
      </ModernCard>
    </Grow>
  );
};

export default function RegisterQueue() {
  const theme = useTheme();
  const { getProperties, getRegisterByLandId } = useApi();

  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [actionNotes, setActionNotes] = useState("");
  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
      case "under_review":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  // Load registration data
  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        // Filter for pending registrations
        const pendingRegistrations = data.filter(
          (property) =>
            (property.status || "").toLowerCase() === "pending" ||
            (property.status || "").toLowerCase() === "under_review"
        );
        setRegistrations(pendingRegistrations);
      } catch (error) {
        console.error("Failed to load registrations:", error);
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    };

    loadRegistrations();
  }, [getProperties]);

  const filteredRegistrations = registrations.filter((registration) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (registration.landName || "").toLowerCase().includes(searchTermLower) ||
      (registration.ownerName || "").toLowerCase().includes(searchTermLower) ||
      (registration.location || "").toLowerCase().includes(searchTermLower) ||
      (registration.id || "").toString().includes(searchTermLower)
    );
  });

  const handleViewDetails = async (registration) => {
    setSelectedRegistration(registration);
    setDetailsDialogOpen(true);
    setDocsLoading(true);
    setDocuments([]);
    try {
      // Use getRegisterByLandId to fetch registration documents
      const propId =
        registration.property_id || registration.id || registration.land_id;
      let docs = [];
      if (propId && typeof getRegisterByLandId === "function") {
        docs = await getRegisterByLandId(propId);
      }
      // Defensive: flatten if nested under .documents
      if (docs && typeof docs === "object" && Array.isArray(docs.documents)) {
        docs = docs.documents;
      }
      setDocuments(Array.isArray(docs) ? docs : []);
    } catch (e) {
      setDocuments([]);
    } finally {
      setDocsLoading(false);
    }
  };

  const handleApprove = (registration) => {
    setSelectedRegistration(registration);
    setApproveDialogOpen(true);
  };

  const handleReject = (registration) => {
    setSelectedRegistration(registration);
    setRejectDialogOpen(true);
  };

  const handleApproveSubmit = async () => {
    try {
      await apiClient.property.update(selectedRegistration.id, {
        status: "approved",
        approvalNotes: actionNotes,
        approvedBy: currentUser.id,
        approvalDate: new Date().toISOString(),
      });

      setApproveDialogOpen(false);
      setActionNotes("");
      setSelectedRegistration(null);
      // Refresh the list
      // loadRegistrations();
    } catch (error) {
      console.error("Failed to approve registration:", error);
    }
  };

  const handleRejectSubmit = async () => {
    try {
      await apiClient.property.update(selectedRegistration.id, {
        status: "rejected",
        rejectionNotes: actionNotes,
        rejectedBy: currentUser.id,
        rejectionDate: new Date().toISOString(),
      });

      setRejectDialogOpen(false);
      setActionNotes("");
      setSelectedRegistration(null);
      // Refresh the list
      loadRegistrations();
    } catch (error) {
      console.error("Failed to reject registration:", error);
    }
  };

  return (
    <OfficerLayout>
      <Box>
        {/* Search */}
        <Box sx={{ mb: 3 }}>
          <SearchField
            placeholder="Search registrations by property name, owner, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 500 }}
          />
        </Box>

        {/* Registrations Grid */}
        {loading ? (
          <Grid container spacing={3}>
            {Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <ModernCard variant="glass">
                  <CardSkeleton lines={4} hasActions />
                </ModernCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {filteredRegistrations.map((registration, index) => (
              <Grid item xs={12} sm={6} lg={4} key={registration.id}>
                <RegisterCard
                  registration={registration}
                  index={index}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onViewDetails={handleViewDetails}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!loading && filteredRegistrations.length === 0 && (
          <Fade in timeout={600}>
            <ModernCard variant="outlined" sx={{ textAlign: "center", py: 6 }}>
              <ModernCardContent>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <AssignmentIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  No pending registrations
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  All property registration requests have been processed
                </Typography>
              </ModernCardContent>
            </ModernCard>
          </Fade>
        )}

        {/* Details Dialog */}
        <ModernDialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          title={`Registration Details: ${
            selectedRegistration?.landName ||
            `Registration #${selectedRegistration?.id}`
          }`}
          size="small"
          variant="glass"
          sx={{
            "& .MuiDialog-paper": {
              maxWidth: "1000px",
              width: "100%",
            },
          }}
          actions={
            <>
              <Button
                onClick={() => setDetailsDialogOpen(false)}
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.action.hover, 0.1),
                  },
                }}
              >
                Close
              </Button>
              <ModernButton
                variant="outlined"
                color="error"
                onClick={() => {
                  setDetailsDialogOpen(false);
                  handleReject(selectedRegistration);
                }}
                sx={{ minWidth: 100 }}
              >
                Reject
              </ModernButton>
              <ModernButton
                variant="gradient"
                onClick={() => {
                  setDetailsDialogOpen(false);
                  handleApprove(selectedRegistration);
                }}
                sx={{ minWidth: 100 }}
              >
                Approve
              </ModernButton>
            </>
          }
        >
          {selectedRegistration && (
            <Box sx={{ py: 1 }}>
              {/* Property Overview Card */}
              <ModernCard variant="outlined" sx={{ mb: 3, p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AssignmentIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Registration Overview
                  </Typography>
                  <Chip
                    label={selectedRegistration.status || "Unknown"}
                    color={getStatusColor(selectedRegistration.status)}
                    size="small"
                    sx={{ ml: "auto" }}
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Property Name
                    </Typography>
                    <Typography variant="body1" fontWeight={500} gutterBottom>
                      {selectedRegistration.landName || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Estimated Value
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="primary.main"
                    >
                      {selectedRegistration.estimated_value || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Land Type
                    </Typography>
                    <Typography variant="body2">
                      {selectedRegistration.property_type || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Location
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {selectedRegistration.address || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Area
                    </Typography>
                    <Typography variant="body2">
                      {selectedRegistration.land_area
                        ? `${selectedRegistration.land_area} sqm`
                        : "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Owner
                    </Typography>
                    <Typography variant="body2">
                      {selectedRegistration.owner_name || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </ModernCard>

              {/* Documents Section */}
              <ModernCard variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <DescriptionIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Submitted Documents
                  </Typography>
                </Box>

                {docsLoading ? (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", py: 3 }}
                  >
                    <LoadingSpinner size={24} />
                  </Box>
                ) : documents && documents.length ? (
                  <List sx={{ py: 0 }}>
                    {documents.map((doc) => (
                      <ListItem
                        key={doc.id}
                        sx={{
                          px: 0,
                          py: 1,
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.action.hover,
                              0.05
                            ),
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <DescriptionIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" fontWeight={500}>
                              {doc.name || doc.title || `Document ${doc.id}`}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {doc.description || doc.type || ""}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              const docUrl = doc.url || doc.path || "";
                              try {
                                const lower = (docUrl || "").toLowerCase();
                                if (
                                  lower.endsWith(".pdf") ||
                                  lower.includes("/pdf/")
                                ) {
                                  window.open(
                                    `/pdf-viewer?url=${encodeURIComponent(
                                      docUrl
                                    )}`,
                                    "_blank"
                                  );
                                } else {
                                  window.open(
                                    docUrl || "",
                                    "_blank",
                                    "noopener"
                                  );
                                }
                              } catch (e) {
                                window.open(docUrl || "", "_blank", "noopener");
                              }
                            }}
                            sx={{
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1
                              ),
                              "&:hover": {
                                backgroundColor: alpha(
                                  theme.palette.primary.main,
                                  0.2
                                ),
                              },
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: "center", py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No documents found for this registration.
                    </Typography>
                  </Box>
                )}
              </ModernCard>
            </Box>
          )}
        </ModernDialog>

        {/* Approve Dialog */}
        <ModernDialog
          open={approveDialogOpen}
          onClose={() => setApproveDialogOpen(false)}
          title="Approve Registration"
          size="small"
          variant="glass"
          actions={
            <>
              <Button
                onClick={() => setApproveDialogOpen(false)}
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.action.hover, 0.1),
                  },
                }}
              >
                Cancel
              </Button>
              <ModernButton
                variant="gradient"
                onClick={handleApproveSubmit}
                sx={{ minWidth: 150 }}
              >
                Approve Registration
              </ModernButton>
            </>
          }
        >
          <Box sx={{ py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <CheckCircleIcon
                sx={{ color: "success.main", mr: 2, fontSize: 28 }}
              />
              <Box>
                <Typography variant="h6" fontWeight={600} color="success.main">
                  Approve Property Registration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This action will approve the registration request
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Are you sure you want to approve this property registration? This
              action will:
            </Typography>

            <Box sx={{ mb: 3, ml: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Register the property in the official records
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Issue a property title deed
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Notify the property owner
              </Typography>
              <Typography variant="body2">
                • Make the property available for future transactions
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Approval Notes (Optional)"
              placeholder="Add any notes about the approval decision..."
              value={actionNotes}
              onChange={(e) => setActionNotes(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                },
              }}
            />
          </Box>
        </ModernDialog>

        {/* Reject Dialog */}
        <ModernDialog
          open={rejectDialogOpen}
          onClose={() => setRejectDialogOpen(false)}
          title="Reject Registration"
          size="small"
          variant="glass"
          actions={
            <>
              <Button
                onClick={() => setRejectDialogOpen(false)}
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.action.hover, 0.1),
                  },
                }}
              >
                Cancel
              </Button>
              <ModernButton
                variant="gradient"
                color="error"
                onClick={handleRejectSubmit}
                disabled={!actionNotes.trim()}
                sx={{ minWidth: 150 }}
              >
                Reject Registration
              </ModernButton>
            </>
          }
        >
          <Box sx={{ py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <CancelIcon sx={{ color: "error.main", mr: 2, fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight={600} color="error.main">
                  Reject Property Registration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This action will reject the registration request
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Are you sure you want to reject this property registration? Please
              provide a clear reason for rejection.
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Rejection Reason *"
              placeholder="Please provide a detailed reason for rejection..."
              value={actionNotes}
              onChange={(e) => setActionNotes(e.target.value)}
              required
              error={!actionNotes.trim()}
              helperText={
                !actionNotes.trim()
                  ? "Rejection reason is required"
                  : "This reason will be shared with the applicant"
              }
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                },
              }}
            />
          </Box>
        </ModernDialog>
      </Box>
    </OfficerLayout>
  );
}
