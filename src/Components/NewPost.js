import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Button,
  Slide,
  Box,
  Typography,
} from "@mui/material";
import { FaImage, FaPaperPlane, FaX } from "react-icons/fa6";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const tagMapping = {
  relationship: ["love", "breakup", "dating", "relationship", "crush", "boyfriend", "girlfriend"],
  career: ["job", "work", "promotion", "boss", "career", "coworkers"],
  life: ["goal", "achievement", "won", "success"],
  technology: ["computer", "AI", "tech", "programming", "coding"],
  mentalHealth: ["stress", "anxiety", "therapy", "depression", "mental health", "sad"]
};


function NewPost({ open, handleClose, addPost }) {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const detectTags = (postText) => {
    let detectedTags = [];

    Object.entries(tagMapping).forEach(([tag, keywords]) => {
      if (keywords.some((keyword) => postText.toLowerCase().includes(keyword))) {
        detectedTags.push(tag);
      }
    });

    return detectedTags.length > 0 ? detectedTags : ["general"]; 
  };


  const handlePost = () => {
    if (postText.trim() === "" && !image) return;

    const newPost = {
      id: Date.now(),
      text: postText,
      image: image,
      likes: 0,
      comments: 0,
      liked: false,
      tags: detectTags(postText)
    };

    if (addPost) {
      addPost(newPost);
    }

    setPostText("");
    setImage(null);
    handleClose();
  };

  return (
    <Dialog TransitionComponent={Transition} fullScreen open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <FaX />
        </IconButton>
        <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
          New Post
        </Typography>
        <Typography variant="body1"></Typography>
      </DialogTitle>

      <DialogContent sx={{ flexGrow: 1 }}>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Write something..."
          variant="outlined"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          sx={{ mb: 2 }}
        />

        {image && (
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img src={image} alt="Uploaded" style={{ maxWidth: "100%", borderRadius: 8 }} />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "space-between", paddingBottom: 2 }}>
        <input type="file" accept="image/*" id="image-upload" style={{ display: "none" }} onChange={handleImageUpload} />
        <label htmlFor="image-upload">
          <IconButton component="span">
            <FaImage size="25px" />
          </IconButton>
        </label>

        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 7, px: 3, textTransform: "none" }}
          endIcon={<FaPaperPlane />}
          onClick={handlePost}
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewPost;
