import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Avatar, Chip } from "@mui/material";
import { FaRegHeart, FaHeart, FaComment } from "react-icons/fa6";
import postsData from "../data/posts.json";
import { useNavigate } from "react-router-dom";

const generateRandomName = () => {
  const names = [
    "Foxy",
    "Bear",
    "Red",
    "Violet",
    "Musk",
    "Purple",
    "Birdie",
    "Ant",
    "Panda",
    "Tiger",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const generateRandomAvatar = () => {
  const seed = Math.floor(Math.random() * 10000);
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
};

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(
      postsData.map((post) => ({
        ...post,
        name: post.name || generateRandomName(),
        avatar: post.avatar || generateRandomAvatar(),
        liked: false,
        comments: post.comments || [], 
      }))
    );
  }, []);

  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked,
            }
          : post
      )
    );
  };

  const handlePostClick = (id, comments) => {
    if (comments.length > 0) {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {posts.map((post) => (
        <Box
          key={post.id}
          sx={{
            bgcolor: "#1E1E1E",
            color: "white",
            p: 2,
            borderRadius: "8px",
            cursor: post.comments.length > 0 ? "pointer" : "default",
          }}
          onClick={() => handlePostClick(post.id, post.comments)}
        >
          {/* User Info */}
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Avatar src={post.avatar} alt="User Avatar" />
            <Typography fontWeight="bold">{post.name}</Typography>
          </Box>

          {/* Post Text */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            {post.text}
          </Typography>
          {/* Tags */}
          <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
            {post.tags?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{ bgcolor: "#efefe", color: "white" }}
              />
            ))}
          </Box>

          <Box display="flex" alignItems="center" mt={1.5}>
            {/* Like Button */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); 
                handleLike(post.id);
              }}
              sx={{ color: post.liked ? "#FF1493" : "white" }}
            >
              {post.liked ? <FaHeart /> : <FaRegHeart />}
            </IconButton>
            <Typography sx={{ pr: 2 }} variant="body2">{post.likes}</Typography>

            <IconButton sx={{ color: "white" }}>
              <FaComment />
            </IconButton>
            <Typography variant="body2">{post.comments.length}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Posts;
