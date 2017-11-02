import { Link, Redirect, Route, Switch, withRouter } from "react-router-dom";

import About from "./containers/About";
import Authentification from "./containers/Authentification";
import Collection from "./containers/Collection";
import Dashboard from "./containers/Dashboard";
import HeaderBar from "./components/HeaderBar";
import Home from "./containers/Home";
import Login from "./containers/auth/Login";
import Media from "./containers/Media";
import NotFound from "./components/NotFound";
import Plante from "./containers/Plante";
import PrivateCollection from "./containers/PrivateCollection";
import React from "react";
import Search from "./containers/Search";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const { authStatus } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )}
    />
  );
};

const Protected = () => <h1>Protected</h1>;

const Links = () => (
  <nav style={{ margin: 10 }}>
    <Link to="/" style={{ margin: 10 }}>
      Home
    </Link>
    <Link to="/dashboard" style={{ margin: 10 }}>
      Dashboard
    </Link>
    <Link to="/about-us" style={{ margin: 10 }}>
      About Us
    </Link>
    <Link to="/login" style={{ margin: 10 }}>
      Login
    </Link>
    <Link to={{ pathname: "/recherche", search: "q=Poncirus trofoliata" }}>
      Recherche "P. trifoliata"
    </Link>
  </nav>
);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Links />
        <Switch>
          {/* <Redirect from="/" to="/dashboard" /> */}
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
    );
  }
}
export default withRouter(connect(mapStateToProps, null)(App));
