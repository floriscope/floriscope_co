import "./assets/styles/index.css";
import "semantic-ui-css/semantic.min.css";

import { ConnectedRouter, push } from "react-router-redux";
import store, { history } from "./store";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import { render } from "react-dom";

const target = document.querySelector("#root");

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
