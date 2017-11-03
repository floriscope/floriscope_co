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
      <div>
        <div>Welcome to Search page</div>
        <div>
          <code>{JSON.stringify(this.props.match)}</code>
          <code>{JSON.stringify(this.props.location)}</code>
          <p>
            Query param =>{" "}
            <b>{new URLSearchParams(this.props.location.search).get("q")}</b>
          </p>
        </div>
        <InstantSearch
          appId="YUJNYEHBTI"
          apiKey="7e8a0d4ae30b28542ada596b547a0dc8"
          indexName="vegebasePlantes"
          searchState={this.props.searchState}
          onSearchStateChange={state => this.props.changeSearchState(state)}
        >
          <header>
            <SearchBox
              translations={{ placeholder: "Rerchercher des plantes..." }}
            />
          </header>
          <main>
            <Sidebar />
            <Content />
          </main>
        </InstantSearch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
