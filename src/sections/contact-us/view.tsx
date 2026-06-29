"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import XIcon from "@mui/icons-material/X";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { endpoints } from "src/utils/endpoints";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import { editData } from "src/utils/crud-fetch-api";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  Box,
  Card,
  Button,
  Popover,
  Divider,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";

import type { ContactUsData } from "./types";

type PlatformConfig = {
  platformName: string;
  title: string;
  color: string;
  icon: React.ReactNode;
};

const SOCIAL_PLATFORM_OPTIONS: PlatformConfig[] = [
  {
    platformName: "WhatsApp",
    title: "WhatsApp",
    color: "#25D366",
    icon: <WhatsAppIcon />,
  },
  {
    platformName: "Facebook",
    title: "Facebook",
    color: "#1877F2",
    icon: <FacebookIcon />,
  },
  {
    platformName: "Telegram",
    title: "Telegram",
    color: "#229ED9",
    icon: <TelegramIcon />,
  },
  {
    platformName: "Instagram",
    title: "Instagram",
    color: "#E4405F",
    icon: <InstagramIcon />,
  },
  {
    platformName: "LinkedIn",
    title: "LinkedIn",
    color: "#0A66C2",
    icon: <LinkedInIcon />,
  },
  {
    platformName: "X",
    title: "X",
    color: "#000000",
    icon: <XIcon />,
  },
];

const FIXED_FIELDS: PlatformConfig[] = [
  {
    platformName: "email",
    title: "email",
    color: "#D50000",
    icon: <EmailIcon />,
  },
  {
    platformName: "phone",
    title: "phone",
    color: "#2F3941",
    icon: <PhoneIcon />,
  },
];

function getPlatformConfig(platformName: string): PlatformConfig {
  const normalized = platformName.toLowerCase();
  const match = SOCIAL_PLATFORM_OPTIONS.find(
    (item) => item.platformName.toLowerCase() === normalized
  );

  if (match) return match;

  return {
    platformName,
    title: platformName,
    color: "#3DA7AE",
    icon: <PhoneIcon />,
  };
}

type ContactUsSectionProps = {
  initialData: ContactUsData;
};

