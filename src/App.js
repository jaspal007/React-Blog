import About from "./Components/About";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Missing from "./Components/Missing";
import Nav from "./Components/Nav";
import NewPost from "./Components/NewPost";
import PostPage from "./Components/PostPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {
  //hooks
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();
  const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //methods
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("posts")));
    const filteredPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredPosts.reverse());
  }, [posts, search]);

  const handleDelete = (val) => {
    const postList = posts.filter((post) => post.id.toString() !== val);
    setPosts(postList);
    localStorage.setItem("posts", JSON.stringify(postList));
    navigate("/");
  };
  const handleSubmit = () => {
    const newPost = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      title: postTitle,
      datetime: format(new Date(), "MMMM dd, yyyy pp"),
      body: postBody,
    };
    const newPosts = [...posts, newPost];
    setPosts(newPosts);
    setPostTitle("");
    setPostBody("");
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  return (
    <div className="App">
      <Header title={"React JS Blog"} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResult} />} />
        <Route
          path="/post"
          element={
            <NewPost
              postBody={postBody}
              setPostBody={setPostBody}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
