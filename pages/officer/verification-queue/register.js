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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
          <Box sx={{ mb: 2, mt: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {registration.landName || `Registration #${registration.id}`}
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
            >
              <LocationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {registration.location || "Location not specified"}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
            >
              <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                Owner: {registration.ownerName || "N/A"}
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
                {registration.area || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="caption" color="text.secondary">
                Type
              </Typography>
              <Typography variant="body2" fontWeight={600} color="primary.main">
                {registration.landType || "N/A"}
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
                {formatDate(
                  registration.submissionDate || registration.createdAt
                )}
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
  const { getProperties } = useApi();

  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [actionNotes, setActionNotes] = useState("");

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

  const handleViewDetails = (registration) => {
    setSelectedRegistration(registration);
    setDetailsDialogOpen(true);
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
      // Here you would call the API to approve the registration
      // await apiClient.property.update(selectedRegistration.id, {
      //   status: "approved",
      //   approvalNotes: actionNotes,
      //   approvedBy: currentUser.id,
      //   approvalDate: new Date().toISOString()
      // });

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
      // Here you would call the API to reject the registration
      // await apiClient.property.update(selectedRegistration.id, {
      //   status: "rejected",
      //   rejectionNotes: actionNotes,
      //   rejectedBy: currentUser.id,
      //   rejectionDate: new Date().toISOString()
      // });

      setRejectDialogOpen(false);
      setActionNotes("");
      setSelectedRegistration(null);
      // Refresh the list
      // loadRegistrations();
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
        <Dialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Registration Details:{" "}
            {selectedRegistration?.landName ||
              `Registration #${selectedRegistration?.id}`}
          </DialogTitle>
          <DialogContent>
            {selectedRegistration && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Property Name
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedRegistration.landName || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      label={selectedRegistration.status || "Unknown"}
                      color={getStatusColor(selectedRegistration.status)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedRegistration.location || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Area
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedRegistration.area || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Land Type
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedRegistration.landType || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Owner
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedRegistration.ownerName || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>

                {/* Documents Section */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Submitted Documents
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <DescriptionIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Land Deed"
                        secondary="Uploaded 2024-01-15"
                      />
                      <ListItemSecondaryAction>
                        <IconButton size="small" color="primary">
                          <VisibilityIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DescriptionIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Survey Plan"
                        secondary="Uploaded 2024-01-18"
                      />
                      <ListItemSecondaryAction>
                        <IconButton size="small" color="primary">
                          <VisibilityIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            <ModernButton
              variant="outlined"
              color="error"
              onClick={() => {
                setDetailsDialogOpen(false);
                handleReject(selectedRegistration);
              }}
            >
              Reject
            </ModernButton>
            <ModernButton
              variant="gradient"
              onClick={() => {
                setDetailsDialogOpen(false);
                handleApprove(selectedRegistration);
              }}
            >
              Approve
            </ModernButton>
          </DialogActions>
        </Dialog>

        {/* Approve Dialog */}
        <Dialog
          open={approveDialogOpen}
          onClose={() => setApproveDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Approve Registration</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Are you sure you want to approve this property registration?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Approval Notes (Optional)"
              placeholder="Add any notes about the approval..."
              value={actionNotes}
              onChange={(e) => setActionNotes(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setApproveDialogOpen(false)}>Cancel</Button>
            <ModernButton variant="gradient" onClick={handleApproveSubmit}>
              Approve Registration
            </ModernButton>
          </DialogActions>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog
          open={rejectDialogOpen}
          onClose={() => setRejectDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Reject Registration</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Are you sure you want to reject this property registration?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Rejection Reason"
              placeholder="Please provide a reason for rejection..."
              value={actionNotes}
              onChange={(e) => setActionNotes(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
            <ModernButton
              variant="gradient"
              color="error"
              onClick={handleRejectSubmit}
              disabled={!actionNotes.trim()}
            >
              Reject Registration
            </ModernButton>
          </DialogActions>
        </Dialog>
      </Box>
    </OfficerLayout>
  );
}
