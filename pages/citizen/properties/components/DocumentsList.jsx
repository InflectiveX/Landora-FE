import React from "react";
import { Typography, List, Box, alpha, useTheme } from "@mui/material";
import { Description as DescriptionIcon } from "@mui/icons-material";
import ModernCard, { ModernCardContent } from "@/components/ui/ModernCard";
import DocumentItem from "./DocumentItem";

export default function DocumentsList({ title, documents = [], onOpen }) {
  const theme = useTheme();

  return (
    <ModernCard variant="glass">
      <ModernCardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <DescriptionIcon
            sx={{ mr: 2, color: "primary.main", fontSize: 28 }}
          />
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>

        {documents.length > 0 ? (
          <List sx={{ py: 0 }}>
            {documents.map((d, i) => (
              <DocumentItem key={i} d={d} onOpen={onOpen} />
            ))}
          </List>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
              bgcolor: alpha(theme.palette.background.paper, 0.3),
              borderRadius: 2,
              border: `1px dashed ${alpha(theme.palette.divider, 0.3)}`,
            }}
          >
            <DescriptionIcon
              sx={{
                fontSize: 48,
                color: alpha(theme.palette.text.secondary, 0.5),
                mb: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              No documents found
            </Typography>
          </Box>
        )}
      </ModernCardContent>
    </ModernCard>
  );
}
