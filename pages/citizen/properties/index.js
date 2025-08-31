"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  alpha,
  useTheme,
  Fade,
  Grow,
  Button,
  Avatar,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  MoreVert as MoreVertIcon,
  Verified as VerifiedIcon,
  Warning as WarningIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material";
import CalendarIcon from "@mui/icons-material/CalendarMonth";

import { useApi } from "@/lib/api";
import CitizenLayout from "@/components/layouts/CitizenLayout";
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

const PropertyCard = ({ property, index, onViewDetails, onTransfer }) => {
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

  const title =
    property.title || property.address || `${property.district || "Property"}`;
  const plotNumber = property.survey_number || property.plotNumber;
  const landArea = property.land_area || property.landArea;
  const registrationDate =
    property.registration_date || property.registrationDate;

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
              onTransfer(property);
            }}
          >
            <SwapHorizIcon sx={{ mr: 1 }} fontSize="small" />
            Transfer Property
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
                {title}
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
                  {property.address ||
                    property.location ||
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
                  Plot Number
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
                  {plotNumber || "N/A"}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, textAlign: "right" }}>
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
                  color="primary.main"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    mt: 0.5,
                    lineHeight: 1.4,
                  }}
                >
                  {landArea || "N/A"}
                </Typography>
              </Box>
            </Box>

            {/* District Information */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                District
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
                {property.district || "N/A"}
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
                {formatDate(registrationDate)}
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
export default function AllProperties() {
  const theme = useTheme();
  const router = useRouter();
  const { getCurrentUserLands } = useApi();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getCurrentUserLands().catch((error) => {
          console.error("Error fetching properties:", error);
          return [];
        });
        setProperties(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Properties page error:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
    const intervalId = setInterval(fetchProperties, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [getCurrentUserLands]);

  const filteredProperties = properties.filter((property) => {
    const searchTermLower = searchTerm.toLowerCase();
    const title =
      property.title ||
      property.address ||
      `${property.district || "Property"}`;
    const matchesSearch =
      title.toLowerCase().includes(searchTermLower) ||
      (property.district || "").toLowerCase().includes(searchTermLower) ||
      (property.survey_number || property.plotNumber || "")
        .toString()
        .includes(searchTermLower) ||
      (property.id || "").toString().includes(searchTermLower);

    const matchesFilter =
      filterStatus === "all" ||
      (property.status || "").toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (property) => {
    router.push(`/citizen/properties/${property.id}`);
  };

  const handleTransfer = (property) => {
    router.push(`/citizen/transfer/${property.id}`);
  };

  return (
    <CitizenLayout>
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
                  My Properties
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ opacity: 0.8 }}
                >
                  Manage your registered land properties
                </Typography>
              </Box>

              <ModernButton
                variant="gradient"
                onClick={() => router.push("/citizen/land-registration")}
                sx={{ height: "fit-content" }}
              >
                Register New Property
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
                  onViewDetails={handleViewDetails}
                  onTransfer={handleTransfer}
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
                  {properties.length === 0
                    ? "You haven't registered any properties yet"
                    : "Try adjusting your search or filter criteria"}
                </Typography>
                {properties.length === 0 ? (
                  <ModernButton
                    variant="gradient"
                    onClick={() => router.push("/citizen/land-registration")}
                  >
                    Register Your First Property
                  </ModernButton>
                ) : (
                  <ModernButton
                    variant="outlined"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterStatus("all");
                    }}
                  >
                    Clear filters
                  </ModernButton>
                )}
              </ModernCardContent>
            </ModernCard>
          </Fade>
        )}
      </Box>
    </CitizenLayout>
  );
}
