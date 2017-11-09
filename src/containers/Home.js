import { Box, Column, Flex, Heading, Row, Text } from "rebass-emotion";
import styled, { css } from "react-emotion";

import { Link } from "react-router-dom";
import React from "react";
import { fontSize } from "styled-system";

const Container = styled("div")`margin: 0;`;

const Section = styled("section")`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  background-size: cover;

  :nth-of-type(1) {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
      url("https://source.unsplash.com/1980x1020/?flower") no-repeat fixed;
  }
  :nth-of-type(2) {
    height: 200vh;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
      url("https://source.unsplash.com/1980x1020/?bark") no-repeat fixed;
  }
  :nth-of-type(3) {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
      url("https://source.unsplash.com/1980x1020/?fern") no-repeat fixed;
  }
  :nth-of-type(4) {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
      url("https://source.unsplash.com/1980x1020/?tree") no-repeat fixed;
  }
`;

const Caption = styled(Text)`
  font-family: "Authenia", sans-serif;
  font-weight: 500;
  letter-spacing: 6px;
  color: rgba(256, 256, 256, 1);
  ${fontSize};
`;

export default () => (
  <Container>
    <Section>
      <Caption center fontSize={11} bold children="Floriscope" />
    </Section>
    <Section>
      <Caption
        center
        fontSize={10}
        children="Connaître, choisir et trouver des plantes..."
      />
      <Row align="center">
        <Column>
          <Heading py={4} fontSize={[1, 2]} color="white" bg="blue">
            Essayez
          </Heading>
        </Column>
        <Column w={2 / 3} ml="auto">
          <Link to={{ pathname: "/recherche", search: "q=Érable japonais" }}>
            <Text>Érable japonais</Text>
          </Link>
        </Column>
      </Row>
    </Section>
    <Section>
      <Caption
        center
        fontSize={10}
        children="...pour les jardins et les aménagements paysagers"
      />
    </Section>
    <Section>
      <Caption center fontSize={10} children="Nos partenaires..." />
    </Section>
  </Container>
);
