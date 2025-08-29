"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  TextField,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import OfficerLayout from "@/components/layouts/OfficerLayout";
import apiClient from "@/lib/api";

export default function VerificationQueue() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const { enqueueSnackbar } = useSnackbar();

  const [queue, setQueue] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const properties = await apiClient.property.getDetails();
        const items = (Array.isArray(properties) ? properties : []).map(
          (p) => ({
            id: p.id,
            propertyTitle: p.title || p.name || "Property",
            plotNumber: p.plotNumber || p.surveyNumber || "N/A",
            submittedBy: p.ownerName || p.owner?.name || "User",
            submissionDate: p.createdAt || "",
            status: p.status || "pending",
            priority: p.priority || "normal",
            documents: p.documents || [],
            location: p.address || p.location || "",
            landArea: p.landArea || p.area || "",
          })
        );
        if (mounted) setQueue(items);
      } catch (error) {
        console.error("Error fetching verification queue:", error);
        if (mounted) setQueue([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const getStatusColor = (s) =>
    s === "pending"
      ? "warning"
      : s === "under_review"
      ? "info"
      : s === "verified"
      ? "success"
      : s === "rejected"
      ? "error"
      : "default";
  const getPriorityColor = (p) =>
    p === "high" ? "error" : p === "low" ? "success" : "default";
  const filtered = queue.filter(
    (r) => filterStatus === "all" || r.status === filterStatus
  );

  const handleView = (p) => {
    setSelectedProperty(p);
    setDialogOpen(true);
  };
  const handleApprove = async () => {
    try {
      if (!selectedProperty) return;
      await apiClient.property.update(selectedProperty.id, {
        status: "verified",
      });
      setQueue((prev) =>
        prev.map((r) =>
          r.id === selectedProperty.id ? { ...r, status: "verified" } : r
        )
      );
      enqueueSnackbar("Approved successfully!", { variant: "success" });
    } catch {
      enqueueSnackbar("Approve failed", { variant: "error" });
    } finally {
      setDialogOpen(false);
    }
  };
  const handleReject = async () => {
    try {
      if (!selectedProperty) return;
      await apiClient.property.update(selectedProperty.id, {
        status: "rejected",
      });
      setQueue((prev) =>
        prev.map((r) =>
          r.id === selectedProperty.id ? { ...r, status: "rejected" } : r
        )
      );
      enqueueSnackbar("Registration rejected", { variant: "warning" });
    } catch {
      enqueueSnackbar("Reject failed", { variant: "error" });
    } finally {
      setDialogOpen(false);
    }
  };

  return (
    <OfficerLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Verification Queue
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="warning.main">
                  {queue.filter((r) => r.status === "pending").length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Review
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="info.main">
                  {queue.filter((r) => r.status === "under_review").length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Under Review
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="error.main">
                  {queue.filter((r) => r.priority === "high").length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  High Priority
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary.main">
                  {queue.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Queue
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FilterListIcon color="action" />
            <Typography variant="subtitle1">Filters:</Typography>
            <Tabs
              value={tabValue}
              onChange={(e, v) => setTabValue(v)}
              variant="scrollable"
            >
              <Tab label="All" onClick={() => setFilterStatus("all")} />
              <Tab label="Pending" onClick={() => setFilterStatus("pending")} />
              <Tab
                label="Under Review"
                onClick={() => setFilterStatus("under_review")}
              />
            </Tabs>
          </Box>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property Details</TableCell>
                <TableCell>Submitted By</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">
                        {r.propertyTitle || r.title || r.name || "Property"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Plot: {r.plotNumber}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Area: {r.landArea}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {r.submittedBy || r.ownerName || r.owner?.name || "User"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{r.submissionDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={r.status.replace("_", " ").toUpperCase()}
                      color={getStatusColor(r.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={r.priority.toUpperCase()}
                      color={getPriorityColor(r.priority)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleView(r)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedProperty && (
            <>
              <DialogTitle>Property Verification Details</DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <LocationIcon sx={{ mr: 1, color: "primary.main" }} />
                          Property Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List dense>
                          <ListItem>
                            <ListItemText
                              primary="Property Title"
                              secondary={
                                selectedProperty.propertyTitle ||
                                selectedProperty.title ||
                                selectedProperty.name
                              }
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Plot Number"
                              secondary={selectedProperty.plotNumber}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Location"
                              secondary={selectedProperty.location}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Land Area"
                              secondary={selectedProperty.landArea}
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
                          Submission Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List dense>
                          <ListItem>
                            <ListItemText
                              primary="Submitted By"
                              secondary={
                                selectedProperty.submittedBy ||
                                selectedProperty.ownerName ||
                                selectedProperty.owner?.name
                              }
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Submission Date"
                              secondary={selectedProperty.submissionDate}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Status"
                              secondary={
                                <Chip
                                  label={(selectedProperty.status || "")
                                    .replace("_", " ")
                                    .toUpperCase()}
                                  color={getStatusColor(
                                    selectedProperty.status || ""
                                  )}
                                  size="small"
                                />
                              }
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Priority"
                              secondary={
                                <Chip
                                  label={(
                                    selectedProperty.priority || "normal"
                                  ).toUpperCase()}
                                  color={getPriorityColor(
                                    selectedProperty.priority || "normal"
                                  )}
                                  size="small"
                                  variant="outlined"
                                />
                              }
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid xs={12}>
                    <Card>
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <DescriptionIcon
                            sx={{ mr: 1, color: "primary.main" }}
                          />
                          Submitted Documents
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List dense>
                          {selectedProperty.documents?.map((doc, i) => (
                            <ListItem key={i}>
                              <ListItemIcon>
                                <DescriptionIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary={doc?.name || doc?.title || String(doc)}
                              />
                              <Button size="small" variant="outlined">
                                View
                              </Button>
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid xs={12}>
                    <Alert severity="info">
                      Please review all documents carefully before making a
                      decision. This action will be recorded in the blockchain.
                    </Alert>
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Verification Notes (Optional)"
                      placeholder="Add any notes about the verification process..."
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={handleReject}
                >
                  Reject
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={handleApprove}
                >
                  Approve & Issue NFT
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </OfficerLayout>
  );
}
