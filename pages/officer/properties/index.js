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
} from "@mui/icons-material";
import CalendarIcon from "@mui/icons-material/CalendarMonth";

import OfficerLayout from "@/components/layouts/OfficerLayout";
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

const PropertyCard = ({ property, index, onVerify, onViewDetails }) => {
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

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
          height: 300,
          width: 300,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          ...createHoverLift(-8),
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
            height: "100%",
            p: 2,
            pt: 1,
          }}
        >
          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Property Title & Location */}
            <Box sx={{ mb: 2, mt: 3, minHeight: 64 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                  height: 24,
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
                  gap: 0.5,
                  height: 24,
                }}
              >
                <LocationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
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
                mb: 2,
                height: 60,
              }}
            >
              <Box sx={{ flex: 1, mr: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Area
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    height: 20,
                    lineHeight: "20px",
                  }}
                >
                  {property.land_area + " purchases" || "N/A"}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, textAlign: "right", ml: 1 }}>
                <Typography variant="caption" color="text.secondary">
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
                    height: 20,
                    lineHeight: "20px",
                  }}
                >
                  {property.property_type || "N/A"}
                </Typography>
              </Box>
            </Box>

            {/* Owner Information */}
            <Box sx={{ mb: 2, height: 40 }}>
              <Typography variant="caption" color="text.secondary">
                Owner
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  height: 20,
                  lineHeight: "20px",
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
              height: 32,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarIcon sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                {formatDate(property.registration_date)}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
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
  const { getProperties } = useApi();

  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

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

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setDetailsDialogOpen(true);
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
                <ModernCard variant="glass">
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
        <Dialog
          open={verifyDialogOpen}
          onClose={() => setVerifyDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Verify Property:{" "}
            {selectedProperty?.landName || `Property #${selectedProperty?.id}`}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Are you sure you want to verify this property? This action will
              mark the property as verified and approved.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Verification Notes (Optional)"
                placeholder="Add any notes about the verification process..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVerifyDialogOpen(false)}>Cancel</Button>
            <ModernButton variant="gradient" onClick={handleVerifySubmit}>
              Verify Property
            </ModernButton>
          </DialogActions>
        </Dialog>

        {/* Details Dialog */}
        <Dialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Property Details:{" "}
            {selectedProperty?.landName || `Property #${selectedProperty?.id}`}
          </DialogTitle>
          <DialogContent>
            {selectedProperty && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Property Name
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedProperty.landName || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      label={selectedProperty.status || "Unknown"}
                      color={getStatusColor(selectedProperty.status)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedProperty.location || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Area
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedProperty.area || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Land Type
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedProperty.landType || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Owner
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedProperty.ownerName || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            <ModernButton
              variant="outlined"
              onClick={() => {
                setDetailsDialogOpen(false);
                handleVerify(selectedProperty);
              }}
            >
              Verify Property
            </ModernButton>
          </DialogActions>
        </Dialog>
      </Box>
    </OfficerLayout>
  );
}
