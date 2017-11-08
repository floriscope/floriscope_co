import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user.user
});

class PrivateCollection extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <span>
          Welcome to PrivateCollection page for //{this.props.match.params.uuid}//
        </span>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(PrivateCollection));
