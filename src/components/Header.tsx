"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Iconify from "src/components/iconify";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsPopover from "src/layouts/common/notifications-popover";
import {
  Box,
  Menu,
  AppBar,
  Avatar,
  Toolbar,
  MenuItem,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [userName, setUserName] = useState("المستخدم");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        const nameVal = parsed.username || parsed.name || parsed.email || parsed.displayName;
        if (nameVal) {
          setUserName(nameVal);
        }
      }
    } catch (ignore) {}
  }, []);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      elevation={0}
      sx={{
        bgcolor: "#38A8AC",
        boxShadow: "none",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component="img"
            src="/logo-Split’t.png"
            alt="Split"
            sx={{ height: 36 }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Iconify icon="emojione:flag-for-saudi-arabia" width={30} />

          <NotificationsPopover />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderLeft: "1px solid rgba(255,255,255,0.3)",
              pl: 2,
              cursor: "pointer",
            }}
            onClick={handleMenuOpen}
          >
            <Avatar src="/3d.png" sx={{ width: 36, height: 36, border: "2px solid #fff", }} />
            <Typography
              variant="body2"
              sx={{ color: "#fff", display: { xs: "none", sm: "block" } }}
            >
              {userName}
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 180,
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            // Clear accessToken cookie
            document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            // Clear user from localStorage
            try {
              localStorage.removeItem("user");
            } catch (ignore) {}
            // Redirect to login page
            router.push("/auth/login");
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>تسجيل الخروج</ListItemText>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
