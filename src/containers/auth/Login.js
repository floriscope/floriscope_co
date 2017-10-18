import { Redirect, withRouter } from "react-router-dom";

import LoginForm from "./LoginForm";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../../reducers/authReducer";

const styles = {
  layout: {
    height: "100vh",
    background: "silver",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  formContainer: {
    margin: 12,
    padding: 24,
    width: "500px",
    background: "white",
    borderRadius: "4px"
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

class LoginContainer extends React.Component {
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
          <h2 style={styles.header}>ACCÈS ADMINISTRATEUR</h2>
          <LoginForm onSubmit={this.submit} />
          <div>
            <div>
              You are <b>{this.props.authStatus ? "currently" : "not"}</b>{" "}
              logged in.
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
);
