import React from "react";
import { Box, Chip } from "@mui/material";

const availableTags = [
  "all",
  "relationship",
  "career",
  "technology",
  "mentalHealth",
  "life",
  "love",
];

function TagFilter({ selectedTag, setSelectedTag }) {
  return (
    <Box sx={{ display: "flex", overflowX: "auto", position: "fixed", bgcolor: "background.paper", p: 2, width: "100%", zIndex: 1 }}>
      {availableTags.map((tag) => (
        <Chip
        clickable
          key={tag}
          variant={selectedTag === tag ? "contained" : "outlined"}
          color="primary"
          sx={{ textTransform: "capitalize", color: "gray" }}
          onClick={() => setSelectedTag(tag)}
          size="small"
          label={tag === "all" ? "All Posts" : `${tag}`}
        />
      ))}
    </Box>
  );
}

export default TagFilter;
