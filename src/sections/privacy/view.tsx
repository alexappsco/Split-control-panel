"use client";

import { useState } from "react";
import Editor from "src/components/Editor";
import { useRouter } from "next/navigation";
import { endpoints } from "src/utils/endpoints";
import { editData } from "src/utils/crud-fetch-api";
import {
  Box,
  Paper,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import type { PrivacyPolicyData } from "./types";

type PrivacyProps = {
  initialData: PrivacyPolicyData;
};

export default function Privacy({ initialData }: PrivacyProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<PrivacyPolicyData>(initialData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload: PrivacyPolicyData = {
      titleAr: formData.titleAr.trim(),
      titleEn: formData.titleEn.trim(),
      contentAr: formData.contentAr.trim(),
      contentEn: formData.contentEn.trim(),
    };

    const response = await editData<unknown, PrivacyPolicyData>(
      endpoints.privacy.put,
      "PUT",
      payload
    );

    setSaving(false);

    if (!response.success) {
      setError(response.error || "فشل حفظ البيانات");
      return;
    }

    setFormData(payload);
    setSuccess("تم حفظ التغييرات بنجاح");
    router.refresh();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "#F5F6F8" }}>
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          p: { xs: 2, md: 3 },
          bgcolor: "#49BEFF1A",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1F2937",
              textAlign: "right",
            }}
          >
     pp     sss  {formData.titleAr || "سياسة الخصوصية"}
          </Typography>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{
              bgcolor: "#2FA7AD",
              "&:hover": { bgcolor: "#26939A" },
              p: 1.8,
              minWidth: 140,
            }}
          >
            {saving ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "حفظ التغييرات"
            )}
          </Button>
        </Box>

        {(error || success) && (
          <Typography
            sx={{
              mt: 2,
              fontSize: 14,
              fontWeight: 600,
              color: error ? "#FF5630" : "#00A76F",
              textAlign: "right",
            }}
          >
            {error || success}
          </Typography>
        )}
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          bgcolor: "#FFF",
        }}
      >
        <Typography
          sx={{
            mb: 2,
            color: "#7B8794",
            fontSize: 14,
            fontWeight: 600,
            textAlign: "right",
          }}
        >
          النص بالعربي
        </Typography>

        <TextField
          fullWidth
          value={formData.titleAr}
          onChange={(e) =>
            setFormData((current) => ({ ...current, titleAr: e.target.value }))
          }
          placeholder="عنوان سياسة الخصوصية بالعربي"
          sx={{ mb: 2 }}
        />

        <Editor
          value={formData.contentAr}
          onChange={(value) =>
            setFormData((current) => ({ ...current, contentAr: value }))
          }
        />
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "#FFF",
        }}
      >
        <Typography
          sx={{
            mb: 2,
            color: "#7B8794",
            fontSize: 14,
            fontWeight: 600,
            textAlign: "right",
          }}
        >
          النص بالإنجليزي
        </Typography>

        <TextField
          fullWidth
          value={formData.titleEn}
          onChange={(e) =>
            setFormData((current) => ({ ...current, titleEn: e.target.value }))
          }
          placeholder="Privacy Policy title in English"
          sx={{ mb: 2 }}
        />

        <Editor
          value={formData.contentEn}
          onChange={(value) =>
            setFormData((current) => ({ ...current, contentEn: value }))
          }
        />
      </Paper>
    </Box>
  );
}
