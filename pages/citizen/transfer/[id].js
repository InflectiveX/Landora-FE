"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
import { supabase } from "@/lib/supabaseClient";
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

  // Keep track of which frontend-uploaded files we've already asked backend to register
  const registeredFileIdsRef = useRef(new Set());

  const onFilesChange = (files, key) => {
    // FileUpload passes an array of file objects; we store either single object or array
    try {
      console.debug("onFilesChange - key:", key, "files:", files);
    } catch (e) {
      /* ignore */
    }

    // Update local docs state immediately with the file objects from FileUpload
    setDocs((prev) => {
      if (!files) return { ...prev, [key]: null };
      if (files.length > 1) return { ...prev, [key]: files };
      return { ...prev, [key]: files[0] };
    });

    // All uploads are deferred until final submit. onFilesChange only stages files.
  };

  const onSubmit = async (data) => {
    console.log("onSubmit triggered with data:", data); // Debug log
    setLoading(true);
    try {
      // prefer explicit buyerId from the form, fall back to resolved buyerUser.id
      const toUserId = Number(data.buyerId) || Number(buyerUser?.id);
      if (!toUserId) {
        enqueueSnackbar(
          "Buyer ID missing. Please ensure the Buyer NIC resolves to a user.",
          {
            variant: "error",
          }
        );
        setLoading(false);
        return;
      }

      const body = {
        nft_id: parseInt(id),
        property_id: parseInt(propertyDetails?.id),
        to_user_id: parseInt(toUserId),
        description: data.description,
        property_type: "transfer",
        amount: data.amount,
      };
      console.log("Submitting transfer with body:", body); // Debug log

      // helper to convert File -> base64 string for JSON uploads
      const readFileAsBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result;
            if (typeof result === "string") {
              const idx = result.indexOf("base64,");
              const base64 = idx >= 0 ? result.substring(idx + 7) : result;
              resolve(base64);
            } else {
              reject(new Error("Failed to read file as base64"));
            }
          };
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });

      // 1) Upload all staged files to Supabase storage, then register them with backend
      const uploadedDocs = []; // store { key, resp }
      const bucket = "Landora";
      for (const [key, stored] of Object.entries(docs)) {
        if (!stored) continue;

        const items = Array.isArray(stored) ? stored : [stored];
        for (const fileObj of items) {
          try {
            if (!fileObj?.file) {
              console.warn("Skipping non-file object for", key, fileObj);
              continue;
            }

            const file = fileObj.file;
            // build a unique path: transfers/{id}/{timestamp}_{random}_{filename}
            const timestamp = Date.now();
            const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
            const path = `transfers/${id}/${timestamp}_${Math.random()
              .toString(36)
              .substr(2, 6)}_${safeName}`;

            // upload to server-side API which uses the Supabase service role key
            const base64 = await readFileAsBase64(file);
            const contentType = file.type || "application/octet-stream";
            try {
              const uploadResp = await fetch("/api/storage-upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  bucket,
                  path,
                  base64,
                  contentType,
                }),
              });
              const uploadJson = await uploadResp.json();
              if (!uploadResp.ok) {
                console.error("Server upload failed", uploadJson);
                throw new Error(uploadJson.error || "Upload failed");
              }

              const publicUrl = uploadJson.publicUrl || null;

              const docRecord = {
                land_id: Number(id),
                name: file.name || fileObj.original_filename || "",
                doc_type: key,
                url: publicUrl,
                // storage_path: path,
                uploaded_at: new Date().toISOString(),
              };

              console.debug(
                "Registering transfer document metadata for:",
                key,
                docRecord
              );
              // Prefer transfer-specific register endpoint if available
              // Use transfer-specific document endpoint
              const resp = await apiClient.document.registerTransfer(docRecord);
              uploadedDocs.push({ key, resp, publicUrl });
            } catch (err) {
              console.error("Server-side upload failed", err);
              throw err;
            }
          } catch (docErr) {
            console.error("Document upload failed for", key, docErr);
            enqueueSnackbar(`Failed to upload document: ${key}`, {
              variant: "error",
            });
            throw docErr;
          }
        }
      }

      // 2) Register transfer and include uploaded document references when possible
      // Attempt to extract document ids from uploaded responses
      const documentIds = uploadedDocs
        .map((d) => d.resp)
        .map((r) => r?.id || r?.document_id || r?._id || r?.data?.id)
        .filter(Boolean);

      const transferBody = {
        ...body,
      };
      if (uploadedDocs.length > 0) {
        // include both backend doc records and public URLs for convenience
        transferBody.documents = uploadedDocs.map((d) => d.resp);
        transferBody.document_urls = uploadedDocs
          .map((d) => d.publicUrl)
          .filter(Boolean);
        if (documentIds.length > 0) transferBody.document_ids = documentIds;
      }

      console.log("Registering transfer with body:", transferBody);
      const transferResp = await apiClient.transfer.register(transferBody);

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
        // Pass a dynamic folder based on transfer/property id so uploads are grouped in Cloudinary
        const folder = id ? `transfers/${id}` : undefined;
        return <DocumentsStep onFilesChange={onFilesChange} folder={folder} />;
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
                    (activeStep === 0 &&
                      (buyerInvalid || ownerConflict || !isValid)) ||
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