export default function ContactUsSection({ initialData }: ContactUsSectionProps) {
  const t = useTranslations();
  const router = useRouter();
  const [formData, setFormData] = useState<ContactUsData>(initialData);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateSocialLink = (index: number, url: string) => {
    setFormData((current) => ({
      ...current,
      socialMediaLinks: current.socialMediaLinks.map((link, i) =>
        i === index ? { ...link, url } : link
      ),
    }));
  };

  const removeSocialLink = (index: number) => {
    setFormData((current) => ({
      ...current,
      socialMediaLinks: current.socialMediaLinks.filter((_, i) => i !== index),
    }));
  };

  const addSocialPlatform = (platformName: string) => {
    const exists = formData.socialMediaLinks.some(
      (link) => link.platformName.toLowerCase() === platformName.toLowerCase()
    );

    if (exists) return;

    setFormData((current) => ({
      ...current,
      socialMediaLinks: [
        ...current.socialMediaLinks,
        { platformName, url: "" },
      ],
    }));
    handleClose();
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload: ContactUsData = {
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      socialMediaLinks: formData.socialMediaLinks
        .map((link) => ({
          platformName: link.platformName.trim(),
          url: link.url.trim(),
        }))
        .filter((link) => link.platformName && link.url),
    };

    const response = await editData<unknown, ContactUsData>(
      endpoints.contact.put,
      "PUT",
      payload
    );

    setSaving(false);

    if (!response.success) {
      setError(response.error || t("Pages.ContactUs.save_failed"));
      return;
    }

    setFormData(payload);
    setSuccess(t("Pages.ContactUs.save_success"));
    router.refresh();
  };

  const renderFieldRow = (
    icon: React.ReactNode,
    color: string,
    value: string,
    onChange: (value: string) => void,
    placeholder: string,
    onDelete?: () => void
  ) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          bgcolor: color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            bgcolor: "#919EAB33",
          },
        }}
      />

      {onDelete && (
        <IconButton
          onClick={onDelete}
          sx={{ color: "#9CA3AF", flexShrink: 0 }}
          aria-label={t("Pages.ContactUs.delete")}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 22, md: 28 },
            fontWeight: 700,
          }}
        >
          {t("Pages.ContactUs.title")}
        </Typography>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          sx={{
            bgcolor: "#3DA7AE",
            borderRadius: 3,
            px: 3,
            py: 1,
            boxShadow: "none",
            minWidth: 140,
            "&:hover": {
              bgcolor: "#33969C",
              boxShadow: "none",
            },
          }}
        >
          {saving ? <CircularProgress size={22} color="inherit" /> : t("Pages.ContactUs.save_changes")}
        </Button>
      </Box>

      {(error || success) && (
        <Typography
          sx={{
            mb: 2,
            fontSize: 14,
            fontWeight: 600,
            color: error ? "#FF5630" : "#00A76F",
          }}
        >
          {error || success}
        </Typography>
      )}

      <Card
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          border: "1px solid #E5E7EB",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: "#5B7D4A",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {t("Pages.ContactUs.social_media_added")}
          </Typography>

          <IconButton
            onClick={handleOpen}
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#3DA7AE",
              color: "#fff",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#33969C",
              },
            }}
          >
            <AddIcon />
          </IconButton>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                sx: {
                  width: 320,
                  mt: 1,
                  borderRadius: 0,
                  bgcolor: "#F5F5F5",
                  overflow: "hidden",
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.12)",
                },
              },
            }}
          >
            {SOCIAL_PLATFORM_OPTIONS.map((item, index) => {
              const isAdded = formData.socialMediaLinks.some(
                (link) =>
                  link.platformName.toLowerCase() ===
                  item.platformName.toLowerCase()
              );

              return (
                <Box key={item.platformName}>
                  <Box
                    onClick={() => !isAdded && addSocialPlatform(item.platformName)}
                    sx={{
                      px: 2,
                      py: 2.2,
                      cursor: isAdded ? "default" : "pointer",
                      opacity: isAdded ? 0.6 : 1,
                      transition: "0.2s",
                      "&:hover": {
                        bgcolor: isAdded ? "transparent" : "#EEEEEE",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        direction: "ltr",
                      }}
                    >
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: "50%",
                          bgcolor: item.color,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          "& svg": { fontSize: 24 },
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#2E2E2E",
                          lineHeight: 1.2,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>

                    {isAdded && (
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#9E9E9E",
                          mt: 1,
                          ml: "58px",
                          lineHeight: 1.3,
                        }}
                      >
                        {t("Pages.ContactUs.already_added")}
                      </Typography>
                    )}
                  </Box>

                  {index !== SOCIAL_PLATFORM_OPTIONS.length - 1 && (
                    <Divider sx={{ borderColor: "#D9D9D9" }} />
                  )}
                </Box>
              );
            })}
          </Popover>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {renderFieldRow(
            FIXED_FIELDS[0].icon,
            FIXED_FIELDS[0].color,
            formData.email,
            (value) => setFormData((current) => ({ ...current, email: value })),
            "example@gmail.com"
          )}

          {renderFieldRow(
            FIXED_FIELDS[1].icon,
            FIXED_FIELDS[1].color,
            formData.phoneNumber,
            (value) =>
              setFormData((current) => ({ ...current, phoneNumber: value })),
            "+966 22 333 4444"
          )}

          {formData.socialMediaLinks.map((link, index) => {
            const config = getPlatformConfig(link.platformName);

            return (
              <Box key={`${link.platformName}-${index}`}>
                {renderFieldRow(
                  config.icon,
                  config.color,
                  link.url,
                  (value) => updateSocialLink(index, value),
                  t("Pages.ContactUs.link_placeholder", { platform: config.title }),
                  () => removeSocialLink(index)
                )}
              </Box>
            );
          })}
        </Box>
      </Card>
    </Box>
  );
}
