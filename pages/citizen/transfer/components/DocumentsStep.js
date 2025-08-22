import React from "react";
import { Grid } from "@mui/material";
import FileUpload from "@/components/common/FileUpload";

export default function DocumentsStep({ onFilesChange }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FileUpload
          label="Sale Agreement"
          required
          onFilesChange={(f) => onFilesChange(f, "saleAgreement")}
          maxFiles={1}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FileUpload
          label="Affidavit"
          required
          onFilesChange={(f) => onFilesChange(f, "affidavit")}
          maxFiles={1}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FileUpload
          label="Consent Letters"
          required
          onFilesChange={(f) => onFilesChange(f, "consentLetters")}
          maxFiles={2}
        />
      </Grid>
    </Grid>
  );
}
