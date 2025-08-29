"use client";
import { useEffect, useState } from "react";
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
  Chip,
  IconButton,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  CheckCircle as ActivateIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import OfficerLayout from "@/components/layouts/OfficerLayout";

export default function OfficerManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDialog, setUserDialog] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await (await import("@/lib/api")).apiClient.user
          .getDetails()
          .catch(() => []);
        const list = Array.isArray(res) ? res : [];
        if (mounted)
          setUsers(
            list.map((u, i) => ({
              id: u.id ?? i,
              name: u.name || u.fullName || u.email?.split("@")[0] || "User",
              email: u.email || "-",
              role: u.role || "government_officer",
              status: u.status || "active",
              properties: u.propertiesCount || 0,
              joinDate: u.createdAt || "-",
              lastLogin: u.lastLogin || "-",
            }))
          );
      } catch {
        if (mounted) setUsers([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const getRoleColor = (role) =>
    role === "admin"
      ? "error"
      : role === "government_officer"
      ? "warning"
      : role === "property_owner"
      ? "primary"
      : "default";
  const getStatusColor = (status) =>
    status === "active"
      ? "success"
      : status === "blocked"
      ? "error"
      : status === "pending"
      ? "warning"
      : "default";

  const filtered = users.filter(
    (u) =>
      (filterStatus === "all" || u.status === filterStatus) &&
      (u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <OfficerLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Properties</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar sx={{ mr: 2 }}>{u.name.charAt(0)}</Avatar>
                          <Box>
                            <Typography variant="body2">{u.name}</Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {u.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={u.role.replace("_", " ")}
                          color={getRoleColor(u.role)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={u.status}
                          color={getStatusColor(u.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{u.properties}</TableCell>
                      <TableCell>{u.joinDate}</TableCell>
                      <TableCell>{u.lastLogin}</TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton
                            onClick={() => {
                              setSelectedUser(u);
                              setUserDialog(true);
                            }}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit User">
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={
                            u.status === "active"
                              ? "Block User"
                              : "Activate User"
                          }
                        >
                          <IconButton>
                            {u.status === "active" ? (
                              <BlockIcon />
                            ) : (
                              <ActivateIcon />
                            )}
                          </IconButton>
                        </Tooltip>
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
            onRowsPerPageChange={(e) =>
              setRowsPerPage(parseInt(e.target.value, 10))
            }
          />
        </Paper>

        <Dialog
          open={userDialog}
          onClose={() => setUserDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>User Details</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <Typography variant="h6">{selectedUser.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedUser.email}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUserDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </OfficerLayout>
  );
}
