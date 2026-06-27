"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { UserType, SpaceType } from "src/types/employee copy";

type UserDetailViewProps = {
  user: UserType;
  spaces: { totalCount: number; items: SpaceType[] };
};

export default function UserDetailView({ user, spaces }: UserDetailViewProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">User Details</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>Name: {user?.name}</Typography>
        <Typography>Email: {user?.email}</Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Spaces ({spaces?.totalCount})</Typography>
        {/* Render spaces here */}
      </Box>
    </Box>
  );
}
