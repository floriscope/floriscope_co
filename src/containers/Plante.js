import { Column, Container, Heading, Row } from "rebass-emotion";
import { color, fontSize, space, width } from "styled-system";
import styled, { css } from "react-emotion";

import React from "react";
import Transition from "react-transition-group/Transition";
import anime from "animejs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getPlante } from "../reducers/planteReducer";
import { withRouter } from "react-router-dom";

const LeftPanel = styled("div")`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
    url(${props => props.imageUrl}) no-repeat;
  background-size: cover;
  background-position: center;
  padding: 24px;
  width: ${props => (props.toggle ? "33%" : "66%")};
  -webkit-transition: width 0.7s; /* Safari */
  transition: width 0.7s;
  -webkit-transition-timing-function: cubic-bezier(
    1,
    0,
    0.47,
    0.82
  ); /* Safari and Chrome */
  transition-timing-function: cubic-bezier(1, 0, 0.47, 0.82);
  margin: 0;
  ${space};
`;

const CenterPanel = styled("div")`
  background: sandybrown;
  width: ${props => (props.toggle ? "0" : "33%")};
  -webkit-transition: width 0.7s; /* Safari */
  transition: width 0.7s;
  -webkit-transition-timing-function: cubic-bezier(
    1,
    0,
    0.47,
    0.82
  ); /* Safari and Chrome */
  transition-timing-function: cubic-bezier(1, 0, 0.47, 0.82);
  color: white;
  ${space};
`;

const RightPanel = styled("div")`
  background: teal;
  width: 0;
  color: white;
  overflow: auto;
  height: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  postion: relative;
  width: ${props => (props.toggle ? "66%" : "0")};
  -webkit-transition: width 0.7s; /* Safari */
  transition: width 0.7s;
  -webkit-transition-timing-function: cubic-bezier(
    1,
    0,
    0.47,
    0.82
  ); /* Safari and Chrome */
  transition-timing-function: cubic-bezier(1, 0, 0.47, 0.82);
  &::-webkit-scrollbar {
    display: none;
  }
  ${space};
`;

const Header = styled("h1")`
  font-family: ${props =>
    typeof props.ff !== "undefined"
      ? props.ff
      : "'Brandon Grotesque', sans-serif"};
  text-transform: ${props =>
    typeof props.tt !== "undefined" ? props.tt : "uppercase"};
  opacity: ${props => (props.toggle ? "0" : "1")};
  -webkit-transition: opacity ${props => props.duration} ease-out;
  -moz-transition: opacity ${props => props.duration} ease-out;
  -ms-transition: opacity ${props => props.duration} ease-out;
  -o-transition: opacity ${props => props.duration} ease-out;
  transition: opacity ${props => props.duration} ease-out;
  ${space} ${width} ${fontSize} ${color};
`;

