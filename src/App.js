import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import About from "./containers/About";
import Authentification from "./containers/Authentification";
import Collection from "./containers/Collection";
import Dashboard from "./containers/Dashboard";
import HeaderNavBar from "./containers/HeaderNavBar";
import Home from "./containers/Home";
import Login from "./containers/auth/Login";
import Media from "./containers/Media";
import NotFound from "./components/NotFound";
import Plante from "./containers/Plante";
import PrivateCollection from "./containers/PrivateCollection";
import { Provider } from "rebass-emotion";
import React from "react";
import Search from "./containers/Search";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  // const { authStatus } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/authentification",
              state: { from: props.location }
            }}
          />
        )}
    />
  );
};

class App extends React.Component {
  render() {
    return (
      <Provider
        theme={{
          font:
            '"Proxima Nova", "Brandon Grotesque", "Brandon Text", Helvetica, sans-serif',
          fontSizes: [12, 16, 24, 36, 48, 72, 142, 200]
        }}
      >
        <div className="App">
          <HeaderNavBar bgc="rgba(2, 185, 147, 0.90)" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/authentification" component={Authentification} />
            <Route path="/about-us" component={About} />
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
              isAuthenticated={this.props.isAuthenticated}
            />
            <Route path="/plante/:slug" component={Plante} />
            <Route path="/collection/:slug" component={Collection} />
            <PrivateRoute
              path="/c/:uuid"
              component={PrivateCollection}
              isAuthenticated={this.props.isAuthenticated}
            />
            <Route path="/m/:uuid" component={Media} />
            <Route path="/recherche" component={Search} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Provider>
    );
  }
}
export default withRouter(connect(mapStateToProps, null)(App));
