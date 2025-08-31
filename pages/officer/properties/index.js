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
  alpha,
  useTheme,
  Fade,
  Grow,
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
  Tabs,
  Tab,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  MoreVert as MoreVertIcon,
  Verified as VerifiedIcon,
  Warning as WarningIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  GridView as GridViewIcon,
  List as ListViewIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material";
import CalendarIcon from "@mui/icons-material/CalendarMonth";

import OfficerLayout from "@/components/layouts/OfficerLayout";
import ModernCard, {
  ModernCardContent,
  ModernCardHeader,
} from "@/components/ui/ModernCard";
import ModernButton from "@/components/ui/ModernButton";
import ModernDialog from "@/components/ui/ModernDialog";
import { SearchField } from "@/components/ui/ModernForm";
import LoadingSpinner, {
  CardSkeleton,
} from "@/components/ui/LoadingComponents";
import { createStaggerAnimation, createHoverLift } from "@/lib/animations";
import { useApi } from "@/lib/api";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "verified":
    case "approved":
      return "success";
    case "pending":
    case "under_review":
      return "warning";
    case "processing":
    case "in_progress":
      return "info";
    case "rejected":
      return "error";
    default:
      return "default";
  }
};

const PropertyCard = ({ property, index, onVerify, onViewDetails }) => {
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "verified":
      case "approved":
        return <VerifiedIcon fontSize="small" />;
      case "pending":
      case "under_review":
        return <WarningIcon fontSize="small" />;
      case "processing":
      case "in_progress":
        return <CalendarIcon fontSize="small" />;
      default:
        return null;
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
          minHeight: 420,
          maxHeight: 420,
          display: "flex",
          minWidth: 300,
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          ...createHoverLift(-4),
        }}
      >
        {/* Status Badge */}
        <Box sx={{ position: "absolute", top: 12, left: 12, zIndex: 1 }}>
          <Chip
            icon={getStatusIcon(property.status)}
            label={property.status || "Unknown"}
            color={getStatusColor(property.status)}
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
              onViewDetails(property);
            }}
          >
            <VisibilityIcon sx={{ mr: 1 }} fontSize="small" />
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onVerify(property);
            }}
          >
            <CheckCircleIcon sx={{ mr: 1 }} fontSize="small" />
            Verify Property
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              router.push(`/officer/properties/${property.id}/edit`);
            }}
          >
            <EditIcon sx={{ mr: 1 }} fontSize="small" />
            Edit Property
          </MenuItem>
        </Menu>

        <ModernCardContent
          onClick={() => onViewDetails(property)}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
            pt: 2,
          }}
        >
          {/* Main Content */}
          <Box>
            {/* Property Title & Location */}
            <Box sx={{ mb: 3, mt: 4 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1.3,
                  mb: 1.5,
                  fontSize: "1.1rem",
                }}
              >
                {property.landName ||
                  property.title ||
                  `Property #${property.id}`}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <LocationIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                    lineHeight: 1.4,
                  }}
                >
                  {property.location ||
                    property.address ||
                    "Location not specified"}
                </Typography>
              </Box>
            </Box>

            {/* Property Details */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}
                >
                  Area
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    mt: 0.5,
                    lineHeight: 1.4,
                  }}
                >
                  {property.land_area ? `${property.land_area} sqm` : "N/A"}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, textAlign: "right" }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}
                >
                  Type
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="primary.main"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    mt: 0.5,
                    lineHeight: 1.4,
                  }}
                >
                  {property.property_type || "N/A"}
                </Typography>
              </Box>
            </Box>

            {/* Owner Information */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                Owner
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  mt: 0.5,
                  lineHeight: 1.4,
                }}
              >
                {property.owner_name || "N/A"}
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
              mt: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                {formatDate(property.registration_date)}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.75rem", fontWeight: 500 }}
            >
              ID: {property.id}
            </Typography>
          </Box>
        </ModernCardContent>
      </ModernCard>
    </Grow>
  );
};

