import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Call make Server
makeServer();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <App />
);
