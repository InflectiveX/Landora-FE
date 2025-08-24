import React from "react";
import { Card, CardContent, Typography, Divider, List } from "@mui/material";
import DocumentItem from "./DocumentItem";

export default function DocumentsList({ title, documents = [], onOpen }) {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}
        >
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List dense>
          {documents.map((d, i) => (
            <DocumentItem key={i} d={d} onOpen={onOpen} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
