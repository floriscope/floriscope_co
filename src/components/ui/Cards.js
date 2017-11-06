import { BackgroundImage, Card, Subhead, Text } from "rebass-emotion";
import styled, { css } from "react-emotion";

import React from "react";

const CardWrapper = styled("div")`
  margin: 10px;
  border-radius: 4px;
`;

export const HitCard = ({ imageUrl, scName, verName, width }) => (
  <Card width={256}>
    <BackgroundImage ratio={1 / 2} src={imageUrl} />
    <Subhead p={2}>{scName}</Subhead>
    <Text>{verName}</Text>
  </Card>
);
