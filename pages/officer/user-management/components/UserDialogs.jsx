import React from "react";
import {
  Grid,
  Avatar,
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ModernDialog from "@/components/ui/ModernDialog";

export default function UserDialogs({
  selectedUser,
  setSelectedUser,
  userDialogOpen,
  setUserDialogOpen,
  editForm,
  setEditForm,
  editDialogOpen,
  setEditDialogOpen,
  onSave,
}) {
  return (
    <>
      <ModernDialog
        open={userDialogOpen}
        onClose={() => setUserDialogOpen(false)}
        title="User Details"
        variant="glass"
        PaperProps={{
          sx: {
            maxWidth: 500,
            width: "100%",
            mx: "auto",
            p: 3,
          },
        }}
      >
        {selectedUser && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar sx={{ width: 72, height: 72, fontSize: 28, mb: 2 }}>
              {selectedUser.name?.[0] || "U"}
            </Avatar>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 0.5, textAlign: "center" }}
            >
              {selectedUser.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              {selectedUser.email}
            </Typography>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  minWidth: 320,
                  maxWidth: 400,
                  width: "100%",
                  mx: "auto",
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: 3,
                  boxShadow: "0 2px 16px 0 rgba(80,120,255,0.06)",
                  border: "1.5px solid #cfe2ff",
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography color="text.secondary">ID</Typography>
                  <Typography>{selectedUser.id}</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography color="text.secondary">Name</Typography>
                  <Typography>{selectedUser.name}</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography color="text.secondary">Role</Typography>
                  <Typography>{selectedUser.role}</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography color="text.secondary">Email</Typography>
                  <Typography>{selectedUser.email}</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography color="text.secondary">NIC</Typography>
                  <Typography>{selectedUser.nic || "-"}</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography color="text.secondary">Status</Typography>
                  <Typography>{selectedUser.status || "-"}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </ModernDialog>

      <ModernDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title={null}
        variant="glass"
        PaperProps={{
          sx: {
            maxWidth: 420,
            width: "100%",
            mx: "auto",
            p: 3,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
        >
          Edit User
        </Typography>
        {editForm && (
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={editForm.name}
              onChange={(e) =>
                setEditForm((s) => ({ ...s, name: e.target.value }))
              }
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={editForm.email}
              onChange={(e) =>
                setEditForm((s) => ({ ...s, email: e.target.value }))
              }
            />
            <TextField
              label="NIC"
              fullWidth
              margin="normal"
              value={editForm.nic}
              onChange={(e) =>
                setEditForm((s) => ({ ...s, nic: e.target.value }))
              }
            />
            <FormControl fullWidth margin="normal">
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
            <FormControl fullWidth margin="normal">
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button onClick={() => setEditDialogOpen(false)} color="inherit">
                Cancel
              </Button>
              <Button variant="contained" onClick={onSave}>
                Save
              </Button>
            </Box>
          </Box>
        )}
      </ModernDialog>
    </>
  );
}
