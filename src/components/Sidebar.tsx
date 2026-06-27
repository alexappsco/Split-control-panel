"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  List,
  Drawer,
  Divider,
  useTheme,
  Collapse,
  Typography,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  ListItemButton,
} from "@mui/material";

interface SidebarProps {
  open: boolean;
  onClose?: () => void;
}

interface SidebarIconProps {
  active?: boolean;
  src: string;
}

// تحديث هيكل البيانات لدعم القوائم الفرعية
const items = [
  { label: "الرئيسية", icon: "/icons/main.svg", path: "/" },
  { label: "إدارة المستخدمين", icon: "/icons/manageemploye.svg", path: "/followers" },
  { label: "التقارير", icon: "/icons/reports.svg", path: "/reports" },
  { label: "تواصل معنا", icon: "/icons/contact.svg", path: "/contacus" },
  { 
    label: "المعلومات القانونية", 
    icon: "/icons/information.svg", 
    isParent: true,
    subItems: [
      { label: "سياسة الخصوصية", path: "/privacy" },
    ]
  },
];

function SidebarIcon({ active = false, src }: SidebarIconProps) {
  return (
    <Box
      component="img"
      src={src}
      alt=""
      aria-hidden="true"
      sx={{
        display: "block",
        height: 24,
        opacity: active ? 1 : 0.72,
        width: 24,
      }}
    />
  );
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();
  
  const [legalOpen, setLegalOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === path : pathname.startsWith(path);

  const drawer = (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        p: 2,
        height: "100%",
        bgcolor: "#efedfa",
      }}
    >
      <List disablePadding>
        {items.map((item) => {
          if (item.isParent && item.subItems) {
            return (
              <Box key={item.label}>
                <ListItemButton
                  onClick={() => setLegalOpen(!legalOpen)}
                  sx={{ borderRadius: 2, gap: 1.5, justifyContent: "flex-end", mb: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                    <SidebarIcon active={legalOpen} src={item.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="body2" sx={{ fontWeight: 500, textAlign: "right" }}>{item.label}</Typography>}
                  />
                </ListItemButton>
                <Collapse in={legalOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pr: 4 }}>
                    {item.subItems.map((sub) => (
                      <Link key={sub.label} href={sub.path} style={{ textDecoration: "none" }}>
                        <ListItemButton sx={{ borderRadius: 2, justifyContent: "flex-end", mb: 0.5 }}>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ textAlign: "right", color: isActive(sub.path) ? "primary.main" : "text.secondary" }}>
                                {sub.label}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </Box>
            );
          }

          const itemPath = item.path || "";
          const active = isActive(itemPath);

          return (
            <Link key={item.label} href={itemPath} style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={{ borderRadius: 2, gap: 1.5, justifyContent: "flex-end", mb: 1 }}
                selected={active}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <SidebarIcon active={active} src={item.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: active ? 700 : 500, textAlign: "right" }}>
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      <List disablePadding>
        <ListItemButton sx={{ borderRadius: 2, gap: 1.5, justifyContent: "flex-end" }}>
          <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
            <SidebarIcon active={false} src="/icons/logout.svg" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontWeight: 500, textAlign: "right", color: "error.main" }}>
                تسجيل الخروج
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={mdUp ? true : open}
      onClose={onClose}
      variant={mdUp ? "permanent" : "temporary"}
      ModalProps={{ keepMounted: true }}
      sx={{
        flexShrink: { md: 0 },
        width: { md: 280 },
        "& .MuiDrawer-paper": {
          bgcolor: "#efedfa",
          width: 280,
          boxSizing: "border-box",
          borderLeft: "none",
          top: mdUp ? "64px" : undefined,
          height: mdUp ? "calc(100% - 64px)" : "100%",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
}