import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Alert,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";

export default function ReviewStep({
  requiredDocuments,
  uploadedFiles,
  watch,
}) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review & Submit
      </Typography>
      <GridContainer>
        <CardBlock>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <LocationIcon sx={{ mr: 1 }} />
            Property Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List dense>
            <ListItem>
              <ListItemText
                primary="Property Title"
                secondary={watch("propertyTitle")}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Plot Number"
                secondary={watch("plotNumber")}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Address" secondary={watch("address")} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Land Area"
                secondary={`${watch("landArea")} perches`}
              />
            </ListItem>
          </List>
        </CardBlock>
        <CardBlock>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <DescriptionIcon sx={{ mr: 1 }} />
            Uploaded Documents
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List dense>
            {requiredDocuments.map((doc) => (
              <ListItem key={doc.id}>
                <ListItemIcon>
                  {uploadedFiles[doc.id] ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <DescriptionIcon color="disabled" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={doc.name}
                  secondary={
                    uploadedFiles[doc.id]
                      ? uploadedFiles[doc.id].name
                      : "Not uploaded"
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardBlock>
      </GridContainer>
      <Alert severity="warning" sx={{ mt: 3 }}>
        By submitting, you confirm information is accurate and documents are
        authentic.
      </Alert>
    </Box>
  );
}

function GridContainer({ children }) {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>{children}</div>
  );
}

function CardBlock({ children }) {
  return (
    <div style={{ flex: "1 1 45%", minWidth: 300 }}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
