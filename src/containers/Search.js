import "../assets/styles/InstantSearchTheme@4.0.css";

import {
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  SortBy,
  Stats
} from "react-instantsearch/dom";
import styled, { css } from "react-emotion";

import React from "react";
import { bindActionCreators } from "redux";
import { changeSearchState } from "../reducers/searchReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  searchState: state.search.searchState,
  indexName: state.search.indexName
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSearchState }, dispatch);

const Container = styled("div")`
  padding: 0 64px 6px 64px;
  overflow: hidden;
  backface-visibility: hidden;
  will-change: overflow;
  height: 100vh;
  display: grid;
  grid-gap: 16px;
  grid-template-areas: "logo header header" "aside main main"
    "aside pagination pagination";
  background: #f8f9f9;
`;
const Header = styled("header")`
  grid-area: header;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding: 24px 12px;
`;
const Aside = styled("aside")`
  overflow: auto;
  height: auto;
  padding: .5rem;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  grid-area: aside
  postion: relative;
  width: 200px;
  margin-bottom: 52px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Main = styled("main")`
  overflow: auto;
  height: auto;
  padding: 0.5rem;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  grid-area: main;
  width: 800px;
  margin-bottom: 52px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Hit = ({ hit }) => (
  <div className="hit">
    <div className="hit-image">
      <img src={hit.cover_sm} alt={hit.objectID} />
    </div>
    <div className="hit-content">
      <Highlight attributeName="taxon" hit={hit} />
      <Highlight attributeName="nom" hit={hit} />
    </div>
  </div>
);

const Sidebar = () => (
  <div className="sidebar">
    <h5>Catégorie</h5>
    <RefinementList attributeName="category" />
    <h5>Écorce</h5>
    <RefinementList attributeName="bark" withSearchBox />
  </div>
);

const Content = () => (
  <div className="content">
    <div className="info">
      <Stats />
      <SortBy
        defaultRefinement="vegebasePlantes"
        items={[
          { label: "Les plus documentées", value: "vegebasePlantes" },
          { label: "A-Z", value: "vegebasePlante_taxonDesc" }
        ]}
      />
    </div>
    <Hits hitComponent={Hit} />
    <div className="pagination">
      <Pagination showLast />
    </div>
  </div>
);

class Search extends React.Component {
  componentDidMount() {
    console.log("SEARCH props", this.props);
  }
  render() {
    return (
      <InstantSearch
        appId="YUJNYEHBTI"
        apiKey="7e8a0d4ae30b28542ada596b547a0dc8"
        indexName={this.props.indexName}
        searchState={this.props.searchState}
        onSearchStateChange={state => this.props.changeSearchState(state)}
      >
        <Container>
          <Header>
            <SearchBox
              translations={{ placeholder: "Rerchercher des plantes..." }}
            />
          </Header>
          <Aside>
            <Sidebar />
          </Aside>
          <Main>
            <Content />
          </Main>
        </Container>
      </InstantSearch>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
