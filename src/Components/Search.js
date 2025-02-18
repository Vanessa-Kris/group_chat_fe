import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { FaArrowLeft, FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import postsData from "../data/posts.json"; 

function Search() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (query.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = postsData.filter((post) =>
        post.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    }
  };

  return (
    <Box sx={{ p: 2, bgcolor: "background.default", height: "100vh" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </IconButton>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search posts..."
          value={searchText}
          onChange={handleSearch}
          autoFocus
          InputProps={{
            startAdornment: <FaMagnifyingGlass style={{ marginRight: 8, borderRadius: 20 }} />,
          }}
        />
      </Box>

      {filteredResults.length > 0 ? (
        <List>
          {filteredResults.map((post) => (
            <ListItem key={post.id} button>
              <ListItemText primary={post.posts} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="gray" textAlign="center">
          No results found
        </Typography>
      )}
    </Box>
  );
}

export default Search;
