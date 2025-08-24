"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function PdfViewer() {
  const router = useRouter();
  const { search } =
    typeof window !== "undefined" ? window.location : { search: "" };
  const params = new URLSearchParams(search);
  const urlParam = params.get("url") || router.query.url || null;
  const [url, setUrl] = useState(urlParam);

  useEffect(() => {
    // router.query may populate slightly later on client navigation
    if (!url && router.query?.url) setUrl(router.query.url);
  }, [router.query, url]);

  if (!url) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No document URL provided.</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Provide a URL as the `url` query parameter.
        </Typography>
      </Box>
    );
  }

  // Basic viewer: embed in an iframe so the browser handles rendering.
  // This avoids embedding via object/embed which can trigger the "Failed to load PDF"
  // message in some environments. If embedding still fails, the Download button
  // gives a fallback.
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 1, display: "flex", gap: 1, alignItems: "center" }}>
        <Button
          variant="outlined"
          onClick={() => window.open(url, "_blank", "noopener")}
        >
          Open in new tab
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // force download
            const a = document.createElement("a");
            a.href = url;
            a.download = "";
            document.body.appendChild(a);
            a.click();
            a.remove();
          }}
        >
          Download
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
          If the PDF fails to render below, try "Open in new tab" or Download.
        </Typography>
      </Box>

      <iframe
        title="PDF Viewer"
        src={url}
        style={{ flex: 1, border: 0, width: "100%" }}
      />
    </Box>
  );
}
