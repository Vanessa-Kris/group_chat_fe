import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import topicsData from "../data/topics.json";
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const getRandomColor = () => {
  const colors = [
    "#1B4079",
    "#3A2E39",
    "#1E555C",
    "#7209B7",
    "#4A314D",
    "#035E7B",
    "#001C55", //This
    "#002E2C",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

function Topics() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTopics(
      topicsData.map((topic) => ({
        ...topic,
        color: getRandomColor(),
        liked: false,
      }))
    );
  }, []);

  const handleLike = (index) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, i) =>
        i === index
          ? {
              ...topic,
              likes: topic.liked ? topic.likes - 1 : topic.likes + 1,
              liked: !topic.liked,
            }
          : topic
      )
    );
  };

  const handleTopicClick = (id, comments) => {
    if (comments.length > 0) {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
      {topics.map((topic) => (
        <>
          <Box
            key={topic.id}
            sx={{
              bgcolor: topic.color, 
              color: "white",
              p: 2,
              pt: 4,
              mt: 2,
              fontWeight: "bold",
              cursor: "pointer",
              userSelect: "none",
              width: "100%",
            }}
            onClick={() => handleTopicClick(topic.id, topic.comments)}
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
            <Box display="flex" mt={1.5}>
              {/* Like Button */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(topic.id);
                }}
                sx={{ color: topic.liked ? "#FF1493" : "white" }}
              >
                {topic.liked ? <FaHeart /> : <FaRegHeart />}
              </IconButton>
              <Typography sx={{ pt: 1, pr: 2 }} variant="body2">
                {topic.likes}
              </Typography>

              <IconButton
                sx={{ color: "white" }}
              >
                <FaComment />
              </IconButton>
              <Typography sx={{ pt: 1}}  variant="body2">{topic.comments.length}</Typography>
            </Box>
          </Box>
        </>
      ))}
    </Box>
  );
}

export default Topics;
