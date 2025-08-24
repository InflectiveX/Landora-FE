import React from "react";
import { Box, Typography, Alert, Card, CardContent, Chip } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Description as DescriptionIcon } from "@mui/icons-material";
import FileUpload from "@/components/common/FileUpload";

export default function DocumentsStep({
  requiredDocuments,
  handleFileUpload,
  uploadedFiles,
}) {
  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
      >
        Document Upload
      </Typography>
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2, fontSize: 16 }}>
        Please upload clear, high-resolution scans. Accepted: PDF, JPG, PNG (Max
        10MB)
      </Alert>
      <Grid container spacing={3}>
        {requiredDocuments.map((doc) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={doc.id}>
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <DescriptionIcon
                    sx={{ color: "primary.main", fontSize: 32 }}
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {doc.name}
                    {doc.required && (
                      <Chip
                        label="Required"
                        size="small"
                        color="error"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                </Box>
                <FileUpload
                  onFilesChange={(files) => handleFileUpload(files, doc.id)}
                  acceptedTypes={{
                    "application/pdf": [".pdf"],
                    "image/*": [".png", ".jpg", ".jpeg"],
                  }}
                  maxFiles={1}
                  maxSize={10 * 1024 * 1024}
                  required={doc.required}
                  label={null}
                  description={`Upload file for ${doc.name}`}
                />
                {uploadedFiles[doc.id] && (
                  <Typography
                    variant="body2"
                    color="success.main"
                    sx={{ mt: 1 }}
                  >
                    ✓ {uploadedFiles[doc.id].name}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
