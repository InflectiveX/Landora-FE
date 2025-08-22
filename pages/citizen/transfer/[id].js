"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CitizenLayout from "@/components/layouts/CitizenLayout";
import FileUpload from "@/components/common/FileUpload";
import apiClient from "@/lib/api";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const steps = [
  "Buyer Information",
  "Transfer Documents",
  "Verification",
  "Summary",
];

export default function PropertyTransfer() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Get property id from URL
  const id =
    typeof window !== "undefined"
      ? window.location.pathname.match(/transfer\/(.+)$/)?.[1] || null
      : null;

  const [activeStep, setActiveStep] = useState(0);
  const [docs, setDocs] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nftDetails, setNftDetails] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);

  // Form schema
  const schema = yup.object({
    buyerNIC: yup.string().required("NIC is required"),
    description: yup.string().required("Description is required"),
    amount: yup.string().required("Amount is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Fetch NFT & Property details
  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      try {
        const nft = await apiClient.nft.getByLandId(id);
        setNftDetails(Array.isArray(nft) ? nft[0] : nft);

        const property = await apiClient.property.getById(id);
        setPropertyDetails(property);
      } catch (err) {
        console.error("Failed to fetch details", err);
        enqueueSnackbar("Failed to load property details", {
          variant: "error",
        });
      }
    };
    fetchDetails();
  }, [id, enqueueSnackbar]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onFilesChange = (files, key) =>
    setDocs((prev) => ({ ...prev, [key]: files && files[0]?.file }));

  const onSubmit = async (data) => {
    console.log("onSubmit triggered with data:", data); // Debug log
    setLoading(true);
    try {
      const body = {
        nft_id: parseInt(id),
        property_id: parseInt(propertyDetails?.id),
        to_user_id: parseInt(data.buyerNIC),
        description: data.description,
        property_type: "transfer",
        amount: data.amount,
      };
      console.log("Submitting transfer with body:", body); // Debug log
      await apiClient.transfer.register(body);

      // Upload documents
      for (const [key, file] of Object.entries(docs)) {
        if (!file) continue;
        const fd = new FormData();
        fd.append("file", file);
        fd.append("documentType", key);
        fd.append("transferFor", String(id));
        console.log(`Uploading document: ${key}`); // Debug log
        await apiClient.document.register(fd);
      }

      enqueueSnackbar("Transfer submitted successfully!", {
        variant: "success",
      });
      router.push(`/citizen/properties/${id}`);
    } catch (e) {
      console.error("Transfer failed", e);
      enqueueSnackbar("Transfer failed. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  // Validate form before opening dialog
  const handleOpenConfirm = async () => {
    const isValidForm = await trigger(); // Trigger validation
    console.log("Form is valid:", isValidForm); // Debug log
    if (isValidForm) {
      setConfirmOpen(true);
    } else {
      enqueueSnackbar("Please fill all required fields correctly.", {
        variant: "error",
      });
    }
  };

  // Render Step
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="NFT Token ID"
                value={nftDetails?.token_id || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Property Address"
                value={propertyDetails?.address || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Owner Name"
                value={propertyDetails?.owner_name || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="District"
                value={propertyDetails?.district || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Province"
                value={propertyDetails?.province || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Land Area"
                value={propertyDetails?.land_area || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Buyer NIC"
                {...register("buyerNIC")}
                error={!!errors.buyerNIC}
                helperText={errors.buyerNIC?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
                {...register("amount")}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FileUpload
                label="Sale Agreement"
                onFilesChange={(f) => onFilesChange(f, "saleAgreement")}
                maxFiles={1}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileUpload
                label="Affidavit"
                onFilesChange={(f) => onFilesChange(f, "affidavit")}
                maxFiles={1}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileUpload
                label="Consent Letters"
                onFilesChange={(f) => onFilesChange(f, "consentLetters")}
                maxFiles={2}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="body1">
              Please verify the buyer NIC, description, amount, and uploaded
              documents are correct. You may be required to visit the land
              registry office for in-person verification.
            </Typography>
          </Box>
        );
      case 3:
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
            <Typography variant="body2">
              Buyer NIC: {watch("buyerNIC")}
            </Typography>
            <Typography variant="body2">
              Description: {watch("description")}
            </Typography>
            <Typography variant="body2">Amount: {watch("amount")}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Documents: {Object.keys(docs).filter((k) => docs[k]).length}{" "}
              attached
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <CitizenLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Transfer Property #{id}
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStep()}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleOpenConfirm}
                  disabled={loading || !isValid}
                >
                  {loading ? "Submitting..." : "Submit Transfer"}
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Transfer</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit this property transfer?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? "Submitting..." : "Confirm & Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </CitizenLayout>
  );
}
