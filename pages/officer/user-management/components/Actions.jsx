import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as ActivateIcon,
} from "@mui/icons-material";

export default function Actions({
  user,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  return (
    <>
      <Tooltip title="View Details">
        <IconButton onClick={() => onView && onView(user)}>
          <ViewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit User">
        <IconButton onClick={() => onEdit && onEdit(user)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={user?.status === "active" ? "Block User" : "Activate User"}
      >
        <IconButton onClick={() => onToggleStatus && onToggleStatus(user)}>
          {user?.status === "blocked" ? (
            <BlockIcon color="error" />
          ) : (
            <ActivateIcon color="success" />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete User">
        <IconButton onClick={() => onDelete && onDelete(user)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
    </>
  );
}
