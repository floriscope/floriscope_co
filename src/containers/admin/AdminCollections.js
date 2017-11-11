import { Box, Flex, Heading } from "rebass-emotion";
import React, { Component } from "react";
import { borderRadius, color, fontSize, space, width } from "styled-system";
import styled, { css } from "react-emotion";

import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getCollections } from "../../reducers/adminCollectionsReducer";
import { withRouter } from "react-router-dom";

const Container = styled("section")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

class AdminCollections extends Component {
  componentWillMount() {
    this.props.getCollections(this.props.auth.authToken);
  }
  componentDidMount() {
    console.log("AdminCollections/componentDidMount:PROPS", this.props);
  }
  render() {
    return (
      <Container>
        {this.props.collections.map(collection => {
          return (
            <div style={{ color: "white" }} key={collection.uuid}>
              {collection.title}
            </div>
          );
        })}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  routing: state.routing,
  loadingCollections: state.adminCollections.allCollections.loading,
  collections: state.adminCollections.allCollections.collections,
  errorMessage: state.adminCollections.allCollections.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getCollections }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminCollections)
);
