import { Redirect, withRouter } from "react-router-dom";
import { clearAuthErrors, login } from "../reducers/authReducer";
import styled, { css } from "react-emotion";

import AuthFailed from "./auth/AuthFailed";
import AuthForm from "./auth/AuthForm";
import HeaderNavBar from "./HeaderNavBar";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const styles = {
  layout: {
    height: "calc (100vh - 70px)",
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

const AuthContainer = styled("main")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

class Authentification extends React.Component {
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
      <AuthContainer style={{ height: "calc(100vh - 70px)" }}>
        <HeaderNavBar bgc="rgba(2, 185, 147, 0.90)" />
        <div style={styles.formContainer}>
          <AuthForm onSubmit={this.submit} />
        </div>
        {this.props.authentificationFailed ? (
          <AuthFailed message={this.props.errorMessage} />
        ) : null}
      </AuthContainer>
    );
  }
}

const mapStateToProps = state => ({
  authStatus: state.auth.isAuthenticated,
  authentificationFailed: state.auth.authentificationFailed,
  redirectToReferrer: state.auth.redirectToReferrer,
  errorMessage: state.auth.errorMessage
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login, clearAuthErrors }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Authentification)
);
