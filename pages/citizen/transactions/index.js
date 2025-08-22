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
  TablePagination,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  AccountBalance as AccountBalanceIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import { useApi } from "@/lib/api";
import CitizenLayout from "@/components/layouts/CitizenLayout";

export default function TransactionHistory() {
  const { getCurrentUserTransfers } = useApi();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getCurrentUserTransfers().catch((error) => {
          console.error("Error fetching transactions:", error);
          return [];
        });
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Transaction history error:", error);
      } finally {
        setLoading(false);
      }
    };
    run();
    const intervalId = setInterval(run, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [getCurrentUserTransfers]);

  const getStatusColor = (status) =>
    ({
      completed: "success",
      pending: "warning",
      failed: "error",
      processing: "info",
    }[status] || "default");
  const getTypeColor = (type) =>
    ({ registration: "primary", transfer: "secondary", verification: "info" }[
      type
    ] || "default");

  const filtered = transactions.filter((t) => {
    const matchesSearch = (t.description || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    const matchesType =
      filterType === "all" ||
      t.property_type === filterType ||
      t.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const pageRows = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <CitizenLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      </CitizenLayout>
    );
  }

  return (
    <CitizenLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Transaction History
        </Typography>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              fullWidth
              placeholder="Search by property or transaction hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              Filters
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setFilterStatus("all");
                  setAnchorEl(null);
                }}
              >
                All Statuses
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterStatus("completed");
                  setAnchorEl(null);
                }}
              >
                Completed
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterStatus("pending");
                  setAnchorEl(null);
                }}
              >
                Pending
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterStatus("failed");
                  setAnchorEl(null);
                }}
              >
                Failed
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterType("all");
                  setAnchorEl(null);
                }}
              >
                All Types
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterType("registration");
                  setAnchorEl(null);
                }}
              >
                Registration
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterType("transfer");
                  setAnchorEl(null);
                }}
              >
                Transfer
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterType("verification");
                  setAnchorEl(null);
                }}
              >
                Verification
              </MenuItem>
            </Menu>
          </Box>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageRows.map((t, idx) => (
                <TableRow key={t.id || idx} hover>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {t.description || "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={(t.property_type || t.type || "").toUpperCase()}
                      color={getTypeColor(t.property_type || t.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={(t.status || "").toUpperCase()}
                      color={getStatusColor(t.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{t.amount || "-"}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setSelectedTransaction(t);
                        setDialogOpen(true);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filtered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, p) => setPage(p)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedTransaction && (
            <>
              <DialogTitle>Transaction Details</DialogTitle>
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
                          <AccountBalanceIcon
                            sx={{ mr: 1, color: "primary.main" }}
                          />
                          Overview
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List dense>
                          <ListItem>
                            <ListItemText
                              primary="Type"
                              secondary={
                                <Chip
                                  label={(
                                    selectedTransaction.property_type ||
                                    selectedTransaction.type ||
                                    ""
                                  ).toUpperCase()}
                                  color={getTypeColor(
                                    selectedTransaction.property_type ||
                                      selectedTransaction.type
                                  )}
                                  size="small"
                                />
                              }
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Status"
                              secondary={
                                <Chip
                                  label={(
                                    selectedTransaction.status || ""
                                  ).toUpperCase()}
                                  color={getStatusColor(
                                    selectedTransaction.status
                                  )}
                                  size="small"
                                />
                              }
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Amount"
                              secondary={selectedTransaction.amount || "-"}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Description"
                              secondary={selectedTransaction.description || "-"}
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
                          <SecurityIcon sx={{ mr: 1, color: "primary.main" }} />
                          IDs
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List dense>
                          <ListItem>
                            <ListItemText
                              primary="Transaction ID"
                              secondary={String(selectedTransaction.id)}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="NFT ID"
                              secondary={String(selectedTransaction.nft_id)}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Property ID"
                              secondary={String(
                                selectedTransaction.property_id
                              )}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="From User"
                              secondary={String(
                                selectedTransaction.from_user_id
                              )}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="To User"
                              secondary={String(selectedTransaction.to_user_id)}
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </CitizenLayout>
  );
}
