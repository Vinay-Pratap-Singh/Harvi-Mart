import React from "react";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Call make Server
makeServer();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
