import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getCollection } from "../../reducers/adminCollectionsReducer";
import styled from "react-emotion";
import { withRouter } from "react-router-dom";

const Container = styled("main")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

class AdminCollection extends Component {
  /* Component Lifecycle */
  componentDidMount() {
    console.log("AdminCollection/componentDidMount:PROPS", this.props);
    this.props.getCollection(
      this.props.match.params.collectionId,
      this.props.auth.authToken
    );
  }

  /* Render */

  render() {
    return (
      <Container style={{ height: "calc(100vh - 70px)" }}>
        <div
          style={{
            height: "80px",
            background: "white",
            fontFamily: '"Brandon Grotesque, sans-serif',
            textTransform: "uppercase",
            fontWeight: 900,
            fontSize: "34px"
          }}
        >
          {this.props.loadingCollection
            ? this.props.collection.title
            : "Loading collection"}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  routing: state.routing,
  loadingCollection: state.adminCollections.activeCollection.loading,
  collection: state.adminCollections.activeCollection.collection,
  errorMessage: state.adminCollections.activeCollection.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getCollection }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminCollection)
);
