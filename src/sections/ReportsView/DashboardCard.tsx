"use client";

import { Box, BoxProps } from "@mui/material";
import { CARD_SX } from "./constants";

type DashboardCardProps = BoxProps & {
  height?: number | string;
};

export default function DashboardCard({
  children,
  height,
  sx,
  ...other
}: DashboardCardProps) {
  return (
    <Box sx={{ ...CARD_SX, height, ...sx }} {...other}>
      {children}
    </Box>
  );
}
