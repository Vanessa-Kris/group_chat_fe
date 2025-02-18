import React, { useEffect, useState } from "react";
import ComposeButton from "../Components/ComposeButton";
import { getMixedTopicsAndPosts } from "../Components/Mixed";
import TopicItem from "../Components/TopicItem";
import PostItem from "../Components/PostItem";
import NewPost from "../Components/NewPost";
import TagFilter from "../Components/TagFilter";

function Home() {
  const [mixedContent, setMixedContent] = useState([]);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("all");
  useEffect(() => {
    setMixedContent(getMixedTopicsAndPosts());
  }, []);

  const handleLike = (index) => {
    setMixedContent((prevContent) =>
      prevContent.map((item, i) =>
        i === index
          ? {
              ...item,
              likes: item.liked ? item.likes - 1 : item.likes + 1,
              liked: !item.liked,
            }
          : item
      )
    );
  };

  const handleComment = (index) => {
    setMixedContent((prevContent) =>
      prevContent.map((item, i) =>
        i === index
          ? { ...item, comments: [...item.comments, "New Comment"] }
          : item
      )
    );
  };

  const addPost = (newPost) => {
    console.log("Adding Post to State:", newPost);
    setMixedContent((prevContent) => [newPost, ...prevContent]);
  };

  const filteredContent =
  selectedTag === "all"
    ? mixedContent
    : mixedContent.filter((item) => item.tags?.includes(selectedTag));

  return (
    <>
      <TagFilter selectedTag={selectedTag} setSelectedTag={setSelectedTag} /> 
      {filteredContent.map((item, index) =>
        item.type === "topic" ? (
          <TopicItem
            key={`topic-${index}`}
            topic={item}
            onLike={() => handleLike(index)}
            onComment={() => handleComment(index)}
          />
        ) : (
          <PostItem
            key={`post-${index}`}
            post={item}
            onLike={() => handleLike(index)}
            onComment={() => handleComment(index)}
          />
        )
      )}
      <ComposeButton addPost={addPost} />

      <NewPost
        open={newPostOpen}
        handleClose={() => setNewPostOpen(false)}
        addPost={addPost}
      />
    </>
  );
}

export default Home;
