import "./assets/styles/index.css";
import "semantic-ui-css/semantic.min.css";

import { ConnectedRouter, push } from "react-router-redux";
import store, { history } from "./store";

import { ApolloProvider } from "react-apollo";
import App from "./App";
import React from "react";
import client from "./apollo";
import { render } from "react-dom";

const target = document.querySelector("#root");

render(
  <ApolloProvider store={store} client={client}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </ApolloProvider>,
  target
);
