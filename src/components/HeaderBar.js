import { Box, Flex } from "grid-styled";
import { Dropdown, Icon, Image, Menu } from "semantic-ui-react";

import Headroom from "react-headroom";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import esperluette from "../assets/images/esperluette.svg";
import { logout } from "../reducers/authReducer";
import styled from "styled-components";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  }
};

const Container = styled(Box)`
  max-width: 100vw;
  width: 960px;
  margin-left: auto;
  margin-right: auto;
`;

const Divider = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.7);
  height: 48px;
`;

const options = [
  { key: "user", text: "Account", icon: "user" },
  { key: "settings", text: "Settings", icon: "settings" },
  { key: "sign-out", text: "Sign Out", icon: "sign out" }
];

class HeaderBar extends React.Component {
  logout = () => {
    this.props.logout();
  };
  render() {
    return (
      <header>
        <Headroom
          onPin={() => console.log("pinned")}
          onUnpin={() => console.log("unpinned")}
          wrapperStyle={{ marginBottom: 24 }}
          style={{
            height: 70,
            background: "rgba(0, 139, 139, 1)",
            boxShadow: "1px 1px 1px rgba(0,0,0,0.25)",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Container>
            <Flex>
              <Box p={1}>
                <img src={esperluette} style={{ height: 48 }} alt="logo" />
              </Box>
              <Box p={1}>
                <Divider />
              </Box>
              <Box p={2} ml="auto" mr="auto">
                <h1 style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Tableau de bord
                </h1>
              </Box>
              <Box p={2}>
                <Image avatar src={this.props.user.profile.avatar_url} />
                <Dropdown
                  pointing
                  text={this.props.user.email}
                  className="link item"
                >
                  <Dropdown.Menu>
                    <Dropdown.Header>Gérer</Dropdown.Header>
                    <Dropdown.Item>Taxonomie</Dropdown.Item>
                    <Dropdown.Item>Photothèque</Dropdown.Item>
                    <Dropdown.Item>Données</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Compte</Dropdown.Header>
                    <Dropdown.Item onClick={this.logout}>
                      <Icon name="cancel" />
                      <span className="text">Déconnexion</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Box>
            </Flex>
          </Container>
        </Headroom>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  authStatus: state.auth.isAuthenticated,
  user: state.auth.user.user
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
