import React from "react";
import { Box, Typography } from "@mui/material";

export default function SummaryStep({
  nftDetails,
  propertyDetails,
  docs,
  watch,
}) {
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Summary
      </Typography>
      <Typography variant="body2">
        NFT Token ID: {nftDetails?.token_id}
      </Typography>
      <Typography variant="body2">
        Property Address: {propertyDetails?.address}
      </Typography>
      <Typography variant="body2">
        Owner Name: {propertyDetails?.owner_name}
      </Typography>
      <Typography variant="body2">
        District: {propertyDetails?.district}
      </Typography>
      <Typography variant="body2">
        Province: {propertyDetails?.province}
      </Typography>
      <Typography variant="body2">
        Land Area: {propertyDetails?.land_area}
      </Typography>
      <Typography variant="body2">Buyer NIC: {watch("buyerNIC")}</Typography>
      <Typography variant="body2">
        Description: {watch("description")}
      </Typography>
      <Typography variant="body2">Amount: {watch("amount")}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Documents: {Object.keys(docs).filter((k) => docs[k]).length} attached
      </Typography>
    </Box>
  );
}
