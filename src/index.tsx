import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";

import App from "./App";

import "styles/index.css";
import "styles/colors.css";

ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ThemeProvider>,
  document.getElementById("root"),
);

serviceWorker.register();
