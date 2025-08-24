import React from "react";
import { ListItem, ListItemText, IconButton, Box } from "@mui/material";
import {
  Description as DescriptionIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

export default function DocumentItem({ d, onOpen }) {
  const docUrl = d.url || d.path || null;

  const handleView = () => {
    if (docUrl && String(docUrl).toLowerCase().endsWith(".pdf")) {
      // open in pdf-viewer route
      window.open(`/pdf-viewer?url=${encodeURIComponent(docUrl)}`, "_blank");
      return;
    }
    onOpen && onOpen(d);
  };

  return (
    <ListItem
      secondaryAction={
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={handleView}>
            <DescriptionIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              if (docUrl) window.open(docUrl, "_blank", "noopener");
            }}
          >
            <DownloadIcon />
          </IconButton>
        </Box>
      }
    >
      <ListItemText
        primary={d.name || "Document"}
        secondary={d.type || "File"}
      />
    </ListItem>
  );
}
