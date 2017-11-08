import "semantic-ui-css/semantic.min.css";
import "./assets/styles/index.css";

import store, { history } from "./store";

import { ApolloProvider } from "react-apollo";
import App from "./App";
import { ConnectedRouter } from "react-router-redux";
import React from "react";
import ReactDOM from "react-dom";
import client from "./apollo";
import { persistStore } from "redux-persist";
import { render } from "react-dom";

const target = document.querySelector("#root");

export default class AppProvider extends React.Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return <div>Loading...</div>;
    }
    return (
      <ApolloProvider store={store} client={client}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </ApolloProvider>
    );
  }
}

render(<AppProvider />, target);
