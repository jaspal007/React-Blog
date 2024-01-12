import React from "react";

const NewPost = ({
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  handleSubmit,
}) => {
  return (
    <main className="New-Post">
      <h1>NewPost</h1>
      <form
        className="Post-Form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="Title">Post Title</label>
        <input
          type="text"
          id="Title"
          value={postTitle}
          placeholder="Enter Post Title"
          required
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="Body">Post Body</label>
        <textarea
          type="text"
          id="Body"
          value={postBody}
          placeholder="Enter Post Body"
          required
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
