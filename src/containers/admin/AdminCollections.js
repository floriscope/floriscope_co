import { Box, Card, Flex, Heading } from "rebass-emotion";
import { Link, Route } from "react-router-dom";
import React, { Component } from "react";
import {
  borderRadius,
  borderWidth,
  color,
  fontSize,
  space,
  width
} from "styled-system";
import styled, { css } from "react-emotion";

import HeaderSearchBox from "../../components/admin/HeaderSearchBox";
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

const ListWrapper = styled("div")`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const ItemWrapper = styled("div")`
  height: auto;

  ${width} ${space} ${borderWidth} ${borderRadius} ${color};
`;

const CollectionsList = ({ children, style, ...props }) => {
  return (
    <ListWrapper>
      {props.items.map(item => {
        return <CollectionItem key={item.uuid} item={item} />;
      })}
    </ListWrapper>
  );
};

const CollectionItem = ({ children, style, ...props }) => {
  return (
    <ItemWrapper w={[1, 2 / 3, 1 / 2]} bg="white" m={1} p={3}>
      <Link to={{ pathname: `/admin/c/${props.item.id}` }}>
        {props.item.title}
      </Link>
    </ItemWrapper>
  );
};

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
        <HeaderSearchBox>Searchbox</HeaderSearchBox>
        <CollectionsList items={this.props.collections} />
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
