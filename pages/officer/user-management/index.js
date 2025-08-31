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
  Tabs,
  Tab,
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
  const [activeTab, setActiveTab] = useState("officers");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDialog, setUserDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [users, setUsers] = useState([]);
  const [rawUsers, setRawUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      try {
        const api = await import("@/lib/api");
        const res = await api.apiClient.user.getDetails().catch(() => []);
        const list = Array.isArray(res) ? res : [];
        if (!mounted) return;
        setRawUsers(list);
        setUsers(
          list.map((u, i) => ({
            id: u.id ?? i,
            name: u.name || u.fullName || u.email?.split("@")[0] || "User",
            email: u.email || "-",
            role: u.role || "government_officer",
            status: u.status || "active",
            properties: u.propertiesCount || 0,
            joinDate: u.join_date || u.createdAt || "-",
            lastLogin: u.last_login || u.lastLogin || "-",
          }))
        );
      } catch (e) {
        if (mounted) setUsers([]);
      }
    };
    fetchUsers();
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

  // Apply tab filtering
  const filteredByTab = filtered.filter((u) => {
    if (activeTab === "officers") {
      return u.role === "government_officer" || u.role === "officer";
    }
    // Citizens tab: exclude admin/officer roles so only citizens remain
    if (activeTab === "citizen" || activeTab === "citizens") {
      return !["government_officer", "officer", "admin"].includes(
        u.role
      );
    }
    // default: show all
    return true;
  });

  return (
    <OfficerLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{ mb: 2 }}
        >
          <Tab label="Officers" value="officers" />
          <Tab label="Citizens" value="citizen" />
        </Tabs>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search citizens..."
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
                {filteredByTab
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
                              // find raw user by id to show full details
                              const raw =
                                rawUsers.find((r) => r.id === u.id) || u;
                              setSelectedUser(raw);
                              setUserDialog(true);
                            }}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit User">
                          <IconButton
                            onClick={() => {
                              const raw =
                                rawUsers.find((r) => r.id === u.id) || u;
                              setEditForm({
                                id: raw.id,
                                name: raw.name || "",
                                email: raw.email || "",
                                nic: raw.nic || "",
                                role: raw.role || "government_officer",
                                status: raw.status || "active",
                              });
                              setEditDialog(true);
                            }}
                          >
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
                <Grid xs={12} md={4}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ width: 72, height: 72, fontSize: 28 }}>
                      {selectedUser.name?.[0] || "U"}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{selectedUser.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedUser.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={12} md={8}>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>{selectedUser.id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>{selectedUser.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Role</TableCell>
                          <TableCell>{selectedUser.role}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Email</TableCell>
                          <TableCell>{selectedUser.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>NIC</TableCell>
                          <TableCell>{selectedUser.nic || "-"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell>{selectedUser.status || "-"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Join Date</TableCell>
                          <TableCell>
                            {selectedUser.join_date ||
                              selectedUser.joinDate ||
                              "-"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Last Login</TableCell>
                          <TableCell>
                            {selectedUser.last_login ||
                              selectedUser.lastLogin ||
                              "-"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Token</TableCell>
                          <TableCell>{selectedUser.token || "-"}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUserDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog
          open={editDialog}
          onClose={() => setEditDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            {editForm && (
              <Grid container spacing={2} sx={{ pt: 1 }}>
                <Grid xs={12}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm((s) => ({ ...s, name: e.target.value }))
                    }
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((s) => ({ ...s, email: e.target.value }))
                    }
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    label="NIC"
                    fullWidth
                    value={editForm.nic}
                    onChange={(e) =>
                      setEditForm((s) => ({ ...s, nic: e.target.value }))
                    }
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={editForm.role}
                      label="Role"
                      onChange={(e) =>
                        setEditForm((s) => ({ ...s, role: e.target.value }))
                      }
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="officer">Officer</MenuItem>
                      <MenuItem value="citizen">User</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={editForm.status}
                      label="Status"
                      onChange={(e) =>
                        setEditForm((s) => ({ ...s, status: e.target.value }))
                      }
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="blocked">Blocked</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={async () => {
                try {
                  const api = await import("@/lib/api");
                  await api.apiClient.user.update(editForm.id, {
                    name: editForm.name,
                    email: editForm.email,
                    nic: editForm.nic,
                    role: editForm.role,
                    status: editForm.status,
                  });
                  // Refresh list
                  const res = await api.apiClient.user.getDetails();
                  const list = Array.isArray(res) ? res : [];
                  setRawUsers(list);
                  setUsers(
                    list.map((u, i) => ({
                      id: u.id ?? i,
                      name:
                        u.name ||
                        u.fullName ||
                        u.email?.split("@")[0] ||
                        "User",
                      email: u.email || "-",
                      role: u.role || "government_officer",
                      status: u.status || "active",
                      properties: u.propertiesCount || 0,
                      joinDate: u.join_date || u.createdAt || "-",
                      lastLogin: u.last_login || u.lastLogin || "-",
                    }))
                  );
                  setEditDialog(false);
                } catch (e) {
                  console.error("Update failed", e);
                  setEditDialog(false);
                }
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </OfficerLayout>
  );
}