const Lorem = () => (
  <div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at nisl id
      urna luctus bibendum eu id velit. Etiam tincidunt euismod diam, eget
      scelerisque mauris facilisis id. Etiam nunc ipsum, venenatis et
      condimentum ac, efficitur aliquet massa. Donec molestie vestibulum sem, id
      blandit leo accumsan non. In placerat aliquam metus. Aenean sed odio in
      velit dapibus imperdiet non ac felis. Fusce maximus massa a tincidunt
      faucibus. Duis mattis malesuada ante, eget convallis arcu tempor ac. Ut
      semper, odio sed aliquam tristique, orci eros tristique augue, iaculis
      consequat est eros ut mauris.
    </p>
    <p>
      Donec laoreet turpis velit, a molestie ante ornare eu. Cras sollicitudin
      accumsan lacinia. Nulla a semper augue. Nunc volutpat vehicula vehicula.
      Sed dapibus laoreet dui vitae vestibulum. Sed malesuada libero ut ligula
      porta euismod. Morbi at magna vitae est sagittis pharetra. Nam non nunc
      vitae mauris posuere bibendum ac eget massa. Maecenas et condimentum
      lorem. Mauris hendrerit tempor tincidunt. Aenean ut elementum mauris.
      Phasellus auctor nisl nisi, eget mattis nisi efficitur et. Integer auctor
      eu dui et rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Duis mollis, urna sed scelerisque tincidunt, velit lorem scelerisque odio,
      vitae posuere est lacus a felis.
    </p>
    <p>
      Aenean bibendum tellus diam, nec gravida tortor vulputate ac. Curabitur
      tortor ipsum, hendrerit quis mi et, rutrum bibendum mi. Donec rhoncus
      felis eget felis efficitur, ac aliquet dolor ultricies. Morbi tempus nec
      turpis et semper. Fusce feugiat ut nisi a ullamcorper. Ut id tristique
      ipsum. In mollis at nulla sed placerat. Curabitur iaculis volutpat justo
      ac tincidunt.
    </p>
    <p>
      Donec ultricies eu velit ut faucibus. Quisque mollis lorem vitae erat
      fringilla, nec condimentum ex commodo. Morbi vel ultricies lacus, id
      tincidunt eros. Nulla facilisi. Nulla hendrerit neque et metus luctus
      rhoncus. Integer hendrerit neque quis nulla auctor tristique. Maecenas
      pretium lorem eu diam aliquam tempus. Donec non varius nisi. Nullam
      lobortis lacinia tortor, eget aliquet lorem tempus at. Vestibulum sit amet
      metus ultrices, luctus lacus at, malesuada odio. Morbi augue arcu, sodales
      at maximus non, iaculis in erat. Aenean turpis lacus, gravida et nisl
      suscipit, finibus mollis lectus. Donec ac velit et sem pellentesque
      dignissim vel eu metus.
    </p>
    <p>
      Aliquam ac cursus quam, vitae mattis dolor. Cras eleifend placerat
      gravida. Vestibulum eu faucibus ipsum, et fermentum libero. Fusce eget
      sagittis ipsum, in condimentum felis. Nulla non tellus id est molestie
      posuere. Morbi laoreet orci vel turpis rhoncus, facilisis placerat dui
      blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
      posuere cubilia Curae; Vestibulum sagittis vestibulum ante vel
      ullamcorper. Fusce a urna at risus vulputate pharetra viverra nec dolor.
      Nam ac neque sem. Donec sodales aliquam diam quis blandit. Sed eget ex eu
      est aliquet vehicula. Morbi faucibus pharetra libero, ac porttitor magna
      vestibulum vel. Pellentesque nulla ligula, rutrum non quam eu, pretium
      fermentum magna. Aenean mi magna, dictum eu nibh ac, egestas cursus arcu.
      Curabitur porta et tellus nec egestas.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at nisl id
      urna luctus bibendum eu id velit. Etiam tincidunt euismod diam, eget
      scelerisque mauris facilisis id. Etiam nunc ipsum, venenatis et
      condimentum ac, efficitur aliquet massa. Donec molestie vestibulum sem, id
      blandit leo accumsan non. In placerat aliquam metus. Aenean sed odio in
      velit dapibus imperdiet non ac felis. Fusce maximus massa a tincidunt
      faucibus. Duis mattis malesuada ante, eget convallis arcu tempor ac. Ut
      semper, odio sed aliquam tristique, orci eros tristique augue, iaculis
      consequat est eros ut mauris.
    </p>
    <p>
      Donec laoreet turpis velit, a molestie ante ornare eu. Cras sollicitudin
      accumsan lacinia. Nulla a semper augue. Nunc volutpat vehicula vehicula.
      Sed dapibus laoreet dui vitae vestibulum. Sed malesuada libero ut ligula
      porta euismod. Morbi at magna vitae est sagittis pharetra. Nam non nunc
      vitae mauris posuere bibendum ac eget massa. Maecenas et condimentum
      lorem. Mauris hendrerit tempor tincidunt. Aenean ut elementum mauris.
      Phasellus auctor nisl nisi, eget mattis nisi efficitur et. Integer auctor
      eu dui et rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Duis mollis, urna sed scelerisque tincidunt, velit lorem scelerisque odio,
      vitae posuere est lacus a felis.
    </p>
    <p>
      Aenean bibendum tellus diam, nec gravida tortor vulputate ac. Curabitur
      tortor ipsum, hendrerit quis mi et, rutrum bibendum mi. Donec rhoncus
      felis eget felis efficitur, ac aliquet dolor ultricies. Morbi tempus nec
      turpis et semper. Fusce feugiat ut nisi a ullamcorper. Ut id tristique
      ipsum. In mollis at nulla sed placerat. Curabitur iaculis volutpat justo
      ac tincidunt.
    </p>
    <p>
      Donec ultricies eu velit ut faucibus. Quisque mollis lorem vitae erat
      fringilla, nec condimentum ex commodo. Morbi vel ultricies lacus, id
      tincidunt eros. Nulla facilisi. Nulla hendrerit neque et metus luctus
      rhoncus. Integer hendrerit neque quis nulla auctor tristique. Maecenas
      pretium lorem eu diam aliquam tempus. Donec non varius nisi. Nullam
      lobortis lacinia tortor, eget aliquet lorem tempus at. Vestibulum sit amet
      metus ultrices, luctus lacus at, malesuada odio. Morbi augue arcu, sodales
      at maximus non, iaculis in erat. Aenean turpis lacus, gravida et nisl
      suscipit, finibus mollis lectus. Donec ac velit et sem pellentesque
      dignissim vel eu metus.
    </p>
    <p>
      Aliquam ac cursus quam, vitae mattis dolor. Cras eleifend placerat
      gravida. Vestibulum eu faucibus ipsum, et fermentum libero. Fusce eget
      sagittis ipsum, in condimentum felis. Nulla non tellus id est molestie
      posuere. Morbi laoreet orci vel turpis rhoncus, facilisis placerat dui
      blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
      posuere cubilia Curae; Vestibulum sagittis vestibulum ante vel
      ullamcorper. Fusce a urna at risus vulputate pharetra viverra nec dolor.
      Nam ac neque sem. Donec sodales aliquam diam quis blandit. Sed eget ex eu
      est aliquet vehicula. Morbi faucibus pharetra libero, ac porttitor magna
      vestibulum vel. Pellentesque nulla ligula, rutrum non quam eu, pretium
      fermentum magna. Aenean mi magna, dictum eu nibh ac, egestas cursus arcu.
      Curabitur porta et tellus nec egestas.
    </p>
  </div>
);

