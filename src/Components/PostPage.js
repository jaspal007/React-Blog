import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <article className="Post-Page">
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.datetime}</p>
          <p>{post.body}</p>
          <main>
            <Link to={`/edit/${post.id}`}>
              <button style={{ backgroundColor: "grey" }}>Edit</button>
            </Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </main>
          <p style={{ position: "fixed", bottom: "3em", right: "0" }}>
            <i>{post.edited ? "Edited" : null}</i>
          </p>
        </>
      ) : (
        <>
          <h1>404! Post Not Found</h1>
          <p>
            <Link to="/">Visit Our HomePage</Link>
          </p>
        </>
      )}
    </article>
  );
};

export default PostPage;
