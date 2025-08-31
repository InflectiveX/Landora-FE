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
  SwapHoriz as SwapHorizIcon,
  Description as DescriptionIcon,
  AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material";
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
import OfficerLayout from "@/components/layouts/OfficerLayout";

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

const TransferCard = ({
  transfer,
  index,
  onApprove,
  onReject,
  onViewDetails,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

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
            label={transfer.status || "Pending"}
            color={getStatusColor(transfer.status)}
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
              onViewDetails(transfer);
            }}
          >
            <VisibilityIcon sx={{ mr: 1 }} fontSize="small" />
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onApprove(transfer);
            }}
          >
            <CheckCircleIcon sx={{ mr: 1 }} fontSize="small" />
            Approve
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onReject(transfer);
            }}
          >
            <CancelIcon sx={{ mr: 1 }} fontSize="small" />
            Reject
          </MenuItem>
        </Menu>

        <ModernCardContent
          onClick={() => onViewDetails(transfer)}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 250,
          }}
        >
          {/* Transfer Title & Details */}
          <Box sx={{ mb: 2, mt: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {transfer.propertyName ||
                transfer.landName ||
                `Transfer #${transfer.id}`}
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
            >
              <LocationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {transfer.location ||
                  transfer.propertyLocation ||
                  "Location not specified"}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
            >
              <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                From: {transfer.from_user_name || "N/A"}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
            >
              <AccountBalanceIcon
                sx={{ fontSize: 16, color: "text.secondary" }}
              />
              <Typography variant="body2" color="text.secondary">
                To: {transfer.to_user_name || "N/A"}
              </Typography>
            </Box>
          </Box>

          {/* Transfer Details */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Transfer Value
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {transfer.amount || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="caption" color="text.secondary">
                Type
              </Typography>
              <Typography variant="body2" fontWeight={600} color="primary.main">
                {transfer.property_type || "Ownership Transfer"}
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
                {formatDate(transfer.date)}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              ID: {transfer.id}
            </Typography>
          </Box>
        </ModernCardContent>
      </ModernCard>
    </Grow>
  );
};

export default function TransferQueue() {
  const theme = useTheme();
  const { getTransactions, getTransferByLandId } = useApi();

  const [loading, setLoading] = useState(true);
  const [transfers, setTransfers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [actionNotes, setActionNotes] = useState("");
  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(false);

  // Load transfer data
  useEffect(() => {
    const loadTransfers = async () => {
      try {
        setLoading(true);
        const data = await getTransactions();
        // Filter for pending transfers
        const pendingTransfers = data.filter(
          (transfer) =>
            (transfer.status || "").toLowerCase() === "pending" ||
            (transfer.status || "").toLowerCase() === "under_review"
        );
        setTransfers(pendingTransfers);
      } catch (error) {
        console.error("Failed to load transfers:", error);
        setTransfers([]);
      } finally {
        setLoading(false);
      }
    };

    loadTransfers();
  }, [getTransactions]);

  const filteredTransfers = transfers.filter((transfer) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (transfer.propertyName || "").toLowerCase().includes(searchTermLower) ||
      (transfer.currentOwner || "").toLowerCase().includes(searchTermLower) ||
      (transfer.newOwner || "").toLowerCase().includes(searchTermLower) ||
      (transfer.id || "").toString().includes(searchTermLower)
    );
  });

  const handleViewDetails = async (transfer) => {
    setSelectedTransfer(transfer);
    setDetailsDialogOpen(true);
    setDocsLoading(true);
    setDocuments([]);
    try {
      const propId = transfer.property_id || transfer.id || transfer.land_id;
      let docs = [];
      if (propId && typeof getTransferByLandId === "function") {
        docs = await getTransferByLandId(propId);
      }
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

  const handleApprove = (transfer) => {
    setSelectedTransfer(transfer);
    setApproveDialogOpen(true);
  };

  const handleReject = (transfer) => {
    setSelectedTransfer(transfer);
    setRejectDialogOpen(true);
  };

  const handleApproveSubmit = async () => {
    try {
      // Here you would call the API to approve the transfer
      // await apiClient.transfer.update(selectedTransfer.id, {
      //   status: "approved",
      //   approvalNotes: actionNotes,
      //   approvedBy: currentUser.id,
      //   approvalDate: new Date().toISOString()
      // });

      setApproveDialogOpen(false);
      setActionNotes("");
      setSelectedTransfer(null);
      // Refresh the list
      // loadTransfers();
    } catch (error) {
      console.error("Failed to approve transfer:", error);
    }
  };

  const handleRejectSubmit = async () => {
    try {
      // Here you would call the API to reject the transfer
      // await apiClient.transfer.update(selectedTransfer.id, {
      //   status: "rejected",
      //   rejectionNotes: actionNotes,
      //   rejectedBy: currentUser.id,
      //   rejectionDate: new Date().toISOString()
      // });

      setRejectDialogOpen(false);
      setActionNotes("");
      setSelectedTransfer(null);
      // Refresh the list
      // loadTransfers();
    } catch (error) {
      console.error("Failed to reject transfer:", error);
    }
  };

  return (
    <OfficerLayout>
      <Box>
        {/* Search */}
        <Box sx={{ mb: 3 }}>
          <SearchField
            placeholder="Search transfers by property, owner, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 500 }}
          />
        </Box>

        {/* Transfers Grid */}
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
            {filteredTransfers.map((transfer, index) => (
              <Grid item xs={12} sm={6} lg={4} key={transfer.id}>
                <TransferCard
                  transfer={transfer}
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
        {!loading && filteredTransfers.length === 0 && (
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
                  <SwapHorizIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  No pending transfers
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  All property transfer requests have been processed
                </Typography>
              </ModernCardContent>
            </ModernCard>
          </Fade>
        )}

        {/* Details Dialog */}
        <ModernDialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          title={`Transfer Details: ${
            selectedTransfer?.propertyName ||
            `Transfer #${selectedTransfer?.id}`
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
                  handleReject(selectedTransfer);
                }}
                sx={{ minWidth: 120 }}
              >
                Reject
              </ModernButton>
              <ModernButton
                variant="gradient"
                onClick={() => {
                  setDetailsDialogOpen(false);
                  handleApprove(selectedTransfer);
                }}
                sx={{ minWidth: 120 }}
              >
                Approve
              </ModernButton>
            </>
          }
        >
          {selectedTransfer && (
            <Box sx={{ py: 1 }}>
              {/* Transfer Overview Card */}
              <ModernCard variant="outlined" sx={{ mb: 3, p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <SwapHorizIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Transfer Overview
                  </Typography>
                  <Chip
                    label={selectedTransfer.status || "Unknown"}
                    color={getStatusColor(selectedTransfer.status)}
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
                      {selectedTransfer.propertyName || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Current Owner
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {selectedTransfer.currentOwner || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      New Owner
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {selectedTransfer.newOwner || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Transfer Value
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="primary.main"
                    >
                      {selectedTransfer.transferValue || "N/A"}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      Transfer Date
                    </Typography>
                    <Typography variant="body2">
                      {selectedTransfer.transferDate
                        ? new Date(
                            selectedTransfer.transferDate
                          ).toLocaleDateString()
                        : "N/A"}
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
                ) : documents.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No documents found for this transfer.
                    </Typography>
                  </Box>
                ) : (
                  <List sx={{ py: 0 }}>
                    {documents.map((doc, idx) => (
                      <ListItem
                        key={doc.id || idx}
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
                              {doc.name ||
                                doc.filename ||
                                `Document #${idx + 1}`}
                            </Typography>
                          }
                          secondary={
                            doc.uploadedAt && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Uploaded{" "}
                                {new Date(doc.uploadedAt).toLocaleDateString()}
                              </Typography>
                            )
                          }
                        />
                        {doc.url && (
                          <ListItemSecondaryAction>
                            <IconButton
                              size="small"
                              color="primary"
                              component="a"
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
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
                        )}
                      </ListItem>
                    ))}
                  </List>
                )}
              </ModernCard>
            </Box>
          )}
        </ModernDialog>

        {/* Approve Dialog */}
        <ModernDialog
          open={approveDialogOpen}
          onClose={() => setApproveDialogOpen(false)}
          title="Approve Transfer"
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
                sx={{ minWidth: 140 }}
              >
                Approve Transfer
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
                  Approve Property Transfer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This action will approve the transfer request
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Are you sure you want to approve this property transfer? This
              action will:
            </Typography>

            <Box sx={{ mb: 3, ml: 2 }}>
              <Typography
                variant="body2"
                sx={{ mb: 1, display: "flex", alignItems: "center" }}
              >
                • Transfer ownership to the new buyer
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1, display: "flex", alignItems: "center" }}
              >
                • Update property records in the system
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                • Notify all parties involved
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
          title="Reject Transfer"
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
                sx={{ minWidth: 140 }}
              >
                Reject Transfer
              </ModernButton>
            </>
          }
        >
          <Box sx={{ py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <CancelIcon sx={{ color: "error.main", mr: 2, fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight={600} color="error.main">
                  Reject Property Transfer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This action will reject the transfer request
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Are you sure you want to reject this property transfer? Please
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
