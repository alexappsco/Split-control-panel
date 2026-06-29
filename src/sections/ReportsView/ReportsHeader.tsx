"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import Iconify from "src/components/iconify";
import {
  CATEGORY_FILTER_OPTIONS,
  DATE_FILTER_OPTIONS,
} from "./constants";

const selectSx = {
  height: 42,
  minWidth: 140,
  borderRadius: "10px",
  bgcolor: "#FFFFFF",
  fontSize: 14,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E5E7EB",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#D1D5DB",
  },
};

export default function ReportsHeader() {
  const t = useTranslations();
  const [dateFilter, setDateFilter] = useState<string>(DATE_FILTER_OPTIONS[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>(
    CATEGORY_FILTER_OPTIONS[0]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "flex-start", lg: "center" },
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 28, md: 34 },
          fontWeight: 700,
          color: "#111827",
          flexShrink: 0,
        }}
      >
        {t("Pages.Reports.title")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1.5,
          width: { xs: "100%", lg: "auto" },
        }}
      >
        <Select
          value={dateFilter}
          onChange={(e: SelectChangeEvent) => setDateFilter(e.target.value)}
          size="small"
          sx={selectSx}
        >
          {DATE_FILTER_OPTIONS.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {t(`Pages.Reports.filters.${opt}`)}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={categoryFilter}
          onChange={(e: SelectChangeEvent) =>
            setCategoryFilter(e.target.value)
          }
          size="small"
          sx={{ ...selectSx, minWidth: 160 }}
        >
          {CATEGORY_FILTER_OPTIONS.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {t(`Pages.Reports.filters.${opt}`)}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="outlined"
          startIcon={<Iconify icon="solar:file-download-bold" width={18} />}
          sx={{
            height: 42,
            borderRadius: "10px",
            borderColor: "#E5E7EB",
            color: "#374151",
            fontWeight: 600,
            fontSize: 14,
            px: 2,
            "&:hover": { borderColor: "#D1D5DB", bgcolor: "#F9FAFB" },
          }}
        >
          {t("Pages.Reports.export_pdf")}
        </Button>

        <Button
          variant="outlined"
          startIcon={<Iconify icon="solar:document-bold" width={18} />}
          sx={{
            height: 42,
            borderRadius: "10px",
            borderColor: "#E5E7EB",
            color: "#374151",
            fontWeight: 600,
            fontSize: 14,
            px: 2,
            "&:hover": { borderColor: "#D1D5DB", bgcolor: "#F9FAFB" },
          }}
        >
          {t("Pages.Reports.export_excel")}
        </Button>
      </Box>
    </Box>
  );
}
