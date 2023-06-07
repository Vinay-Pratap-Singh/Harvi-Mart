import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript />
      <App />
    </Provider>
  </React.StrictMode>
);
