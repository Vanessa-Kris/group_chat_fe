import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import threadsData from "../data/posts.json";

const Reply = ({ reply, handleLike }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mt: 2, ml: 4 }}>
    <Avatar src={reply.avatar} alt={reply.name} />
    <Box sx={{ bgcolor: "#2c2c3a", p: 2, borderRadius: 2, width: "100%" }}>
      <Typography fontWeight="bold">{reply.name}</Typography>
      <Typography variant="body2">
        {reply.text || "No content available"}
      </Typography>
      <Box display="flex" alignItems="center" gap={1} mt={1}>
        <IconButton
          onClick={() => handleLike(reply.id, "reply")}
          sx={{ color: reply.liked ? "#FF1493" : "white" }}
        >
          {reply.liked ? <FaHeart /> : <FaRegHeart />}
        </IconButton>
        <Typography variant="body2">{reply.likes}</Typography>
      </Box>
      {reply.replies?.map((subReply) => (
        <Reply key={subReply.id} reply={subReply} handleLike={handleLike} />
      ))}
    </Box>
  </Box>
);

function Threads() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const selectedPost = threadsData.find((p) => p.id === parseInt(id));
    if (selectedPost) {
      setPost({
        ...selectedPost,
        comments:
          selectedPost.comments?.map((comment) => ({
            ...comment,
            replies: comment.replies || [],
          })) || [],
      });
    }
  }, [id]);

  const handleLike = (commentId, type = "comment") => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: prevPost.comments.map((comment) =>
        comment.id === commentId && type === "comment"
          ? { ...comment, likes: comment.likes + 1 }
          : {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === commentId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              ),
            }
      ),
    }));
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, color: "white" }}>
      <Box sx={{ bgcolor: "#1E1E1E", p: 3, borderRadius: 2 }}>
        <Typography>{post.text || "No content available"}</Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <IconButton
            onClick={() => handleLike(post.id, "post")}
            sx={{ color: "white" }}
          >
            <FaRegHeart />
          </IconButton>
          <Typography>{post.likes}</Typography>
        </Box>
      </Box>

      <Box mt={3}>
        {post.comments.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              mt: 2,
              mx: 2,
            }}
          >
            <Avatar src={comment.avatar} alt={comment.name} />
            <Box sx={{width: "100%" }}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: "#2c2c3a" }}>
                <Typography fontWeight="bold">{comment.name}</Typography>
                <Typography variant="body2">
                  {comment.text || "No content available"}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <IconButton
                    onClick={() => handleLike(comment.id, "comment")}
                    sx={{ color: comment.liked ? "#FF1493" : "white" }}
                  >
                    {comment.liked ? <FaHeart /> : <FaRegHeart />}
                  </IconButton>
                  <Typography variant="body2">{comment.likes}</Typography>
                </Box>
              </Box>
              {comment.replies.map((reply) => (
                <Reply key={reply.id} reply={reply} handleLike={handleLike} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Threads;
