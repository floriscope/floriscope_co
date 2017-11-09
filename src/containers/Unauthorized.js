import { Box, Container, Flex, Heading, Text } from "rebass-emotion";
import React, { Component } from "react";

class Unauthorized extends Component {
  render() {
    return (
      <Flex align="center">
        <Box w={1}>
          <Heading py={4} fontSize={[5, 6]} color="grey" bg="white">
            Unauthorized
          </Heading>
        </Box>
        <Box w={1} ml="auto">
          <Text>Vous n'êtes pas autorisé à accéder à cette partie du site</Text>
        </Box>
      </Flex>
    );
  }
}

export default Unauthorized;