class Plante extends React.Component {
  state = { toggle: false };

  togglePanels = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  componentDidMount() {
    console.log("Plante componentDidMount", this.props);
    this.getPlante(this.props.match.params.slug, this.props.user.auth_token);
  }
  render() {
    return (
      <Row bg="white" style={{ height: "calc(100vh - 70px)" }}>
        <LeftPanel
          imageUrl={this.props.currentPlante.cover}
          p={54}
          toggle={this.state.toggle}
        >
          <Header
            color={"white"}
            fontSize={"54px"}
            tt={"none"}
            p={1}
            toggle={this.state.toggle}
            duration={"1.2s"}
          >
            {this.props.currentPlante.taxon}
          </Header>
          <button onClick={this.togglePanels}>
            {this.state.toggle ? "Toggle Left Panel" : "Toggle Right Panel"}
          </button>
        </LeftPanel>
        <CenterPanel toggle={this.state.toggle}>Column</CenterPanel>
        <RightPanel toggle={this.state.toggle}>
          <Header
            color={"black"}
            fontSize={"54px"}
            tt={"none"}
            p={1}
            toggle={!this.state.toggle}
            duration={"2.2s"}
          >
            {this.props.currentPlante.taxon}
          </Header>
          <Lorem />
        </RightPanel>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  routing: state.routing,
  currentPlante: state.routing.location.state.currentPlante,
  plante: state.plante.plante
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getPlante }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Plante));
