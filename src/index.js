import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter as Router,
  RouterProvider as Provider,
} from "react-router-dom";

const router = Router([
  {
    path: "*",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider router={router}/>
  </React.StrictMode>
);