export default function PropertiesPage() {
  const theme = useTheme();
  const router = useRouter();
  const { getProperties, getRegisterByLandId, getTransferByLandId } = useApi();

  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [registerDocuments, setRegisterDocuments] = useState([]);
  const [transferDocuments, setTransferDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(false);

  // Load properties
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        setProperties(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [getProperties]);

  const filteredProperties = properties.filter((property) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      (property.landName || "").toLowerCase().includes(searchTermLower) ||
      (property.location || "").toLowerCase().includes(searchTermLower) ||
      (property.ownerName || "").toLowerCase().includes(searchTermLower) ||
      (property.id || "").toString().includes(searchTermLower);

    const matchesFilter =
      filterStatus === "all" ||
      (property.status || "").toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const handleVerify = (property) => {
    setSelectedProperty(property);
    setVerifyDialogOpen(true);
  };

  const handleViewDetails = async (property) => {
    setSelectedProperty(property);
    setDetailsDialogOpen(true);
    setDocsLoading(true);
    setRegisterDocuments([]);
    setTransferDocuments([]);
    
    try {
      const propId = property.property_id || property.id || property.land_id;
      
      if (propId) {
        // Fetch both register and transfer documents in parallel
        const [registerDocs, transferDocs] = await Promise.allSettled([
          getRegisterByLandId(propId),
          getTransferByLandId(propId)
        ]);
        
        // Handle register documents
        if (registerDocs.status === 'fulfilled') {
          let regDocs = registerDocs.value;
          if (regDocs && typeof regDocs === "object" && Array.isArray(regDocs.documents)) {
            regDocs = regDocs.documents;
          }
          setRegisterDocuments(Array.isArray(regDocs) ? regDocs : []);
        } else {
          console.warn("Failed to fetch register documents:", registerDocs.reason);
          setRegisterDocuments([]);
        }
        
        // Handle transfer documents
        if (transferDocs.status === 'fulfilled') {
          let transDocs = transferDocs.value;
          if (transDocs && typeof transDocs === "object" && Array.isArray(transDocs.documents)) {
            transDocs = transDocs.documents;
          }
          setTransferDocuments(Array.isArray(transDocs) ? transDocs : []);
        } else {
          console.warn("Failed to fetch transfer documents:", transferDocs.reason);
          setTransferDocuments([]);
        }
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setRegisterDocuments([]);
      setTransferDocuments([]);
    } finally {
      setDocsLoading(false);
    }
  };

  const handleVerifySubmit = async () => {
    // Here you would implement the verification logic
    // For now, just close the dialog
    setVerifyDialogOpen(false);
    setSelectedProperty(null);
    // You might want to refresh the properties list here
  };

  return (
    <OfficerLayout>
      <Box>
        {/* Header Section */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box>
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
                  All Properties
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ opacity: 0.8 }}
                >
                  Manage and verify property registrations
                </Typography>
              </Box>

              <ModernButton
                variant="gradient"
                onClick={() => router.push("/officer/properties/verify")}
                sx={{ height: "fit-content" }}
              >
                Verify Properties
              </ModernButton>
            </Box>

            {/* Search and Filters */}
            <ModernCard variant="glass" sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                  [theme.breakpoints.down("sm")]: {
                    flexDirection: "column",
                    alignItems: "stretch",
                  },
                }}
              >
                <SearchField
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ flex: 1, minWidth: 250 }}
                />

                <Box sx={{ display: "flex", gap: 1 }}>
                  {["all", "pending", "verified", "processing", "rejected"].map(
                    (status) => (
                      <Chip
                        key={status}
                        label={
                          status === "all"
                            ? "All"
                            : status.charAt(0).toUpperCase() + status.slice(1)
                        }
                        variant={
                          filterStatus === status ? "filled" : "outlined"
                        }
                        color={filterStatus === status ? "primary" : "default"}
                        onClick={() => setFilterStatus(status)}
                        clickable
                        sx={{
                          backgroundColor:
                            filterStatus === status
                              ? alpha(theme.palette.primary.main, 0.1)
                              : "transparent",
                          borderColor:
                            filterStatus === status
                              ? theme.palette.primary.main
                              : alpha(theme.palette.divider, 0.3),
                        }}
                      />
                    )
                  )}
                </Box>
              </Box>
            </ModernCard>
          </Box>
        </Fade>

        {/* Properties Grid */}
        {loading ? (
          <Grid container spacing={3}>
            {Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <ModernCard
                  variant="glass"
                  sx={{ minHeight: 420, maxHeight: 420 }}
                >
                  <CardSkeleton lines={4} hasActions />
                </ModernCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
            {filteredProperties.map((property, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={property.id}
                sx={{ display: "flex" }}
              >
                <PropertyCard
                  property={property}
                  index={index}
                  onVerify={handleVerify}
                  onViewDetails={handleViewDetails}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!loading && filteredProperties.length === 0 && (
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
                  <SearchIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  No properties found
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Try adjusting your search or filter criteria
                </Typography>
                <ModernButton
                  variant="outlined"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                >
                  Clear filters
                </ModernButton>
              </ModernCardContent>
            </ModernCard>
          </Fade>
        )}

        {/* Verification Dialog */}
        <ModernDialog
          open={verifyDialogOpen}
          onClose={() => setVerifyDialogOpen(false)}
          title={`Verify Property: ${
            selectedProperty?.landName || `Property #${selectedProperty?.id}`
          }`}
          size="small"
          variant="glass"
          actions={
            <>
              <Button
                onClick={() => setVerifyDialogOpen(false)}
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
                onClick={handleVerifySubmit}
                sx={{ minWidth: 140 }}
              >
                Verify Property
              </ModernButton>
            </>
          }
        >
          <Box sx={{ py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <VerifiedIcon
                sx={{ color: "success.main", mr: 2, fontSize: 28 }}
              />
              <Box>
                <Typography variant="h6" fontWeight={600} color="success.main">
                  Verify Property Registration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This action will mark the property as verified and approved
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Are you sure you want to verify this property? This action will:
            </Typography>

            <Box sx={{ mb: 3, ml: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Mark the property as officially verified
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Update the property status to "Approved"
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Notify the property owner
              </Typography>
              <Typography variant="body2">
                • Make the property available for transfers
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Verification Notes (Optional)"
              placeholder="Add any notes about the verification process..."
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                },
              }}
            />
          </Box>
        </ModernDialog>

        {/* Details Dialog */}
        <ModernDialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          title={`Property Details: ${
            selectedProperty?.landName || `Property #${selectedProperty?.id}`
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
                onClick={() => {
                  setDetailsDialogOpen(false);
                  handleVerify(selectedProperty);
                }}
                sx={{ minWidth: 120 }}
              >
                Verify Property
              </ModernButton>
            </>
          }
        >
          {selectedProperty && (
            <Box sx={{ py: 1 }}>
              {/* Property Overview Card */}
              <ModernCard variant="outlined" sx={{ mb: 3, p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Property Overview
                  </Typography>
                  <Chip
                    label={selectedProperty.status || "Unknown"}
                    color={getStatusColor(selectedProperty.status)}
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
                      {selectedProperty.landName || "N/A"}
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
                      {selectedProperty.location ||
                        selectedProperty.address ||
                        "N/A"}
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
                    <Typography variant="body2" gutterBottom>
                      {selectedProperty.land_area
                        ? `${selectedProperty.land_area} sqm`
                        : "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Property Type
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="primary.main"
                    >
                      {selectedProperty.property_type || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Owner
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {selectedProperty.owner_name || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </ModernCard>

              {/* Additional Information */}
              <ModernCard variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CalendarIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Registration Information
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Registration Date
                    </Typography>
                    <Typography variant="body2">
                      {selectedProperty.registration_date
                        ? new Date(
                            selectedProperty.registration_date
                          ).toLocaleDateString()
                        : "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Property ID
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      #{selectedProperty.id}
                    </Typography>
                  </Grid>
                </Grid>
              </ModernCard>

              {/* Documents Section */}
              <ModernCard variant="outlined" sx={{ p: 2, mt: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <DescriptionIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Property Documents
                  </Typography>
                </Box>

                {docsLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                    <LoadingSpinner size={24} />
                  </Box>
                ) : (
                  <Box>
                    {/* Register Documents */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                        <AssignmentIcon fontSize="small" />
                        Registration Documents ({registerDocuments.length})
                      </Typography>
                      {registerDocuments.length > 0 ? (
                        <List sx={{ py: 0, bgcolor: alpha(theme.palette.background.paper, 0.5), borderRadius: 1 }}>
                          {registerDocuments.map((doc, index) => (
                            <ListItem
                              key={doc.id || index}
                              sx={{
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                "&:hover": {
                                  backgroundColor: alpha(theme.palette.action.hover, 0.05),
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <DescriptionIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="body2" fontWeight={500}>
                                    {doc.name || doc.title || `Document ${index + 1}`}
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="caption" color="text.secondary">
                                    {doc.description || doc.type || "Registration document"}
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
                                      if (lower.endsWith(".pdf") || lower.includes("/pdf/")) {
                                        window.open(`/pdf-viewer?url=${encodeURIComponent(docUrl)}`, "_blank");
                                      } else {
                                        window.open(docUrl || "", "_blank", "noopener");
                                      }
                                    } catch (e) {
                                      window.open(docUrl || "", "_blank", "noopener");
                                    }
                                  }}
                                  sx={{
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    "&:hover": {
                                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
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
                        <Box sx={{ 
                          textAlign: "center", 
                          py: 2, 
                          bgcolor: alpha(theme.palette.background.paper, 0.3), 
                          borderRadius: 1,
                          border: `1px dashed ${alpha(theme.palette.divider, 0.3)}`
                        }}>
                          <Typography variant="body2" color="text.secondary">
                            No registration documents found
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Transfer Documents */}
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                        <SwapHorizIcon fontSize="small" />
                        Transfer Documents ({transferDocuments.length})
                      </Typography>
                      {transferDocuments.length > 0 ? (
                        <List sx={{ py: 0, bgcolor: alpha(theme.palette.background.paper, 0.5), borderRadius: 1 }}>
                          {transferDocuments.map((doc, index) => (
                            <ListItem
                              key={doc.id || index}
                              sx={{
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                "&:hover": {
                                  backgroundColor: alpha(theme.palette.action.hover, 0.05),
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <DescriptionIcon color="secondary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="body2" fontWeight={500}>
                                    {doc.name || doc.title || `Document ${index + 1}`}
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="caption" color="text.secondary">
                                    {doc.description || doc.type || "Transfer document"}
                                  </Typography>
                                }
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    const docUrl = doc.url || doc.path || "";
                                    try {
                                      const lower = (docUrl || "").toLowerCase();
                                      if (lower.endsWith(".pdf") || lower.includes("/pdf/")) {
                                        window.open(`/pdf-viewer?url=${encodeURIComponent(docUrl)}`, "_blank");
                                      } else {
                                        window.open(docUrl || "", "_blank", "noopener");
                                      }
                                    } catch (e) {
                                      window.open(docUrl || "", "_blank", "noopener");
                                    }
                                  }}
                                  sx={{
                                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                                    "&:hover": {
                                      backgroundColor: alpha(theme.palette.secondary.main, 0.2),
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
                        <Box sx={{ 
                          textAlign: "center", 
                          py: 2, 
                          bgcolor: alpha(theme.palette.background.paper, 0.3), 
                          borderRadius: 1,
                          border: `1px dashed ${alpha(theme.palette.divider, 0.3)}`
                        }}>
                          <Typography variant="body2" color="text.secondary">
                            No transfer documents found
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
              </ModernCard>
            </Box>
          )}
        </ModernDialog>
      </Box>
    </OfficerLayout>
  );
}
