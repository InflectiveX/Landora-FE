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
import Filters from "./components/Filters";
import UsersTable from "./components/UsersTable";
import UserDialogs from "./components/UserDialogs";
import { apiClient } from "@/lib/api";
import { enqueue } from "@/lib/snackbar";
import { useAuth } from "@/contexts/AuthContext";

export default function OfficerManagement() {
  const { user } = useAuth();
  // default tab: admins see officers tab, officers see citizens tab
  const defaultTab = user && user.role === "admin" ? "officers" : "citizen";
  const [activeTab, setActiveTab] = useState(defaultTab);
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
  const [addOfficerOpen, setAddOfficerOpen] = useState(false);
  const [newOfficer, setNewOfficer] = useState({
    name: "",
    email: "",
    nic: "",
  });
  // confirmation dialog state (MUI)
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmOpts, setConfirmOpts] = useState({
    title: "",
    description: "",
    onConfirm: null,
  });

  const showConfirm = ({ title, description, onConfirm }) => {
    setConfirmOpts({ title, description, onConfirm });
    setConfirmOpen(true);
  };

  const loadUsers = async () => {
    try {
      const res = await apiClient.user.getDetails();
      const list = Array.isArray(res) ? res : [];
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
      setUsers([]);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) loadUsers();
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
      return !["government_officer", "officer", "admin"].includes(u.role);
    }
    // default: show all
    return true;
  });

  const handleToggleStatus = async (u) => {
    // backend expects action 'blocked' to block, and 'active' to activate
    const action = u.status === "active" ? "blocked" : "active";

    showConfirm({
      title: action === "blocked" ? "Block user" : "Activate user",
      description:
        action === "blocked"
          ? `Are you sure you want to block ${u.name || u.email}?`
          : `Are you sure you want to activate ${u.name || u.email}?`,
      onConfirm: async () => {
        try {
          await apiClient.user.blockUnblockUser({ id: u.id, action });
          enqueue(
            `User ${
              action === "blocked" ? "blocked" : "activated"
            } successfully`,
            { variant: "success" }
          );
          await loadUsers();
        } catch (e) {
          console.error("toggle status failed", e);
          try {
            enqueue("Failed to change user status", { variant: "error" });
          } catch (e2) {}
        }
      },
    });
  };

  const handleAddOfficer = async () => {
    showConfirm({
      title: "Add officer",
      description: `Add officer ${newOfficer.name || newOfficer.email || ""}?`,
      onConfirm: async () => {
        try {
          await apiClient.user.addOfficer({
            name: newOfficer.name,
            email: newOfficer.email,
            nic: newOfficer.nic,
          });
          enqueue("Officer added successfully", { variant: "success" });
          setAddOfficerOpen(false);
          setNewOfficer({ name: "", email: "", nic: "" });
          await loadUsers();
        } catch (e) {
          console.error("addOfficer failed", e);
          try {
            enqueue("Failed to add officer", { variant: "error" });
          } catch (e2) {}
        }
      },
    });
  };

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
          {user && user.role === "admin" && (
            <Tab label="Officers" value="officers" />
          )}
          <Tab label="Citizens" value="citizen" />
        </Tabs>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Filters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {user && user.role === "admin" && (
            <Box sx={{ ml: 2 }}>
              <Button
                variant="contained"
                onClick={() => setAddOfficerOpen(true)}
              >
                Add Officer
              </Button>
            </Box>
          )}
        </Box>
        <UsersTable
          users={filteredByTab}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          onView={(u) => {
            const raw = rawUsers.find((r) => r.id === u.id) || u;
            setSelectedUser(raw);
            setUserDialog(true);
          }}
          onEdit={(u) => {
            const raw = rawUsers.find((r) => r.id === u.id) || u;
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
          onToggleStatus={handleToggleStatus}
        />

        {/* Add Officer Dialog (Admin only) */}
        <Dialog
          open={addOfficerOpen}
          onClose={() => setAddOfficerOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Officer</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ pt: 1 }}>
              <Grid xs={12}>
                <TextField
                  label="Name"
                  fullWidth
                  value={newOfficer.name}
                  onChange={(e) =>
                    setNewOfficer((s) => ({ ...s, name: e.target.value }))
                  }
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Email"
                  fullWidth
                  value={newOfficer.email}
                  onChange={(e) =>
                    setNewOfficer((s) => ({ ...s, email: e.target.value }))
                  }
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="NIC"
                  fullWidth
                  value={newOfficer.nic}
                  onChange={(e) =>
                    setNewOfficer((s) => ({ ...s, nic: e.target.value }))
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddOfficerOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddOfficer}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <UserDialogs
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          userDialogOpen={userDialog}
          setUserDialogOpen={setUserDialog}
          editForm={editForm}
          setEditForm={setEditForm}
          editDialogOpen={editDialog}
          setEditDialogOpen={setEditDialog}
          onSave={async () => {
            // ask for confirmation before saving edits
            const confirmed = window.confirm(
              `Save changes to ${editForm?.name || editForm?.email || "user"}?`
            );
            if (!confirmed) return;

            try {
              await apiClient.user.update(editForm.id, {
                name: editForm.name,
                email: editForm.email,
                nic: editForm.nic,
                role: editForm.role,
                status: editForm.status,
              });
              await loadUsers();
              setEditDialog(false);
              try {
                enqueue("User updated successfully", { variant: "success" });
              } catch (e) {
                console.warn("Snackbar enqueue failed", e);
              }
            } catch (e) {
              console.error("Update failed", e);
              try {
                enqueue("Failed to update user", { variant: "error" });
              } catch (e2) {
                console.warn("Snackbar enqueue failed", e2);
              }
              setEditDialog(false);
            }
          }}
        />
        {/* Confirmation dialog (MUI) */}
        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>{confirmOpts.title}</DialogTitle>
          <DialogContent>
            <Typography>{confirmOpts.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={async () => {
                setConfirmOpen(false);
                try {
                  if (confirmOpts.onConfirm) await confirmOpts.onConfirm();
                } catch (e) {
                  console.error("confirm action failed", e);
                }
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </OfficerLayout>
  );
}
