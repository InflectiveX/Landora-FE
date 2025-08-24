import {
  TextField,
  styled,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
  Chip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { forwardRef, useState } from "react";

// Enhanced TextField with modern styling
const ModernTextField = styled(TextField)(
  ({ theme, variant = "outlined" }) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
      backdropFilter: "blur(10px)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      border: "none",
      "& fieldset": {
        borderColor: alpha(theme.palette.divider, 0.3),
        borderWidth: "2px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      "&:hover": {
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        transform: "translateY(-1px)",
        "& fieldset": {
          borderColor: alpha(theme.palette.primary.main, 0.5),
          boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
      },
      "&.Mui-focused": {
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        transform: "translateY(-2px)",
        "& fieldset": {
          borderColor: theme.palette.primary.main,
          borderWidth: "2px",
          boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
      },
      "&.Mui-error": {
        "& fieldset": {
          borderColor: theme.palette.error.main,
          boxShadow: `0 0 0 1px ${alpha(theme.palette.error.main, 0.1)}`,
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
      fontSize: "0.875rem",
      fontWeight: 500,
      "&.Mui-focused": {
        color: theme.palette.primary.main,
        fontWeight: 600,
      },
      "&.Mui-error": {
        color: theme.palette.error.main,
      },
    },
    "& .MuiFormHelperText-root": {
      marginLeft: theme.spacing(1),
      fontSize: "0.75rem",
      "&.Mui-error": {
        color: theme.palette.error.main,
      },
    },
  })
);

// Password TextField with show/hide functionality
const PasswordField = forwardRef(
  ({ label = "Password", helperText, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <ModernTextField
        ref={ref}
        type={showPassword ? "text" : "password"}
        label={label}
        helperText={helperText}
        error={error}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.04),
                  },
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";

// Enhanced Select with modern styling
const ModernSelect = styled(Select)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha(theme.palette.divider, 0.3),
    borderWidth: "2px",
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
    transform: "translateY(-1px)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: alpha(theme.palette.primary.main, 0.5),
      boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
  },
  "&.Mui-focused": {
    backgroundColor: alpha(theme.palette.background.paper, 0.95),
    transform: "translateY(-2px)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
  },
}));

// Form Control wrapper with consistent styling
const ModernFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    fontWeight: 500,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: theme.spacing(1),
    fontSize: "0.75rem",
  },
}));

// Enhanced Autocomplete with modern styling
const ModernAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: "blur(10px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "& fieldset": {
      borderColor: alpha(theme.palette.divider, 0.3),
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: alpha(theme.palette.primary.main, 0.5),
      boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
  },
  "& .MuiChip-root": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: theme.shape.borderRadius,
    "& .MuiChip-deleteIcon": {
      color: alpha(theme.palette.primary.main, 0.7),
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
}));

// Form Section Header
const FormSectionHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(4),
  "&:first-of-type": {
    marginTop: 0,
  },
  "&::before": {
    content: '""',
    flex: 1,
    height: "1px",
    background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
    marginRight: theme.spacing(2),
  },
  "&::after": {
    content: '""',
    flex: 1,
    height: "1px",
    background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
    marginLeft: theme.spacing(2),
  },
  "& .section-title": {
    fontSize: "1rem",
    fontWeight: 600,
    color: theme.palette.text.primary,
    textAlign: "center",
    padding: theme.spacing(0, 2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
  },
}));

// Search Field with enhanced styling
const SearchField = forwardRef(
  ({ placeholder = "Search...", ...props }, ref) => (
    <ModernTextField
      ref={ref}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "50px",
          paddingLeft: 2,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover, &.Mui-focused": {
            "& fieldset": {
              borderRadius: "50px",
            },
          },
        },
      }}
      {...props}
    />
  )
);

SearchField.displayName = "SearchField";

export {
  ModernTextField as default,
  PasswordField,
  ModernSelect,
  ModernFormControl,
  ModernAutocomplete,
  FormSectionHeader,
  SearchField,
};
