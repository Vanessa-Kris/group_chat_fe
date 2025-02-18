import React from "react";
import { Box, Typography, IconButton, Avatar, Chip } from "@mui/material";
import { FaRegHeart, FaHeart, FaComment } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const PostItem = ({ post, onLike, onComment }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    if (post.comments.length > 0) {
      navigate(`/threads/${post.id}`);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#1E1E1E",
        color: "white",
        p: 2,
        mt: 2,
        cursor: post.comments.length > 0 ? "pointer" : "default",
      }}
      onClick={handlePostClick}
    >
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <Avatar src={post.avatar} alt="User Avatar" />
        <Typography fontWeight="bold">{post.name}</Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 1 }}>
        {post.text}
      </Typography>

       <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
        {post.tags?.map((tag, index) => (
          <Chip key={index} label={tag} sx={{ bgcolor: "#efefe", color: "white" }} />
        ))}
      </Box>

      <Box display="flex" alignItems="center" mt={1.5}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
          sx={{ color: post.liked ? "#FF1493" : "white" }}
        >
          {post.liked ? <FaHeart /> : <FaRegHeart />}
        </IconButton>
        <Typography sx={{ pr: 2 }} variant="body2">{post.likes}</Typography>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onComment();
          }}
          sx={{ color: "white" }}
        >
          <FaComment />
        </IconButton>
        <Typography variant="body2">{post.comments.length}</Typography>
      </Box>
    </Box>
  );
};

export default PostItem;
