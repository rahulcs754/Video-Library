import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import AllProvider from "./Provider";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AllProvider>
        <App />
      </AllProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
