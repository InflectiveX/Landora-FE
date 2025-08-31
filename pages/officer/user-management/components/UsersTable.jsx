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

export default function UsersTable({
  users,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  onView,
  onEdit,
  onToggleStatus,
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
                    <Tooltip title="View Details">
                      <IconButton onClick={() => onView(u)}>
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit User">
                      <IconButton onClick={() => onEdit(u)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={
                        u.status === "active" ? "Block User" : "Activate User"
                      }
                    >
                      <IconButton
                        onClick={() => onToggleStatus && onToggleStatus(u)}
                      >
                        {/* Show icon representing current status (blocked => BlockIcon, active => ActivateIcon)", previously icon represented the action which made blocked users appear without a visible icon */}
                        {u.status === "blocked" ? (
                          <BlockIcon color="error" />
                        ) : (
                          <ActivateIcon color="success" />
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleRowsPerPage}
      />
    </Paper>
  );
}
