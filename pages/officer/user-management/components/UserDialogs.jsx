import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
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
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

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
      <Dialog
        open={userDialogOpen}
        onClose={() => setUserDialogOpen(false)}
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
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
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
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={onSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
