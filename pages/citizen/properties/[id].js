"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Description as DescriptionIcon,
  LocationOn as LocationIcon,
  QrCode as QrCodeIcon,
  Download as DownloadIcon,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material";
import DocumentsList from "./components/DocumentsList";
import CitizenLayout from "@/components/layouts/CitizenLayout";
import { useApi } from "@/lib/api";

export default function PropertyDetails() {
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
  const [docDialog, setDocDialog] = useState(null);

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
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Loading property...</Typography>
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

  const statusColor =
    {
      verified: "success",
      pending: "warning",
      rejected: "error",
      under_review: "info",
    }[property.status] || "default";

  return (
    <CitizenLayout>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Chip
              label={(property.status || "").toUpperCase()}
              color={statusColor}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SwapHorizIcon />}
              onClick={() => router.push(`/citizen/transfer/${id}`)}
            >
              Transfer Property
            </Button>
            <Button variant="outlined" startIcon={<QrCodeIcon />}>
              QR Code
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <LocationIcon sx={{ mr: 1 }} />
                      Location
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="Plot Number"
                          secondary={plotNumber}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="District"
                          secondary={property.district}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Province"
                          secondary={property.province}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Address"
                          secondary={property.address}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12}>
                {/* Documents split into Transfer and Register groups.
                    Use the separate lists we fetched earlier so items don't fall
                    into "Other Documents" just because they lack a `group` field. */}

                <DocumentsList
                  title="Transfer Documents"
                  documents={transferDocuments}
                  onOpen={(d) => setDocDialog(d)}
                />

                <Box sx={{ height: 16 }} />

                <DocumentsList
                  title="Register Documents"
                  documents={registerDocuments}
                  onOpen={(d) => setDocDialog(d)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <List dense>
                <ListItem>
                  <ListItemText primary="Land Area" secondary={landArea} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Type"
                    secondary={property.property_type || property.propertyType}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Owner NIC" secondary={ownerNIC} />
                </ListItem>
                {registrationDate && (
                  <ListItem>
                    <ListItemText
                      primary="Registered"
                      secondary={new Date(
                        registrationDate
                      ).toLocaleDateString()}
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Dialog
          open={!!docDialog}
          onClose={() => setDocDialog(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Document Viewer</DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: "center", py: 4 }}>
              <DescriptionIcon
                sx={{ fontSize: 64, color: "primary.main", mb: 2 }}
              />
              <Typography variant="body1">
                {docDialog?.name || "Document"}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDocDialog(null)}>Close</Button>
            <Button
              variant="outlined"
              onClick={() => {
                const url = docDialog?.url || docDialog?.path;
                if (url) window.open(url, "_blank", "noopener");
              }}
            >
              Open
            </Button>
            <Button variant="contained" startIcon={<DownloadIcon />}>
              Download
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </CitizenLayout>
  );
}
