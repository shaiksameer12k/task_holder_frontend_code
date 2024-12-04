import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./responsive.css";

import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App/>
      {/* <Layout /> */}
    </React.StrictMode>
  </BrowserRouter>
);
