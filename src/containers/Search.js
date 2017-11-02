import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user.user
});

class Search extends React.Component {
  componentDidMount() {
    console.log(this.props);
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
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(Search));
