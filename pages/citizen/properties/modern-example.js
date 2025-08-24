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
} from "@mui/material";
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  Verified as VerifiedIcon,
  Warning as WarningIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  GridView as GridViewIcon,
  List as ListViewIcon,
} from "@mui/icons-material";
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

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: "Sunset Villa",
    location: "Downtown District",
    area: "2,500 sq ft",
    value: "$450,000",
    status: "verified",
    registrationDate: "2023-12-15",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    type: "Residential",
    documents: 8,
    lastUpdated: "2024-01-20",
  },
  {
    id: 2,
    title: "Green Acres Farm",
    location: "Rural Valley",
    area: "50 acres",
    value: "$1,200,000",
    status: "pending",
    registrationDate: "2024-01-10",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=400",
    type: "Agricultural",
    documents: 5,
    lastUpdated: "2024-01-22",
  },
  {
    id: 3,
    title: "City Center Apartment",
    location: "Metropolitan Area",
    area: "1,200 sq ft",
    value: "$320,000",
    status: "processing",
    registrationDate: "2024-01-05",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
    type: "Residential",
    documents: 6,
    lastUpdated: "2024-01-18",
  },
  {
    id: 4,
    title: "Commercial Plaza",
    location: "Business District",
    area: "5,000 sq ft",
    value: "$850,000",
    status: "verified",
    registrationDate: "2023-11-20",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    type: "Commercial",
    documents: 12,
    lastUpdated: "2024-01-15",
  },
];

const PropertyCard = ({ property, index }) => {
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "success";
      case "pending":
        return "warning";
      case "processing":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <VerifiedIcon fontSize="small" />;
      case "pending":
        return <WarningIcon fontSize="small" />;
      case "processing":
        return <TrendingUpIcon fontSize="small" />;
      default:
        return null;
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
        onClick={() => router.push(`/citizen/properties/${property.id}`)}
        sx={{
          height: "100%",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          ...createHoverLift(-8),
        }}
      >
        {/* Property Image */}
        <Box
          sx={{
            height: 200,
            backgroundImage: `url(${property.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to bottom, transparent 0%, ${alpha(
                theme.palette.common.black,
                0.3
              )} 100%)`,
            },
          }}
        >
          {/* Status Badge */}
          <Chip
            icon={getStatusIcon(property.status)}
            label={
              property.status.charAt(0).toUpperCase() + property.status.slice(1)
            }
            color={getStatusColor(property.status)}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: alpha(
                theme.palette[getStatusColor(property.status)].main,
                0.9
              ),
              backdropFilter: "blur(10px)",
              fontWeight: 600,
            }}
          />

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
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: "blur(10px)",
              "&:hover": {
                backgroundColor: alpha(theme.palette.background.paper, 1),
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
            <MenuItem onClick={() => setAnchorEl(null)}>View Details</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Edit Property</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              Download Documents
            </MenuItem>
          </Menu>

          {/* Property Type */}
          <Chip
            label={property.type}
            size="small"
            variant="outlined"
            sx={{
              position: "absolute",
              bottom: 12,
              left: 12,
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: "blur(10px)",
            }}
          />
        </Box>

        <ModernCardContent>
          {/* Property Title & Location */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {property.title}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
            >
              <LocationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {property.location}
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
                {property.area}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="caption" color="text.secondary">
                Value
              </Typography>
              <Typography variant="body2" fontWeight={600} color="primary.main">
                {property.value}
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
                {new Date(property.registrationDate).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {property.documents} documents
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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filterStatus, setFilterStatus] = useState("all");

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
                  Manage your land registry portfolio
                </Typography>
              </Box>

              <ModernButton
                variant="gradient"
                startIcon={<AddIcon />}
                onClick={() => router.push("/citizen/land-registration")}
                sx={{ height: "fit-content" }}
              >
                Register Property
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
                  {["all", "verified", "pending", "processing"].map(
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

                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    onClick={() => setViewMode("grid")}
                    color={viewMode === "grid" ? "primary" : "default"}
                    sx={{
                      backgroundColor:
                        viewMode === "grid"
                          ? alpha(theme.palette.primary.main, 0.1)
                          : "transparent",
                    }}
                  >
                    <GridViewIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setViewMode("list")}
                    color={viewMode === "list" ? "primary" : "default"}
                    sx={{
                      backgroundColor:
                        viewMode === "list"
                          ? alpha(theme.palette.primary.main, 0.1)
                          : "transparent",
                    }}
                  >
                    <ListViewIcon />
                  </IconButton>
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
          <Grid container spacing={3}>
            {filteredProperties.map((property, index) => (
              <Grid item xs={12} sm={6} lg={4} key={property.id}>
                <PropertyCard property={property} index={index} />
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
      </Box>
    </CitizenLayout>
  );
}
