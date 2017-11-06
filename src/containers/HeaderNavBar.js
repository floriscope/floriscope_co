import { Button, Container, Toolbar } from "rebass-emotion";
import { Dropdown, Icon, Image, Menu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import styled, { css } from "react-emotion";

import Headroom from "react-headroom";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import cxs from "cxs";
import { logout } from "../reducers/authReducer";

const UserNavLink = ({ user, logout }) => (
  <Container mx={4}>
    <Image avatar src={user.profile.avatar_url} />
    <Dropdown pointing text={user.email} className="link item">
      <Dropdown.Menu>
        <Dropdown.Header>Gérer</Dropdown.Header>
        <Dropdown.Item>Taxonomie</Dropdown.Item>
        <Dropdown.Item>Photothèque</Dropdown.Item>
        <Dropdown.Item>Données</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Compte</Dropdown.Header>
        <Dropdown.Item onClick={logout}>
          <Icon name="cancel" />
          <span className="text">Déconnexion</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Container>
);

const AuthNav = ({ isAuthenticated, user, logout }) => {
  return isAuthenticated ? (
    <UserNavLink user={user} logout={logout} />
  ) : (
    <Button bg="cyan8" color="white" mr={3}>
      <Link to="/authentification" style={{ margin: 10, color: "white" }}>
        Connexion
      </Link>
    </Button>
  );
};

const navLink_default = cxs({
  margin: "10px",
  fontSize: "16px",
  color: "white",
  ":hover": {
    color: "black"
  }
});
const navLink_active = {
  color: "black",
  fontWeight: "600"
};

class HeaderNavBar extends React.Component {
  logout = () => {
    this.props.logout();
  };
  render() {
    return (
      <Headroom
        onPin={() => console.log("pinned")}
        onUnpin={() => console.log("unpinned")}
        style={{
          height: 70,
          background: "none",
          boxShadow: "0 3px 2px rgba(0,0,0,0.15)",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Toolbar w={1} px={2} style={{ backgroundColor: this.props.bgc }}>
          <NavLink
            exact
            className={navLink_default}
            activeStyle={navLink_active}
            to="/"
          >
            Accueil
          </NavLink>
          <NavLink
            className={navLink_default}
            activeStyle={navLink_active}
            to="/about-us"
          >
            À propos
          </NavLink>
          <NavLink
            className={navLink_default}
            activeStyle={navLink_active}
            to={{ pathname: "/recherche", search: "q=Poncirus trofoliata" }}
          >
            Recherche "P. trifoliata"
          </NavLink>
          <Container />
          <AuthNav
            isAuthenticated={this.props.isAuthenticated}
            user={this.props.user}
            logout={() => this.logout()}
          />
        </Toolbar>
      </Headroom>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user.user,
  location: state.routing.location
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavBar);
