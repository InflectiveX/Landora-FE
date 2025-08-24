"use client";
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import PropertyInfo from "./components/PropertyInfo";
import DocumentsStep from "./components/DocumentsStep";
import ReviewStep from "./components/ReviewStep";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { useApi } from "@/lib/api";
import apiClient from "@/lib/api";
import CitizenLayout from "@/components/layouts/CitizenLayout";

const steps = ["Property Information", "Document Upload", "Review & Submit"];

export default function LandRegistration() {
  const { enqueueSnackbar } = useSnackbar();
  const { registerProperty } = useApi();
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const schema = yup.object({
    propertyTitle: yup.string().required("Property title is required"),
    plotNumber: yup.string().required("Plot number is required"),
    address: yup.string().required("Address is required"),
    district: yup.string().required("District is required"),
    province: yup.string().required("Province is required"),
    landArea: yup
      .number()
      .typeError("Enter a number")
      .required("Land area is required"),
    propertyType: yup.string().required("Property type is required"),
    ownerNIC: yup.string().required("Owner NIC is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const requiredDocuments = [
    { id: "titleDeed", name: "Title Deed", required: true },
    { id: "surveyPlan", name: "Survey Plan", required: true },
    {
      id: "ownershipHistory",
      name: "Previous Ownership Records",
      required: false,
    },
    { id: "taxReceipts", name: "Property Tax Receipts", required: false },
  ];

  const handleNext = () => setActiveStep((s) => s + 1);
  const handleBack = () => setActiveStep((s) => s - 1);
  const handleFileUpload = (files, id) => {
    const file = files && files.length > 0 ? files[0].file : null;
    setUploadedFiles((prev) => ({ ...prev, [id]: file }));
    if (file)
      enqueueSnackbar(`${file.name} uploaded successfully`, {
        variant: "success",
      });
  };

  const onSubmit = async (data) => {
    console.log("clicked");
    setLoading(true);
    try {
      const body = {
        address: data.address,
        district: data.district,
        province: data.province,
        land_area: String(data.landArea),
        property_type: data.propertyType,
        survey_number: data.plotNumber,
        currentowner_nic: data.ownerNIC,
      };
      const res = await registerProperty(body);
      const newLandId = res && typeof res === "object" ? res.id : undefined;

      // Register documents as JSON if we have a new land id
      if (newLandId) {
        const keys = Object.keys(uploadedFiles);
        for (const k of keys) {
          const file = uploadedFiles[k];
          if (!file) continue;
          const docPayload = {
            land_id: newLandId,
            name: file.name,
            doc_type: k,
            url: "",
          };
          // Use register-specific document endpoint
          await apiClient.document.registerRegister(docPayload);
        }
      }

      enqueueSnackbar("Registration submitted successfully!", {
        variant: "success",
      });
      setActiveStep(0);
      setUploadedFiles({});
    } catch (e) {
      enqueueSnackbar("Registration failed. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    if (activeStep === 0) {
      return <PropertyInfo register={register} errors={errors} />;
    }
    if (activeStep === 1) {
      return (
        <DocumentsStep
          requiredDocuments={requiredDocuments}
          handleFileUpload={handleFileUpload}
          uploadedFiles={uploadedFiles}
        />
      );
    }
    return (
      <ReviewStep
        requiredDocuments={requiredDocuments}
        uploadedFiles={uploadedFiles}
        watch={watch}
      />
    );
  };

  // render step content via components

  return (
    <CitizenLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Register New Property
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
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
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                {loading ? "Submitting..." : "Submit Registration"}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </CitizenLayout>
  );
}
