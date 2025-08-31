import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Filters({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  activeTab,
  setActiveTab,
}) {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          placeholder={
            activeTab === "officers"
              ? "Search officers..."
              : "Search citizens..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />
      </Grid>
      <Grid xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
