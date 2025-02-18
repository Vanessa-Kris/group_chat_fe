import React from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const TopicItem = ({ topic, onLike, onComment }) => {
  const navigate = useNavigate();

  const handleTopicClick = () => {
    if (topic.comments.length > 0) {
      navigate(`/threads/${topic.id}`);
    }
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: topic.color,
          color: "white",
          p: 2,
          pt: 4,
          mt: 2,
          fontWeight: "bold",
          userSelect: "none",
          width: "100%",
        }}
        onClick={handleTopicClick}
      >
        <Typography variant="body1">{topic.name}</Typography>
        <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
          {topic.tags?.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              sx={{ bgcolor: "#efefe", color: "white" }}
            />
          ))}
        </Box>

        <Box display="flex" alignItems="center" mt={1.5}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); 
              onLike();
            }}
            sx={{ color: topic.liked ? "#FF1493" : "white" }}
          >
            {topic.liked ? <FaHeart /> : <FaRegHeart />}
          </IconButton>
          <Typography sx={{ pr: 2 }} variant="body2">
            {topic.likes}
          </Typography>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onComment();
            }}
            sx={{ color: "white" }}
          >
            <FaComment />
          </IconButton>
          <Typography variant="body2">{topic.comments.length}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default TopicItem;
