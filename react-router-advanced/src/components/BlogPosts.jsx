import React from "react";
import { useParams } from "react-router-dom";

const BlogPosts = () => {
  const { postId } = useParams();
  return (
    <div>
      <h1>BlogPosts</h1>
      <p>Displaying content for blog post ID: {postId}</p>
    </div>
  );
};

export default BlogPosts;
