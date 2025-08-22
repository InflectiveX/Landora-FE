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
// Step components
import BuyerInfo from "./components/BuyerInfo";
import DocumentsStep from "./components/DocumentsStep";
import VerificationStep from "./components/VerificationStep";
import SummaryStep from "./components/SummaryStep";
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
  // docs will store file objects returned by FileUpload (single object or array)
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
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Keep track of resolved buyer user id and details
  const [buyerUser, setBuyerUser] = useState(null);
  const [buyerLookupLoading, setBuyerLookupLoading] = useState(false);
  const [buyerLookupError, setBuyerLookupError] = useState(null);

  // Watch NIC changes and resolve user (debounced)
  const buyerNIC = watch("buyerNIC");
  useEffect(() => {
    const nic = buyerNIC;
    if (!nic || nic.length < 5) {
      setBuyerUser(null);
      setValue("buyerId", "");
      return;
    }
    let mounted = true;
    const timer = setTimeout(async () => {
      try {
        setBuyerLookupLoading(true);
        setBuyerLookupError(null);
        const user = await apiClient.user.getByNIC(nic);
        if (mounted) {
          setBuyerUser(user || null);
          setValue("buyerId", user?.id || "");
          setBuyerLookupError(user ? null : "Buyer not found");
        }
      } catch (err) {
        console.error("User lookup failed", err);
        if (mounted) {
          setBuyerUser(null);
          setValue("buyerId", "");
          setBuyerLookupError("Lookup failed");
        }
      } finally {
        if (mounted) setBuyerLookupLoading(false);
      }
    }, 500);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [buyerNIC, setValue]);

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
    // FileUpload passes an array of file objects; we store either single object or array
    setDocs((prev) => {
      if (!files) return { ...prev, [key]: null };
      // if multiple allowed, keep the array
      if (files.length > 1) return { ...prev, [key]: files };
      // otherwise store the single file object
      return { ...prev, [key]: files[0] };
    });

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

      // Upload documents: if FileUpload uploaded to Cloudinary it will include secure_url/public_id
      for (const [key, fileObj] of Object.entries(docs)) {
        if (!fileObj) continue;
        // If FileUpload stored the raw file under fileObj.file, and may have secure_url/public_id
        if (fileObj.secure_url || fileObj.public_id) {
          // send metadata to API so backend can persist the document record
          const body = {
            documentType: key,
            transferFor: String(id),
            url: fileObj.secure_url,
            public_id: fileObj.public_id,
            original_filename: fileObj.original_filename || fileObj.file?.name,
          };
          console.log(`Sending document metadata for: ${key}`, body);
          await apiClient.document.register(body);
        } else if (fileObj.file) {
          const fd = new FormData();
          fd.append("file", fileObj.file);
          fd.append("documentType", key);
          fd.append("transferFor", String(id));
          console.log(`Uploading document file for: ${key}`); // Debug log
          await apiClient.document.register(fd);
        }
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
    if (!isValidForm) {
      enqueueSnackbar("Please fill all required fields correctly.", {
        variant: "error",
      });
      return;
    }

    // Ensure required documents are present
    const requiredDocs = ["saleAgreement", "affidavit", "consentLetters"];
    const missing = requiredDocs.filter((k) => {
      const v = docs[k];
      if (!v) return true;
      // if array, must have at least one
      if (Array.isArray(v)) return v.length === 0;
      return false;
    });

    if (missing.length > 0) {
      enqueueSnackbar(
        `Please upload required documents: ${missing.join(", ")}`,
        { variant: "error" }
      );
      return;
    }
    // Ensure buyer info was resolved
    if (!buyerUser) {
      enqueueSnackbar("Buyer not found. Please enter a valid Buyer NIC.", {
        variant: "error",
      });
      return;
    }

    setConfirmOpen(true);
  };

  // Render Step using separate components
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <BuyerInfo
            nftDetails={nftDetails}
            propertyDetails={propertyDetails}
            register={register}
            errors={errors}
            watch={watch}
            buyerUser={buyerUser}
            buyerLookupLoading={buyerLookupLoading}
            buyerLookupError={buyerLookupError}
          />
        );
      case 1:
        return <DocumentsStep onFilesChange={onFilesChange} />;
      case 2:
        return <VerificationStep />;
      case 3:
        return (
          <SummaryStep
            nftDetails={nftDetails}
            propertyDetails={propertyDetails}
            docs={docs}
            watch={watch}
          />
        );
      default:
        return null;
    }
  };

  // Derived validation for step navigation
  const ownerNIC = propertyDetails?.owner_nic;
  const buyerInvalid = !!(buyerLookupError || !buyerUser);
  const ownerConflict =
    buyerNIC && ownerNIC && String(buyerNIC).trim() === String(ownerNIC).trim();

  // Required documents for the transfer step
  const requiredDocs = ["saleAgreement", "affidavit", "consentLetters"];
  const missingDocs = requiredDocs.filter((k) => {
    const v = docs[k];
    if (!v) return true;
    if (Array.isArray(v)) return v.length === 0;
    return false;
  });
  const docsMissing = missingDocs.length > 0;

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
                <Button
                  variant="contained"
                  onClick={handleNext}
                  // For step 0, ensure form fields are valid. For step 1, ensure required documents uploaded.
                  disabled={
                    (activeStep === 0 && (buyerInvalid || ownerConflict || !isValid)) ||
                    (activeStep === 1 && docsMissing)
                  }
                >
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
