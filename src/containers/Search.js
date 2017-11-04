import "../assets/styles/InstantSearchTheme@4.0.css";

import { BackgroundImage, Card, Subhead, Text } from "rebass-emotion";
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

// @fixme add media-query for SearchContainer

const SearchContainer = styled("div")`
  padding: 0 64px 6px 64px;
  overflow: hidden;
  backface-visibility: hidden;
  will-change: overflow;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-gap: 16px;
  grid-template-areas: "logo search search" "aside stats sort" "aside main main";
  grid-template-columns: 25vw auto auto;
  background: #f8f9f9;
`;
const Header = styled("header")`
  grid-area: search;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding: 24px 0;
`;
const Aside = styled("aside")`
  overflow: auto;
  height: auto;
  padding: .5rem;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  grid-area: aside
  postion: relative;
  width: auto;
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

const StatsWrapper = styled("div")`grid-area: stats;`;
const SortByWrapper = styled("div")`
  grid-area: sort;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const RefinementWrapper = styled("div")`
  background: #c3c3c3;
  padding: 0 12px;
`;
const HitsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Hit = ({ hit }) => (
  <Card width={1} m={24}>
    <BackgroundImage ratio={1 / 4} src={hit.cover} />
    <Subhead p={2} f={1}>
      <Highlight attributeName="taxon" hit={hit} />
    </Subhead>
    <Text p={2} m={2}>
      <Highlight attributeName="nom" hit={hit} />
    </Text>
  </Card>
);

const Sidebar = () => (
  <RefinementWrapper>
    <h5>Catégorie</h5>
    <RefinementList attributeName="category" />
    <h5>Humidité du sol</h5>
    <RefinementList attributeName="humidity" />
    <h5>Écorce</h5>
    <RefinementList attributeName="bark" withSearchBox />
  </RefinementWrapper>
);

const Content = () => (
  <div className="content">
    <HitsContainer>
      <Hits hitComponent={Hit} />
    </HitsContainer>
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
        <SearchContainer>
          <Header>
            <SearchBox
              translations={{ placeholder: "Rerchercher des plantes..." }}
            />
          </Header>
          <StatsWrapper>
            <Stats />
          </StatsWrapper>
          <SortByWrapper>
            <SortBy
              defaultRefinement="vegebasePlantes"
              items={[
                { label: "Les plus documentées", value: "vegebasePlantes" },
                { label: "A-Z", value: "vegebasePlante_taxonDesc" }
              ]}
            />
          </SortByWrapper>
          <Aside>
            <Sidebar />
          </Aside>
          <Main>
            <Content />
          </Main>
        </SearchContainer>
      </InstantSearch>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
