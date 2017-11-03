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
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user.user
});

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
  state = {
    query: ""
  };
  componentDidMount() {
    console.log(this.props);
    this.setState({
      query: new URLSearchParams(this.props.location.search).get("q")
    });
  }

  changeQuery = q => {
    console.log("changing query");
    this.setState({ query: q });
    return this.state.query;
  };

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
          searchState={{
            query: this.state.query
          }}
          onSearchStateChange={value => this.changeQuery(value)}
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

export default withRouter(connect(mapStateToProps, null)(Search));
