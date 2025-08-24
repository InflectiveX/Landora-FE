import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function PropertyInfo({ register, errors }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Property Information
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            label="Property Title"
            {...register("propertyTitle", {
              required: "Property title is required",
            })}
            error={!!errors.propertyTitle}
            helperText={errors.propertyTitle?.message}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            label="Survey/Plot Number"
            {...register("plotNumber", { required: "Plot number is required" })}
            error={!!errors.plotNumber}
            helperText={errors.plotNumber?.message}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Property Address"
            multiline
            rows={2}
            {...register("address", { required: "Address is required" })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <TextField
            fullWidth
            label="District"
            {...register("district", { required: "District is required" })}
            error={!!errors.district}
            helperText={errors.district?.message}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <TextField
            fullWidth
            label="Province"
            {...register("province", { required: "Province is required" })}
            error={!!errors.province}
            helperText={errors.province?.message}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <TextField
            fullWidth
            label="Land Area (in perches)"
            type="number"
            {...register("landArea", { required: "Land area is required" })}
            error={!!errors.landArea}
            helperText={errors.landArea?.message}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            select
            SelectProps={{ native: true }}
            {...register("propertyType", {
              required: "Property type is required",
            })}
            error={!!errors.propertyType}
            helperText={errors.propertyType?.message}
          >
            <option value="">Select Property Type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="agricultural">Agricultural</option>
            <option value="industrial">Industrial</option>
          </TextField>
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            label="Current Owner's NIC"
            {...register("ownerNIC", { required: "Owner NIC is required" })}
            error={!!errors.ownerNIC}
            helperText={errors.ownerNIC?.message}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
