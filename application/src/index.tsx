import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import "reset-css";

import MainPage from "pages/MainPage/MainPage";
import * as serviceWorker from "./serviceWorker";

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: "http://localhost:3005/graphql",
});
const client = new ApolloClient({ link, cache });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <MainPage />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
