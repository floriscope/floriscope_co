import { Column, Container, Heading, Row } from "rebass-emotion";
import { color, fontSize, space, width } from "styled-system";
import styled, { css } from "react-emotion";

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user.user,
  currentPlante: state.routing.location.state.currentPlante
});

const Header = styled("h1")`
  font-family: ${props =>
    typeof props.ff !== "undefined"
      ? props.ff
      : "'Brandon Grotesque', sans-serif"};
  text-transform: ${props =>
    typeof props.tt !== "undefined" ? props.tt : "uppercase"};
  ${space} ${width} ${fontSize} ${color};
`;

const LeftPanel = styled("div")`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
    url(${props => props.imageUrl}) no-repeat;
  background-size: cover;
  background-position: center;
  padding: 24px;
  width: 66%;
  -webkit-transition: width 1s; /* Safari */
  transition: width 1s;
  -webkit-transition-timing-function: cubic-bezier(
    1,
    0,
    0.47,
    0.82
  ); /* Safari and Chrome */
  transition-timing-function: cubic-bezier(1, 0, 0.47, 0.82);
  margin: 0;
  & :hover {
    width: 33%;
  }
  ${space};
`;
const CenterPanel = styled("div")`
  background: sandybrown;
  width: 33%;
  color: white;
  ${space};
`;
const RightPanel = styled("div")`
  background: teal;
  width: 0;
  color: white;
  ${space};
`;

class Plante extends React.Component {
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    return (
      <Row bg="white" style={{ height: "calc(100vh - 70px)" }}>
        <LeftPanel imageUrl={this.props.currentPlante.cover} p={54}>
          <Header color={"white"} fontSize={"54px"} tt={"none"} p={1}>
            {this.props.currentPlante.taxon}
          </Header>
        </LeftPanel>
        <CenterPanel>Column</CenterPanel>
        <RightPanel>Column</RightPanel>
      </Row>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(Plante));
