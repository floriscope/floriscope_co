import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import About from "./containers/About";
import Admin from "./containers/Admin";
import AdminCollections from "./containers/admin/AdminCollections";
import AdminImages from "./containers/admin/AdminImages";
import AdminTaxonomy from "./containers/admin/AdminTaxonomy";
import Authentification from "./containers/Authentification";
import Collection from "./containers/Collection";
import Dashboard from "./containers/Dashboard";
import Features from "./containers/Features";
import HeaderNavBar from "./containers/HeaderNavBar";
import Home from "./containers/Home";
import Media from "./containers/Media";
import NotFound from "./components/NotFound";
import Plante from "./containers/Plante";
import Pricing from "./containers/Pricing";
import PrivateCollection from "./containers/PrivateCollection";
import { Provider } from "rebass-emotion";
import React from "react";
import Search from "./containers/Search";
import Unauthorized from "./containers/Unauthorized";
import { connect } from "react-redux";
import { persistStore } from "redux-persist";
import store from "./store";
import theme from "./assets/themes/rebassTheme";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.user
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

const AdminRoute = ({
  component: Component,
  isAuthenticated,
  isAdmin,
  ...rest
}) => {
  // const { authStatus } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/unauthorized",
              state: { from: props.location }
            }}
          />
        )}
    />
  );
};

class App extends React.Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  isAdmin = role => {
    return role == "admin" ? true : false;
  };
  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true });
    });
  }
  componentDidMount() {
    console.log("AppDidMount/props", this.props);
  }

  render() {
    if (!this.state.rehydrated) {
      return <div style={{ color: "white", fontSize: "67px" }}>Loading...</div>;
    }
    return (
      <Provider theme={theme}>
        <div className="App">
          <HeaderNavBar bgc="rgba(2, 185, 147, 0.90)" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/authentification" component={Authentification} />
            <Route path="/fonctionnalites" component={Features} />
            <Route path="/abonnement" component={Pricing} />
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
            <AdminRoute
              exact
              path="/admin"
              component={Admin}
              isAuthenticated={this.props.isAuthenticated}
              isAdmin={this.isAdmin(this.props.currentUser.role)}
            />
            <AdminRoute
              path="/admin/collections"
              component={AdminCollections}
              isAuthenticated={this.props.isAuthenticated}
              isAdmin={this.isAdmin(this.props.currentUser.role)}
            />
            <AdminRoute
              path="/admin/phototheque"
              component={AdminImages}
              isAuthenticated={this.props.isAuthenticated}
              isAdmin={this.isAdmin(this.props.currentUser.role)}
            />
            <AdminRoute
              path="/admin/taxonomie"
              component={AdminTaxonomy}
              isAuthenticated={this.props.isAuthenticated}
              isAdmin={this.isAdmin(this.props.currentUser.role)}
            />
            <Route path="/unauthorized" component={Unauthorized} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Provider>
    );
  }
}
export default withRouter(connect(mapStateToProps, null)(App));
