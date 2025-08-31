"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Grid,
  IconButton,
  alpha,
  useTheme,
  Fade,
  Grow,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  LocationOn as LocationIcon,
  QrCode as QrCodeIcon,
  SwapHoriz as SwapHorizIcon,
  Visibility as VisibilityIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import CalendarIcon from "@mui/icons-material/CalendarMonth";

import DocumentsList from "./components/DocumentsList";
import CitizenLayout from "@/components/layouts/CitizenLayout";
import ModernCard, {
  ModernCardContent,
  ModernCardHeader,
} from "@/components/ui/ModernCard";
import ModernButton from "@/components/ui/ModernButton";
import ModernDialog from "@/components/ui/ModernDialog";
import LoadingSpinner from "@/components/ui/LoadingComponents";
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

export default function PropertyDetails() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const {
    getProperties,
    getPropertyById,
    getDocumentsByLandId,
    getTransferByLandId,
    getRegisterByLandId,
  } = useApi();
  const [property, setProperty] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [transferDocuments, setTransferDocuments] = useState([]);
  const [registerDocuments, setRegisterDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        // Prefer fetching the single property by id so we get nested documents and
        // any related fields the backend returns for a single resource.
        const found = await getPropertyById(id);
        setProperty(found || null);

        // fetch documents separately (like transactions page)
        try {
          setDocsLoading(true);
          // Fetch transfer and register documents in parallel and keep them separate.
          const tCall =
            typeof getTransferByLandId === "function"
              ? getTransferByLandId(id)
              : Promise.resolve([]);
          const rCall =
            typeof getRegisterByLandId === "function"
              ? getRegisterByLandId(id)
              : Promise.resolve([]);

          const [tRes, rRes] = await Promise.allSettled([tCall, rCall]);

          // Debug: log raw register response
          console.log("[DEBUG] getRegisterByLandId response:", rRes);

          const toArray = (value) => {
            if (!value) return [];
            if (Array.isArray(value)) return value;
            if (
              value &&
              typeof value === "object" &&
              Array.isArray(value.documents)
            )
              return value.documents;
            // Try to handle if value is an object with a single key containing an array
            if (
              value &&
              typeof value === "object" &&
              Object.values(value).length === 1 &&
              Array.isArray(Object.values(value)[0])
            ) {
              return Object.values(value)[0];
            }
            return [];
          };

          const rawTransfer =
            tRes.status === "fulfilled" ? toArray(tRes.value) : [];
          const rawRegister =
            rRes.status === "fulfilled" ? toArray(rRes.value) : [];

          // If the property record included documents, append them to a sensible place.
          // By default, append to registerDocuments (backend often stores register files on the property)
          const propDocs = Array.isArray(found?.documents)
            ? found.documents
            : [];

          const dedupe = (arr) => {
            const seen = new Set();
            const out = [];
            for (const d of arr) {
              const key =
                (d && d.id && String(d.id)) ||
                d?.url ||
                d?.path ||
                d?.name ||
                JSON.stringify(d);
              if (!key) continue;
              if (!seen.has(key)) {
                seen.add(key);
                out.push(d);
              }
            }
            return out;
          };

          const transferList = dedupe(rawTransfer);
          const registerList = dedupe([...rawRegister, ...propDocs]);

          setTransferDocuments(transferList);
          setRegisterDocuments(registerList);

          // Debug: log registerDocuments after processing
          console.log("[DEBUG] registerDocuments:", registerList);

          // Keep combined documents around for any existing UI that relies on a single list
          setDocuments([...transferList, ...registerList]);
        } catch (e) {
          setTransferDocuments([]);
          setRegisterDocuments([]);
          setDocuments([]);
        } finally {
          setDocsLoading(false);
        }
      } catch (e) {
        // fallback: try full list
        try {
          const list = await getProperties();
          const found =
            (list || []).find((p) => String(p.id) === String(id)) || null;
          setProperty(found);
          setDocuments((found && found.documents) || []);
        } catch (err) {
          setProperty(null);
        }
      }
    };
    load();
  }, [id, getProperties, getPropertyById, getDocumentsByLandId]);

  if (!property) {
    return (
      <CitizenLayout>
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <LoadingSpinner size={40} />
        </Box>
      </CitizenLayout>
    );
  }

  const title =
    property.title || property.address || `${property.district || "Property"}`;
  const plotNumber = property.survey_number || property.plotNumber;
  const landArea = property.land_area || property.landArea;
  const ownerNIC = property.currentowner_nic || property.ownerNIC;
  const registrationDate =
    property.registration_date || property.registrationDate;

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
                mb: 3,
                flexWrap: "wrap",
                gap: 2,
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
                  {title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Chip
                    label={property.status || "Unknown"}
                    color={getStatusColor(property.status)}
                    sx={{ fontWeight: 600 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Property ID: #{property.id}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <ModernButton
                  variant="gradient"
                  startIcon={<SwapHorizIcon />}
                  onClick={() => router.push(`/citizen/transfer/${id}`)}
                >
                  Transfer Property
                </ModernButton>
                <ModernButton
                  variant="outlined"
                  startIcon={<QrCodeIcon />}
                  onClick={() => {
                    /* TODO: Implement QR code functionality */
                  }}
                >
                  QR Code
                </ModernButton>
              </Box>
            </Box>
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3}>
              {/* Property Overview */}
              <Grid item xs={12}>
                <Grow in timeout={600} style={{ transitionDelay: "100ms" }}>
                  <ModernCard variant="glass">
                    <ModernCardContent sx={{ p: 3 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 3 }}
                      >
                        <LocationIcon
                          sx={{ mr: 2, color: "primary.main", fontSize: 28 }}
                        />
                        <Typography variant="h5" fontWeight={600}>
                          Property Location
                        </Typography>
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              sx={{ mb: 0.5, fontSize: "0.875rem" }}
                            >
                              Plot Number
                            </Typography>
                            <Typography variant="h6" fontWeight={500}>
                              {plotNumber || "N/A"}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              sx={{ mb: 0.5, fontSize: "0.875rem" }}
                            >
                              District
                            </Typography>
                            <Typography variant="h6" fontWeight={500}>
                              {property.district || "N/A"}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              sx={{ mb: 0.5, fontSize: "0.875rem" }}
                            >
                              Province
                            </Typography>
                            <Typography variant="body1">
                              {property.province || "N/A"}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              sx={{ mb: 0.5, fontSize: "0.875rem" }}
                            >
                              Address
                            </Typography>
                            <Typography variant="body1">
                              {property.address || "N/A"}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </ModernCardContent>
                  </ModernCard>
                </Grow>
              </Grid>

              {/* Documents Section */}
              <Grid item xs={12}>
                <Grow in timeout={600} style={{ transitionDelay: "200ms" }}>
                  <Box>
                    {/* Transfer Documents */}
                    <ModernCard variant="glass" sx={{ mb: 3 }}>
                      <ModernCardContent sx={{ p: 3 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 3 }}
                        >
                          <SwapHorizIcon
                            sx={{
                              mr: 2,
                              color: "secondary.main",
                              fontSize: 28,
                            }}
                          />
                          <Typography variant="h5" fontWeight={600}>
                            Transfer Documents
                          </Typography>
                          <Chip
                            label={transferDocuments.length}
                            size="small"
                            color="secondary"
                            sx={{ ml: 2 }}
                          />
                        </Box>

                        {docsLoading ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              py: 3,
                            }}
                          >
                            <LoadingSpinner size={24} />
                          </Box>
                        ) : transferDocuments.length > 0 ? (
                          <List sx={{ py: 0 }}>
                            {transferDocuments.map((doc, index) => (
                              <ListItem
                                key={doc.id || index}
                                sx={{
                                  px: 0,
                                  py: 1.5,
                                  borderRadius: 1,
                                  "&:hover": {
                                    backgroundColor: alpha(
                                      theme.palette.action.hover,
                                      0.05
                                    ),
                                  },
                                }}
                              >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                  <DescriptionIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography
                                      variant="body1"
                                      fontWeight={500}
                                    >
                                      {doc.name || `Document ${index + 1}`}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {doc.type || "Transfer document"}
                                    </Typography>
                                  }
                                />
                                <ListItemSecondaryAction>
                                  <IconButton
                                    size="small"
                                    color="secondary"
                                    onClick={() => {
                                      const docUrl = doc.url || doc.path || "";
                                      if (
                                        docUrl.toLowerCase().endsWith(".pdf")
                                      ) {
                                        window.open(
                                          `/pdf-viewer?url=${encodeURIComponent(
                                            docUrl
                                          )}`,
                                          "_blank"
                                        );
                                      } else {
                                        window.open(
                                          docUrl,
                                          "_blank",
                                          "noopener"
                                        );
                                      }
                                    }}
                                    sx={{
                                      backgroundColor: alpha(
                                        theme.palette.secondary.main,
                                        0.1
                                      ),
                                      "&:hover": {
                                        backgroundColor: alpha(
                                          theme.palette.secondary.main,
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
                          <Box
                            sx={{
                              textAlign: "center",
                              py: 4,
                              bgcolor: alpha(
                                theme.palette.background.paper,
                                0.3
                              ),
                              borderRadius: 2,
                              border: `1px dashed ${alpha(
                                theme.palette.divider,
                                0.3
                              )}`,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              No transfer documents found
                            </Typography>
                          </Box>
                        )}
                      </ModernCardContent>
                    </ModernCard>

                    {/* Registration Documents */}
                    <ModernCard variant="glass">
                      <ModernCardContent sx={{ p: 3 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 3 }}
                        >
                          <AssignmentIcon
                            sx={{ mr: 2, color: "primary.main", fontSize: 28 }}
                          />
                          <Typography variant="h5" fontWeight={600}>
                            Registration Documents
                          </Typography>
                          <Chip
                            label={registerDocuments.length}
                            size="small"
                            color="primary"
                            sx={{ ml: 2 }}
                          />
                        </Box>

                        {docsLoading ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              py: 3,
                            }}
                          >
                            <LoadingSpinner size={24} />
                          </Box>
                        ) : registerDocuments.length > 0 ? (
                          <List sx={{ py: 0 }}>
                            {registerDocuments.map((doc, index) => (
                              <ListItem
                                key={doc.id || index}
                                sx={{
                                  px: 0,
                                  py: 1.5,
                                  borderRadius: 1,
                                  "&:hover": {
                                    backgroundColor: alpha(
                                      theme.palette.action.hover,
                                      0.05
                                    ),
                                  },
                                }}
                              >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                  <DescriptionIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography
                                      variant="body1"
                                      fontWeight={500}
                                    >
                                      {doc.name || `Document ${index + 1}`}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {doc.type || "Registration document"}
                                    </Typography>
                                  }
                                />
                                <ListItemSecondaryAction>
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                      const docUrl = doc.url || doc.path || "";
                                      if (
                                        docUrl.toLowerCase().endsWith(".pdf")
                                      ) {
                                        window.open(
                                          `/pdf-viewer?url=${encodeURIComponent(
                                            docUrl
                                          )}`,
                                          "_blank"
                                        );
                                      } else {
                                        window.open(
                                          docUrl,
                                          "_blank",
                                          "noopener"
                                        );
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
                          <Box
                            sx={{
                              textAlign: "center",
                              py: 4,
                              bgcolor: alpha(
                                theme.palette.background.paper,
                                0.3
                              ),
                              borderRadius: 2,
                              border: `1px dashed ${alpha(
                                theme.palette.divider,
                                0.3
                              )}`,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              No registration documents found
                            </Typography>
                          </Box>
                        )}
                      </ModernCardContent>
                    </ModernCard>
                  </Box>
                </Grow>
              </Grid>
            </Grid>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Grow in timeout={600} style={{ transitionDelay: "300ms" }}>
              <ModernCard variant="glass">
                <ModernCardContent sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Property Details
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 0.5, fontSize: "0.875rem" }}
                          >
                            Land Area
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color="primary.main"
                          >
                            {landArea || "N/A"}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 0.5, fontSize: "0.875rem" }}
                          >
                            Property Type
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {property.property_type ||
                              property.propertyType ||
                              "N/A"}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 0.5, fontSize: "0.875rem" }}
                          >
                            Owner NIC
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {ownerNIC || "N/A"}
                          </Typography>
                        </Box>
                      </Grid>

                      {registrationDate && (
                        <Grid item xs={12}>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              sx={{ mb: 0.5, fontSize: "0.875rem" }}
                            >
                              Registration Date
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <CalendarIcon
                                sx={{ fontSize: 18, color: "text.secondary" }}
                              />
                              <Typography variant="body1" fontWeight={500}>
                                {new Date(
                                  registrationDate
                                ).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </ModernCardContent>
              </ModernCard>
            </Grow>
          </Grid>
        </Grid>
      </Box>
    </CitizenLayout>
  );
}
