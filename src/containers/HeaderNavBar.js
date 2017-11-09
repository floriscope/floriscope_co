import { Button, Container, Toolbar } from "rebass-emotion";
import { Dropdown, Icon, Image } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";

import Headroom from "react-headroom";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import cxs from "cxs";
import { logout } from "../reducers/authReducer";

const Dropdown_item = cxs({
  padding: "0.6rem 0.8rem !important",
  fontSize: "0.8rem !important"
});
const Dropdown_menu = cxs({
  left: "-20px !important"
});

const UserNavLink = ({ user, logout }) => (
  <Container mx={4}>
    <Image avatar src={user.profile.avatar_url} />
    <Dropdown pointing text={user.email} className="link item">
      <Dropdown.Menu className={Dropdown_menu}>
        <Dropdown.Header>RESSOURCES</Dropdown.Header>
        <Dropdown.Item className={Dropdown_item}>
          Listes de plantes
        </Dropdown.Item>
        <Dropdown.Item className={Dropdown_item}>
          Recherches sauvegardées
        </Dropdown.Item>
        <Dropdown.Item className={Dropdown_item}>Photothèque</Dropdown.Item>
        <Dropdown.Divider />
        {user.role == "admin" ? <Dropdown.Header>ADMIN</Dropdown.Header> : null}
        {user.role == "admin" ? (
          <Dropdown.Item className={Dropdown_item}>
            Gestion des plantes
          </Dropdown.Item>
        ) : null}
        {user.role == "admin" ? (
          <Dropdown.Item className={Dropdown_item}>
            Gestion des collections
          </Dropdown.Item>
        ) : null}
        {user.role == "admin" ? (
          <Dropdown.Item className={Dropdown_item}>
            Gestion de la photothèque
          </Dropdown.Item>
        ) : null}
        {user.role == "admin" ? <Dropdown.Divider /> : null}
        <Dropdown.Header>MON COMPTE</Dropdown.Header>
        <Dropdown.Item className={Dropdown_item}>Paramètres</Dropdown.Item>
        <Dropdown.Item onClick={logout} className={Dropdown_item}>
          <Icon name="cancel" />
          <span className="text">Déconnexion</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Container>
);

const AuthNav = ({ isAuthenticated, user, logout, location }) => {
  return isAuthenticated ? (
    <UserNavLink user={user} logout={logout} />
  ) : (
    <Button bg="cyan8" color="white" mr={3}>
      <Link
        to={{
          pathname: "/authentification",
          state: { from: location }
        }}
        style={{ margin: 10, color: "white" }}
      >
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
            to={{ pathname: "/recherche", search: "q=Poncirus trifoliata" }}
          >
            Recherche "P. trifoliata"
          </NavLink>
          {this.props.user.role == "admin" ? (
            <NavLink
              className={navLink_default}
              activeStyle={navLink_active}
              to={{ pathname: "/admin" }}
            >
              Espace admin
            </NavLink>
          ) : null}
          <Container />
          <AuthNav
            isAuthenticated={this.props.isAuthenticated}
            user={this.props.user}
            location={this.props.location}
            logout={() => this.logout()}
          />
        </Toolbar>
      </Headroom>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  location: state.routing.location
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavBar);
