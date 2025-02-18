import { Box, Fab } from "@mui/material";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";
import NewPost from "./NewPost";

function ComposeButton() {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Fab
        variant="extended"
        color="primary"
        aria-label="edit"
        sx={{ position: "fixed", bottom: 80, right: 16 }}
        onClick={() => setOpen(!open)}
      >
        <FaPen />
      </Fab>
      <NewPost open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
}

export default ComposeButton;
