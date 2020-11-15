import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";

import * as serviceWorker from "./serviceWorker";

import App from "./App";

import "styles/index.css";
import "styles/colors.css";

ReactDOM.render(
  <ChakraProvider>
    <SimpleReactLightbox>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </SimpleReactLightbox>
  </ChakraProvider>,
  document.getElementById("root"),
);

serviceWorker.register(serviceWorker.SWConfig);
