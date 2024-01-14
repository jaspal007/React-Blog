import React, { useEffect } from "react";
import {useParams } from "react-router-dom";

const UpdatePost = ({ posts, editTitle, setEditTitle, editBody, setEditBody, handleUpdate }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  useEffect(()=>{
    if(post){
        setEditTitle(post.title);
        setEditBody(post.body);
    }
  }, [posts, setEditTitle, setEditBody])
  return (
    <div className="Update-Post">
      {post ? (
        <>
          <h1>Update Post</h1>
          <form
            className="Post-Form"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(post.id);
            }}
          >
            <label htmlFor="Title">Post Title</label>
            <input
              type="text"
              id="Title"
              value={editTitle}
              placeholder="Enter Post Title"
              required
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="Body">Post Body</label>
            <textarea
              type="text"
              id="Body"
              value={editBody}
              placeholder="Enter Post Body"
              required
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <h1>Nothing to display</h1>
      )}
    </div>
  );
};

export default UpdatePost;
