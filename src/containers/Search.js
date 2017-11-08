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
import { autoRehydrate, persistStore } from "redux-persist";
import styled, { css } from "react-emotion";

import { Link } from "react-router-dom";
import React from "react";
import { bindActionCreators } from "redux";
import { changeSearchState } from "../reducers/searchReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// @fixme add media-query for SearchContainer
// @fixme aside and main scrolling bug on Safari
//  possible fix = going back to display: flex
//  inspiration here: https://webdesign.tutsplus.com/tutorials/how-to-make-responsive-scrollable-panels-with-flexbox--cms-23269

const SearchContainer = styled("div")`
  padding: 0 64px 6px 64px;
  overflow: hidden;

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
  width: 100%;
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
  <Card m={24}>
    <BackgroundImage ratio={1 / 4} src={hit.cover} />
    <Subhead p={2} f={1}>
      <Link
        to={{ pathname: `/plante/${hit.slug}`, state: { currentPlante: hit } }}
      >
        <Highlight attributeName="taxon" hit={hit} />
      </Link>
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
    console.log("Router Location Search", this.props.location.search);
    if (this.props.location.search !== undefined) {
      const query = new URLSearchParams(this.props.location.search).get("q");
      console.log("QUERY FROM URL", query);
      const newSearchState = { query: query };
      this.props.changeSearchState(newSearchState);
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.location != this.props.location) {
      console.log("Location will change!");
    }
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

const mapStateToProps = state => ({
  searchState: state.search.searchState,
  location: state.routing.location,
  indexName: state.search.indexName
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSearchState }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
