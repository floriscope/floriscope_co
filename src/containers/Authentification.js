import { Redirect, withRouter } from "react-router-dom";

import AuthForm from "./auth/AuthForm";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../reducers/authReducer";

const styles = {
  layout: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  formContainer: {
    margin: 12,
    width: "300px",
    background: "white",
    borderRadius: "6px",
    boxShadow: "0 0 40px 4px #111118",
    overflow: "hidden",
    display: "block"
  },
  header: {
    marginBottom: 12
  }
};
const mapStateToProps = state => ({
  authStatus: state.auth.isAuthenticated,
  redirectToReferrer: state.auth.redirectToReferrer
});

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

class AuthContainer extends React.Component {
  componentWillMount() {
    // console.log(this.props);
  }

  componentDidUpdate() {
    // console.log(this.props);
  }
  submit = credentials => {
    // print the form values to the console
    console.log(credentials);
    console.log(this.props);
    this.props.login(credentials);
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.props.redirectToReferrer;

    if (this.props.redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <main style={styles.layout}>
        <div style={styles.formContainer}>
          <AuthForm onSubmit={this.submit} />
        </div>
      </main>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
);
