import { Redirect, withRouter } from "react-router-dom";
import { clearAuthErrors, login } from "../reducers/authReducer";

import AuthFailed from "./auth/AuthFailed";
import AuthForm from "./auth/AuthForm";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const styles = {
  layout: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
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
  authentificationFailed: state.auth.authentificationFailed,
  redirectToReferrer: state.auth.redirectToReferrer,
  errorMessage: state.auth.errorMessage
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login, clearAuthErrors }, dispatch);

class AuthContainer extends React.Component {
  componentWillMount() {
    // console.log(this.props);
    this.props.clearAuthErrors();
  }

  componentDidMount() {
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
    const {
      redirectToReferrer,
      authentificationFailed,
      errorMessage
    } = this.props;

    if (this.props.redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <main style={styles.layout}>
        <div style={styles.formContainer}>
          <AuthForm onSubmit={this.submit} />
        </div>
        {this.props.authentificationFailed ? (
          <AuthFailed message={this.props.errorMessage} />
        ) : null}
      </main>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
);
