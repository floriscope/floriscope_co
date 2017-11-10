import { Box, Button, Card, Container, Flex, Text } from "rebass-emotion";
import React, { Component } from "react";
import { borderRadius, color, fontSize, space, width } from "styled-system";
import styled, { css } from "react-emotion";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AdminHomeContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  height: auto;
  text-transform: uppercase;
  font: "Brandon Grotesque", "Brandon Text", Helvetica, sans-serif;
  ${space} ${color} ${borderRadius} ${width};
`;

const Caption = styled(Text)`
  font-family: "Authenia", sans-serif;
  font-weight: 500;
  letter-spacing: 6px;
  color: rgba(256, 256, 256, 1);
  ${fontSize};
`;

const AdminLink = ({ link, title, color }) => (
  <StyledLink
    to={link}
    width={[1, 1 / 2, 1 / 3]}
    m={2}
    color="white"
    bg={color}
    p={3}
    borderRadius={1}
  >
    <Flex mx={-2}>
      <Box w={9 / 10} px={2}>
        <Text p={1} color="white" bold>
          {title}
        </Text>
      </Box>
      <Box w={1 / 10} px={2}>
        <Text p={1} bold color="white">
          >
        </Text>
      </Box>
    </Flex>
  </StyledLink>
);

// Salut Typhaine

class Admin extends Component {
  render() {
    return (
      <AdminHomeContainer style={{ height: "calc(100vh - 70px)" }}>
        <Caption
          center
          fontSize={[5, 6, 8]}
          bold
          children="Le changement c'est maintenant!"
        />
        <AdminLink
          link="/admin/collections"
          title="Gestion des collections"
          color="green"
        />
        <AdminLink
          link="/admin/phototheque"
          title="Gestion de la photothèque"
          color="yellow"
        />
        <AdminLink
          link="/admin/taxonomie"
          title="Gestion des plantes"
          color="red"
        />
      </AdminHomeContainer>
    );
  }
}

const mapStateToProps = state => ({
  location: state.routing.location
});

export default connect(mapStateToProps, null)(Admin);
