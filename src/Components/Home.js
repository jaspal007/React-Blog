import React from "react";
import Feed from "./Feed";
const Home = ({ posts }) => {
  // const data = JSON.parse(posts);
  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <h1>Nothing to display</h1>
      )}
    </main>
  );
};

export default Home;
