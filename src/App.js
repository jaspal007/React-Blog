import About from "./Components/About";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Missing from "./Components/Missing";
import Nav from "./Components/Nav";
import NewPost from "./Components/NewPost";
import PostPage from "./Components/PostPage";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import UpdatePost from "./Components/UpdatePost";
import { toHaveAccessibleErrorMessage } from "@testing-library/jest-dom/dist/matchers";

function App() {
  //hooks
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
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
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts((response.data).sort((a, b)=>{
          return new Date(a.datetime) - new Date(b.datetime);
        }));
        localStorage.setItem("posts", response.data);
      } catch (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredPosts.reverse());
  }, [posts, search]);

  const handleDelete = async (val) => {
    try {
      await api.delete(`/posts/${val}`);
      const postList = posts.filter((post) => post.id !== val);
      setPosts(postList);
      localStorage.setItem("posts", JSON.stringify(postList));
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleSubmit = async () => {
    const newPost = {
      id: posts.length
        ? (1 + parseInt(posts[posts.length - 1].id)).toString()
        : "1",
      title: postTitle,
      datetime: format(new Date(), "MMMM dd, yyyy pp"),
      body: postBody,
      edited: false,
    };
    try {
      const response = await api.post("/posts", newPost);
      console.log(response.data);
      const newPosts = [...posts, response.data];
      setPosts(newPosts);
      setPostTitle("");
      setPostBody("");
      localStorage.setItem("posts", JSON.stringify(newPosts));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUpdate = async (id) => {
    const date = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime: date,
      body: editBody,
      edited: true
    };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      const postList = posts.map(post=>post.id === id?{...response.data}:post);
      setPosts(postList.sort((a, b)=>{
        return new Date(a.datetime) - new Date(b.datetime);
      }));
      localStorage.setItem('posts', JSON.stringify(postList));
      setEditTitle('');
      setEditBody('');
      navigate(`/post/${id}`);
    } catch (err) {
      console.log(err.message);
    }
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
        <Route
          path="/edit/:id"
          element={
            <UpdatePost
              posts={posts}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              handleUpdate={handleUpdate}
            />
          }
        />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
