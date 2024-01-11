import React from "react";
import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <article className="Post-Page">
      {
        post ?
        <>
          <h1>{post.title}</h1>
          <p>{post.datetime}</p>
          <p>{post.body}</p>
          <button onClick={()=>handleDelete(id)}>
            Delete
          </button>
        </>:
        <>
        <h1>
          404! Post Not Found
        </h1>
        <p>
          <Link to='/'>
            Visit Our HomePage
          </Link>
        </p>
        </>
      }
    </article>
  );
};

export default PostPage;
