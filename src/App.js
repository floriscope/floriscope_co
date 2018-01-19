import { AnimatedRoute, AnimatedSwitch } from "react-router-transition";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Admin from "./containers/Admin";
import AdminCollection from "./containers/admin/AdminCollection";
import AdminCollections from "./containers/admin/AdminCollections";
import AdminImage from "./containers/admin/AdminImage";
import AdminImageEdit from "./containers/admin/AdminImageEdit";
import AdminImages from "./containers/admin/AdminImages";
import AdminTaxonomy from "./containers/admin/AdminTaxonomy";
import Authentification from "./containers/Authentification";
import Collection from "./containers/Collection";
import Dashboard from "./containers/Dashboard";
import Features from "./containers/Features";
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
import { css } from "emotion";
import { persistStore } from "redux-persist";
import { spring } from "react-motion";
import store from "./store";
import theme from "./assets/themes/rebassTheme";

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
        )
      }
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
        )
      }
    />
  );
};

const switchRule = css`
  position: relative;
  & > div {
    position: absolute;
  }
`;

const routeRule = css`
  position: relative;
  & > div {
    position: absolute;
    width: 100%;
  }
`;

function glide(val) {
  return spring(val, {
    stiffness: 174,
    damping: 24
  });
}

function slide(val) {
  return spring(val, {
    stiffness: 125,
    damping: 16
  });
}

const pageTransitions = {
  atEnter: {
    offset: -100
  },
  atLeave: {
    offset: glide(-100)
  },
  atActive: {
    offset: glide(0)
  }
};

const topBarTransitions = {
  atEnter: {
    offset: -100
  },
  atLeave: {
    offset: slide(-150)
  },
  atActive: {
    offset: slide(0)
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  isAdmin = role => {
    return role === "admin" ? true : false;
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
          <Switch location={this.props.location}>
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
            <Route
              render={({ location }) => (
                <div>
                  <AnimatedSwitch
                    css={switchRule}
                    {...pageTransitions}
                    runOnMount={location.pathname === "/admin/collections"}
                    mapStyles={styles => ({
                      transform: `translateY(${styles.offset}%)`
                    })}
                  >
                    <AdminRoute
                      exact
                      path="/admin/collections"
                      component={AdminCollections}
                      isAuthenticated={this.props.isAuthenticated}
                      isAdmin={this.isAdmin(this.props.currentUser.role)}
                    />
                    <AnimatedRoute
                      path="/admin/c/:collectionId"
                      component={AdminCollection}
                      atEnter={{ offset: -100 }}
                      atLeave={{ offset: -100 }}
                      atActive={{ offset: 0 }}
                      mapStyles={styles => ({
                        transform: `translateY(${styles.offset}%)`
                      })}
                    />
                  </AnimatedSwitch>
                </div>
              )}
            />

            <AdminRoute
              path="/admin/phototheque"
              component={AdminImages}
              isAuthenticated={this.props.isAuthenticated}
              isAdmin={this.isAdmin(this.props.currentUser.role)}
            />
            <AdminRoute
              exact
              path="/admin/i/:imageId"
              component={AdminImage}
              isAuthenticated={this.props.isAuthenticated}
              isAdmin={this.isAdmin(this.props.currentUser.role)}
            />
            <AdminRoute
              exact
              path="/admin/i/:imageId/modifier"
              component={AdminImageEdit}
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.user
});

export default withRouter(connect(mapStateToProps, null)(App));
