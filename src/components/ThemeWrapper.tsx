"use client"; 

import { useTheme } from "@mui/material/styles";
import { ReactNode } from "react";
import Box from "@mui/material/Box";

interface Props {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: Props) {
  const theme = useTheme();

  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      {children}
    </Box>
  );
}
