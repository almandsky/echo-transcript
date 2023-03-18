import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./components/App";
import "./index.css";

render(
  <Router>
    <Route component={App} />
  </Router>,
  document.getElementById("app")
);
