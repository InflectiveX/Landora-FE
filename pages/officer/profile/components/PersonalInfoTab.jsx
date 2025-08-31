import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

export default function PersonalInfoTab({ userInfo, setUserInfo, user }) {
  const { enqueueSnackbar } = useSnackbar();
  const [editMode, setEditMode] = useState(false);
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  const handleSaveProfile = async () => {
    setUserInfo(tempUserInfo);
    setEditMode(false);
    enqueueSnackbar("Profile updated successfully!", { variant: "success" });
  };

  const handleCancel = () => {
    setTempUserInfo(userInfo);
    setEditMode(false);
  };

  const InfoCard = ({ icon, title, children, action }) => (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 2,
          borderColor: "primary.main",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {icon}
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
          </Box>
          {action}
        </Box>
        <Divider sx={{ mb: 2 }} />
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Professional Profile Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "primary.main",
                  fontSize: "2rem",
                  border: 2,
                  borderColor: "primary.light",
                }}
              >
                {userInfo.name.charAt(0)}
              </Avatar>
              {editMode && (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                    width: 28,
                    height: 28,
                  }}
                >
                  <PhotoCameraIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" fontWeight={600} color="text.primary" gutterBottom>
              {userInfo.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              {userInfo.position}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {userInfo.department}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Chip
                label={`ID: ${userInfo.employeeId}`}
                variant="outlined"
                sx={{
                  fontWeight: 600,
                }}
              />
              <Chip
                label="Active Officer"
                color="success"
                sx={{
                  fontWeight: 600,
                }}
              />
            </Stack>
          </Grid>
          <Grid item>
            <Button
              variant={editMode ? "outlined" : "contained"}
              startIcon={editMode ? <CancelIcon /> : <EditIcon />}
              onClick={() => (editMode ? handleCancel() : setEditMode(true))}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Personal Details */}
        <Grid item xs={12} md={8}>
          <InfoCard
            icon={<PersonIcon color="primary" />}
            title="Personal Details"
            action={
              editMode && (
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveProfile}
                  size="small"
                >
                  Save Changes
                </Button>
              )
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={editMode ? tempUserInfo.name : userInfo.name}
                  disabled={!editMode}
                  onChange={(e) =>
                    setTempUserInfo({ ...tempUserInfo, name: e.target.value })
                  }
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="NIC Number"
                  value={editMode ? tempUserInfo.nicNumber : userInfo.nicNumber}
                  disabled={!editMode}
                  onChange={(e) =>
                    setTempUserInfo({
                      ...tempUserInfo,
                      nicNumber: e.target.value,
                    })
                  }
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <BadgeIcon sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </InfoCard>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <InfoCard icon={<BadgeIcon color="primary" />} title="Quick Info">
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <EmailIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {userInfo.email}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PhoneIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {userInfo.phone}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </InfoCard>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<EmailIcon color="primary" />}
            title="Contact Information"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={editMode ? tempUserInfo.email : userInfo.email}
                  disabled={!editMode}
                  onChange={(e) =>
                    setTempUserInfo({ ...tempUserInfo, email: e.target.value })
                  }
                  variant="outlined"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={editMode ? tempUserInfo.phone : userInfo.phone}
                  disabled={!editMode}
                  onChange={(e) =>
                    setTempUserInfo({ ...tempUserInfo, phone: e.target.value })
                  }
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </InfoCard>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={<HomeIcon color="primary" />}
            title="Address Information"
          >
            <TextField
              fullWidth
              label="Residential Address"
              value={editMode ? tempUserInfo.address : userInfo.address}
              disabled={!editMode}
              multiline
              rows={4}
              onChange={(e) =>
                setTempUserInfo({
                  ...tempUserInfo,
                  address: e.target.value,
                })
              }
              variant="outlined"
            />
          </InfoCard>
        </Grid>
      </Grid>
    </Box>
  );
}
