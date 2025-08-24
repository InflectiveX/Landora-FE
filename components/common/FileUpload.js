"use client";
import React, { useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Alert,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Description as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

const FileUpload = ({
  onFilesChange,
  acceptedTypes = {
    "application/pdf": [".pdf"],
    "image/*": [".png", ".jpg", ".jpeg"],
  },
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  required = false,
  label = "Upload Documents",
  description = "Drag and drop files here, or click to select files",
  folder, // Cloudinary folder
}) => {
  const [files, setFiles] = useState([]);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      // Handle errors
      if (rejectedFiles.length > 0) {
        const newErrors = rejectedFiles.map((file) => {
          if (file.file.size > maxSize) {
            return `${file.file.name}: File size exceeds ${
              maxSize / 1024 / 1024
            }MB`;
          }
          return `${file.file.name}: File type not supported`;
        });
        setErrors(newErrors);
      } else {
        setErrors([]);
      }

      // Map accepted files and stage locally only. Do NOT auto-upload to any remote.
      const newFiles = acceptedFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        status: "staged", // staged until final submit
        progress: 0,
        // these fields are reserved for later when uploaded to storage
        url: null,
        public_id: null,
        original_filename: file.name,
        storage_key: null,
        error: null,
      }));

      // Add to state safely and notify parent with staged file objects
      setFiles((prev) => {
        const updated = [...prev, ...newFiles].slice(0, maxFiles);
        // send a simplified array to parent: either single or array depending on use
        onFilesChange?.(updated);
        return updated;
      });
    },
    [maxFiles, maxSize, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxFiles: maxFiles - files.length,
    disabled: uploadingCount > 0 || files.length >= maxFiles,
  });

  // All uploads are now deferred until form submission. This component only
  // stages files locally and notifies the parent via onFilesChange with the
  // staged file objects. Uploading to Supabase storage will be handled by the
  // submit handler in the transfer page.

  const removeFile = (fileId) => {
    setFiles((prev) => {
      const updated = prev.filter((f) => f.id !== fileId);
      onFilesChange?.(updated);
      return updated;
    });
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) return <PdfIcon color="error" />;
    if (fileType.includes("image")) return <ImageIcon color="primary" />;
    return <FileIcon />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckIcon color="success" />;
      case "error":
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>

      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          border: 2,
          borderStyle: "dashed",
          borderColor: isDragActive ? "primary.main" : "grey.300",
          backgroundColor: isDragActive ? "action.hover" : "background.paper",
          cursor: files.length >= maxFiles ? "not-allowed" : "pointer",
        }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <UploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? "Drop files here" : description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported formats: PDF, PNG, JPG, JPEG
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Max size: {maxSize / 1024 / 1024}MB
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Max files: {maxFiles} ({maxFiles - files.length} remaining)
          </Typography>
          {!isDragActive && (
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              disabled={files.length >= maxFiles}
            >
              Click to Select Files
            </Button>
          )}
        </Box>
      </Paper>

      {errors.length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errors.map((e, i) => (
            <Typography key={i} variant="body2">
              • {e}
            </Typography>
          ))}
        </Alert>
      )}

      {files.length > 0 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Uploaded Files ({files.length}/{maxFiles})
            </Typography>
            <List dense>
              {files.map((fileObj) => (
                <ListItem key={fileObj.id} divider>
                  <ListItemIcon>{getFileIcon(fileObj.file.type)}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2" noWrap>
                          {fileObj.original_filename || fileObj.file.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={fileObj.status}
                          color={
                            fileObj.status === "completed"
                              ? "success"
                              : fileObj.status === "error"
                              ? "error"
                              : "default"
                          }
                        />
                        {getStatusIcon(fileObj.status)}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Size: {(fileObj.file.size / 1024).toFixed(1)} KB
                        </Typography>
                        {fileObj.secure_url && (
                          <Typography
                            variant="caption"
                            display="block"
                            color="primary.main"
                            sx={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              window.open(fileObj.secure_url, "_blank")
                            }
                          >
                            View File
                          </Typography>
                        )}
                        {fileObj.ipfsHash && (
                          <Typography
                            variant="caption"
                            display="block"
                            color="success.main"
                          >
                            IPFS: {fileObj.ipfsHash.substring(0, 20)}...
                          </Typography>
                        )}
                        {fileObj.error && (
                          <Typography
                            variant="caption"
                            display="block"
                            color="error.main"
                          >
                            Error: {fileObj.error}
                          </Typography>
                        )}
                        {fileObj.status === "pending" && (
                          <LinearProgress
                            variant="determinate"
                            value={fileObj.progress}
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    }
                    primaryTypographyProps={{ component: "div" }}
                    secondaryTypographyProps={{ component: "div" }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => removeFile(fileObj.id)}
                      disabled={uploadingCount > 0}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default FileUpload;
