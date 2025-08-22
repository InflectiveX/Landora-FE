import React, { useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  Divider,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { enqueue } from "@/lib/snackbar";

export default function BuyerInfo({
  nftDetails,
  propertyDetails,
  register,
  errors,
  watch,
  buyerUser,
  buyerLookupLoading,
  buyerLookupError,
}) {
  const inputProps = { size: "small" };
  const buyerNIC = watch("buyerNIC");
  const ownerNIC = propertyDetails?.owner_nic;
  const ownerConflict =
    buyerNIC && ownerNIC && String(buyerNIC).trim() === String(ownerNIC).trim();

  // Show toast notifications for lookup errors, owner conflict, and buyer found.
  const prev = useRef({
    buyerUser: null,
    buyerLookupError: null,
    ownerConflict: null,
  });
  useEffect(() => {
    try {
      if (
        buyerLookupError &&
        buyerLookupError !== prev.current.buyerLookupError
      ) {
        enqueue(buyerLookupError, { variant: "error" });
      }
      if (ownerConflict && ownerConflict !== prev.current.ownerConflict) {
        enqueue("Buyer NIC cannot be same as Owner NIC", { variant: "error" });
      }
      if (buyerUser && buyerUser !== prev.current.buyerUser) {
        const name = buyerUser?.name || buyerUser?.full_name || "Buyer";
        enqueue(`Buyer found: ${name}`, { variant: "success" });
      }
    } catch (e) {
      // ignore snackbar errors
    }
    prev.current = { buyerUser, buyerLookupError, ownerConflict };
  }, [buyerUser, buyerLookupError, ownerConflict]);

  return (
    <Grid container spacing={3}>
      {/* Property Details */}
      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Property Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="NFT Token ID"
                value={nftDetails?.token_id || ""}
                InputProps={{ readOnly: true }}
                {...inputProps}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Property Address"
                value={propertyDetails?.address || ""}
                InputProps={{ readOnly: true }}
                {...inputProps}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Owner Name"
                value={propertyDetails?.owner_name || ""}
                InputProps={{ readOnly: true }}
                {...inputProps}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="District"
                value={propertyDetails?.district || ""}
                InputProps={{ readOnly: true }}
                {...inputProps}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="Province"
                value={propertyDetails?.province || ""}
                InputProps={{ readOnly: true }}
                {...inputProps}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Land Area"
                value={propertyDetails?.land_area || ""}
                InputProps={{ readOnly: true }}
                {...inputProps}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Estimated Value"
                value={
                  propertyDetails?.estimated_value ||
                  propertyDetails?.estimatedValue ||
                  ""
                }
                InputProps={{ readOnly: true }}
                {...inputProps}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Owner NIC"
                value={propertyDetails?.owner_nic}
                InputProps={{ readOnly: true }}
                {...inputProps}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Buyer Details */}
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Buyer Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Buyer NIC"
                {...register("buyerNIC")}
                required
                error={
                  !!errors?.buyerNIC || !!buyerLookupError || ownerConflict
                }
                helperText={
                  ownerConflict
                    ? "Buyer NIC cannot be same as Owner NIC"
                    : errors?.buyerNIC?.message || buyerLookupError
                }
                InputProps={{
                  endAdornment: buyerLookupLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress size={18} />
                    </Box>
                  ) : undefined,
                }}
                {...inputProps}
              />
            </Grid>

            {/* Hidden buyerId set by parent */}
            <input type="hidden" {...register("buyerId")} />

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Buyer Name"
                value={buyerUser?.name || buyerUser?.full_name || ""}
                InputProps={{ readOnly: true }}
                {...inputProps}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Buyer Email"
                value={buyerUser?.email || buyerUser?.email_address || ""}
                InputProps={{ readOnly: true }}
                {...inputProps}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Additional Details */}
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Additional Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                {...register("description")}
                required
                error={!!errors?.description}
                helperText={errors?.description?.message}
                {...inputProps}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Transfer Amount"
                required
                {...register("amount")}
                error={!!errors?.amount}
                helperText={errors?.amount?.message}
                {...inputProps}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
