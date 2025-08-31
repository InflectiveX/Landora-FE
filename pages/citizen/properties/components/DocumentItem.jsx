import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

export default function DocumentItem({ d, onOpen }) {
  const theme = useTheme();
  const docUrl = d.url || d.path || null;

  const handleView = () => {
    if (docUrl && String(docUrl).toLowerCase().endsWith(".pdf")) {
      // open in pdf-viewer route
      window.open(`/pdf-viewer?url=${encodeURIComponent(docUrl)}`, "_blank");
      return;
    }
    onOpen && onOpen(d);
  };

  const handleDownload = () => {
    if (docUrl) window.open(docUrl, "_blank", "noopener");
  };

  return (
    <ListItem
      sx={{
        px: 0,
        py: 1.5,
        borderRadius: 1,
        "&:hover": {
          backgroundColor: alpha(theme.palette.action.hover, 0.05),
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <DescriptionIcon color="primary" />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body1" fontWeight={500}>
            {d.name || "Document"}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="text.secondary">
            {d.type || d.description || "File"}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            color="primary"
            onClick={handleView}
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="secondary"
            onClick={handleDownload}
            sx={{
              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
              "&:hover": {
                backgroundColor: alpha(theme.palette.secondary.main, 0.2),
              },
            }}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
