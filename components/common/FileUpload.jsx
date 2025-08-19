'use client';
import React, { useState, useCallback } from 'react';
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
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Description as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({
  onFilesChange,
  acceptedTypes = {
    'application/pdf': ['.pdf'],
    'image/*': ['.png', '.jpg', '.jpeg'],
  },
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  required = false,
  label = 'Upload Documents',
  description = 'Drag and drop files here, or click to select files',
}) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const newErrors = rejectedFiles.map((file) => {
          if (file.file.size > maxSize) {
            return `${file.file.name}: File size exceeds ${maxSize / 1024 / 1024}MB`;
          }
          return `${file.file.name}: File type not supported`;
        });
        setErrors(newErrors);
      } else {
        setErrors([]);
      }

      // Process accepted files
      const newFiles = acceptedFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        status: 'pending',
        progress: 0,
        ipfsHash: null,
        error: null,
      }));

      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);

      // Simulate upload process
      newFiles.forEach((fileObj) => {
        uploadFile(fileObj);
      });
    },
    [files, maxFiles, maxSize, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxFiles: maxFiles - files.length,
    disabled: uploading || files.length >= maxFiles,
  });

  const uploadFile = async (fileObj) => {
    setUploading(true);
    
    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setUploadProgress((prev) => ({
          ...prev,
          [fileObj.id]: progress,
        }));
        
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.id === fileObj.id ? { ...f, progress } : f
          )
        );
      }

      // Simulate IPFS upload success
      const mockIpfsHash = `Qm${Math.random().toString(36).substr(2, 44)}`;
      
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileObj.id
            ? { ...f, status: 'completed', ipfsHash: mockIpfsHash }
            : f
        )
      );
    } catch (error) {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileObj.id
            ? { ...f, status: 'error', error: error.message }
            : f
        )
      );
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (fileId) => {
    const updatedFiles = files.filter((f) => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <PdfIcon color="error" />;
    if (fileType.includes('image')) return <ImageIcon color="primary" />;
    return <FileIcon />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </Typography>

      {/* Upload Area */}
      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          border: 2,
          borderStyle: 'dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          cursor: files.length >= maxFiles ? 'not-allowed' : 'pointer',
          opacity: files.length >= maxFiles ? 0.5 : 1,
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: files.length >= maxFiles ? 'grey.300' : 'primary.main',
            backgroundColor: files.length >= maxFiles ? 'background.paper' : 'action.hover',
          },
        }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop files here' : description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported formats: PDF, PNG, JPG, JPEG
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Maximum file size: {maxSize / 1024 / 1024}MB
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Maximum files: {maxFiles} ({maxFiles - files.length} remaining)
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

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Upload Errors:</Typography>
          {errors.map((error, index) => (
            <Typography key={index} variant="body2">
              • {error}
            </Typography>
          ))}
        </Alert>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Uploaded Files ({files.length}/{maxFiles})
            </Typography>
            <List dense>
              {files.map((fileObj) => (
                <ListItem key={fileObj.id} divider>
                  <ListItemIcon>
                    {getFileIcon(fileObj.file.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" noWrap>
                          {fileObj.file.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={fileObj.status}
                          color={
                            fileObj.status === 'completed'
                              ? 'success'
                              : fileObj.status === 'error'
                              ? 'error'
                              : 'default'
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
                        {fileObj.ipfsHash && (
                          <Typography variant="caption" display="block" color="success.main">
                            IPFS: {fileObj.ipfsHash.substring(0, 20)}...
                          </Typography>
                        )}
                        {fileObj.error && (
                          <Typography variant="caption" display="block" color="error.main">
                            Error: {fileObj.error}
                          </Typography>
                        )}
                        {fileObj.status === 'pending' && (
                          <LinearProgress
                            variant="determinate"
                            value={fileObj.progress}
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    }
                    primaryTypographyProps={{ component: 'div' }}
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => removeFile(fileObj.id)}
                      disabled={uploading}
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
