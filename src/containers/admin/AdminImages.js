import "../../assets/styles/InstantSearchTheme@4.0.css";

import {
  BackgroundImage,
  Box,
  Card,
  Flex,
  Heading,
  Subhead,
  Text
} from "rebass-emotion";
import {
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  Panel,
  RefinementList,
  SearchBox,
  SortBy,
  Stats,
  Toggle
} from "react-instantsearch/dom";
import React, { Component } from "react";
import { borderRadius, color, fontSize, space, width } from "styled-system";
import styled, { css } from "react-emotion";

import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { changeSearchState } from "../../reducers/adminImagesReducer";
import { connect } from "react-redux";
import { orderBy } from "lodash";
import { withRouter } from "react-router-dom";

const Container = styled("section")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Disclaimer = styled(Heading)`
  font-family: "Brandon Grotesque", Helvetica, sans-serif;
  font-weight: 900;
  ${color};
`;
const BackLink = styled(Link)`
  height: auto;
  text-transform: uppercase;
  font: "Brandon Text", Helvetica, sans-serif;
  ${space} ${color} ${borderRadius} ${width};
`;

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

const StatsWrapper = styled("div")`
  grid-area: stats;
`;
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
  <Card m={24} width={512}>
    <BackgroundImage ratio={1 / 3} src={hit.picture.medium.url} />
    <Subhead p={2} f={1}>
      {hit.matched_taxa ? (
        <Link
          to={{
            pathname: `/admin/i/${hit.id}`,
            state: { currentPlante: hit }
          }}
        >
          <Highlight attributeName="matched_taxa" hit={hit} />
        </Link>
      ) : (
        "Aucune plante associée"
      )}
    </Subhead>
    <Text p={2} m={2}>
      <Highlight attributeName="author" hit={hit} />
    </Text>
  </Card>
);

const Sidebar = () => (
  <RefinementWrapper>
    <h5>Auteur</h5>
    <RefinementList
      attributeName="author"
      transformItems={items =>
        orderBy(items, ["label", "count"], ["asc", "desc"])
      }
    />
    <h5>Statut de l'image</h5>
    <Toggle
      attributeName="pubStatus"
      label="Image non publiée"
      value="Non publié"
    />
    <Toggle
      attributeName="isPlanteOrphaned"
      label="Sans plante associée"
      value="true"
    />
    <h5>Mots-clés</h5>
    <RefinementList attributeName="tags" />
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

class AdminImages extends Component {
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
              translations={{ placeholder: "Rechercher des images..." }}
            />
          </Header>
          <StatsWrapper>
            <Stats />
          </StatsWrapper>
          <SortByWrapper>
            <SortBy
              defaultRefinement="vegebaseIllustrations_ADMIN"
              items={[
                {
                  label: "Les plus pertinentes",
                  value: "vegebaseIllustrations_ADMIN"
                },
                { label: "A-Z", value: "vegebaseIllustrations_ADMIN" }
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
  searchState: state.adminImages.searchState,
  location: state.routing.location,
  indexName: state.adminImages.indexName
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSearchState }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminImages)
);
