import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  TablePagination,
  Paper,
  Typography,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  CheckCircle as ActivateIcon,
} from "@mui/icons-material";
import Actions from "./Actions";

export default function UsersTable({
  users,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  const handleChangePage = (e, p) => setPage(p);
  const handleRowsPerPage = (e) => setRowsPerPage(parseInt(e.target.value, 10));

  return (
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
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ mr: 2 }}>{u.name?.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="body2">{u.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {u.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={u.role?.replace("_", " ")} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={u.status} size="small" />
                  </TableCell>
                  <TableCell>{u.properties}</TableCell>
                  <TableCell>{u.joinDate}</TableCell>
                  <TableCell>{u.lastLogin}</TableCell>
                  <TableCell>
                    <Actions
                      user={u}
                      onView={onView}
                      onEdit={onEdit}
                      onToggleStatus={onToggleStatus}
                      onDelete={onDelete}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleRowsPerPage}
      />
    </Paper>
  );
}
