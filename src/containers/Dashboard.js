import HeaderBar from "../components/HeaderBar";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user.user
});

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <HeaderBar user={this.props.user} />
        <span>I am the Dashboard component</span>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(Dashboard));
