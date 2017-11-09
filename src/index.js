import "semantic-ui-css/semantic.min.css";
import "./assets/styles/index.css";

import store, { history } from "./store";

import { ApolloProvider } from "react-apollo";
import App from "./App";
import { ConnectedRouter } from "react-router-redux";
import React from "react";
import ReactDOM from "react-dom";
import client from "./apollo";
import { render } from "react-dom";

const target = document.querySelector("#root");

render(
  <ApolloProvider store={store} client={client}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </ApolloProvider>,
  target
);
