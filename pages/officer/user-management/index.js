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

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
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
        />

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
      </Box>
    </OfficerLayout>
  );
}
