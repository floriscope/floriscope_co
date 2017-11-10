import { Box, Flex, Heading } from "rebass-emotion";
import React, { Component } from "react";
import { borderRadius, color, fontSize, space, width } from "styled-system";
import styled, { css } from "react-emotion";

import { Link } from "react-router-dom";

const Container = styled("section")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Disclaimer = styled(Heading)`
  font-family: "Brandon Grotesque", Helvetica, sans-serif;
  font-weight: 900;
  ${color};
`;
const BackLink = styled(Link)`
  height: auto;
  text-transform: uppercase;
  font: "Brandon Text", Helvetica, sans-serif;
  ${space} ${color} ${borderRadius} ${width};
`;

class Princing extends Component {
  render() {
    return (
      <Container style={{ height: "calc(100vh - 70px)" }}>
        <Flex mx={-2}>
          <Box w={1} px={2}>
            <Disclaimer is="h1" color="white">
              WORK IN PROGRESS...
            </Disclaimer>
          </Box>
        </Flex>
        <Flex>
          <Box w={1} px={2}>
            <BackLink
              to="/"
              width={[1, 1 / 2, 1 / 3]}
              m={2}
              color="white"
              bg="grey"
              p={3}
              borderRadius={1}
            >
              Retour à l'accueil
            </BackLink>
          </Box>
        </Flex>
      </Container>
    );
  }
}

export default Princing;
