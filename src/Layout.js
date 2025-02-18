import React from "react";
import { Box } from "@mui/material";
import TopNav from "./Components/TopNav";
import BottomNav from "./Components/BottomNav";

const Layout = ({ children }) => {
  return (
    <Box>
      <TopNav />
      <Box sx={{ mt: 8, mb: 10 }}>{children}</Box> 
      <BottomNav/>
    </Box>
  );
};

export default Layout;
