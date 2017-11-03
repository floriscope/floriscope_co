import { Button, TabItem, Tabs } from "rebass-emotion";
import { Field, reduxForm } from "redux-form";
import React, { Component } from "react";
import styled, { css } from "react-emotion";

import { CustomInput } from "../../components/ui/Form";
import email from "../../assets/images/email.svg";
import lock from "../../assets/images/lock.svg";
import { logo } from "../../assets/images";

const FormHeader = styled("div")`
  display: block;
  background: #ececec;
  height: 134px;
  text-align: center;
  padding: 12px;
  color: #333;
  & img {
    width: 64px;
    height: 64px;
  }
  & div {
    color: #c3c3c3;
    /* font: normal 36px "Authenia", sans-serif; */
    font: 900 24px "Brandon Grotesque", sans-serif;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
`;

const AuthButton = styled(Button)`
  border: 0;
  padding: 14px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  overflow: hidden;
  border-radius: 0 0 5px 5px;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  color: #fff;
  letter-spacing: 1px;
  font-size: 14px;
  text-transform: uppercase;
  margin-top: 28px;
  background-color: #159379;
`;

const AuthTabs = styled(Tabs)`
  border-bottom: 1px solid #c3c3c3;
  margin-bottom: 24px;
`;

const AuthTabItem = styled(TabItem)`
  color: #ececec;
  padding: 12px 24px 12px 24px;
  margin: 0;
`;

let AuthForm = props => {
  const { handleSubmit } = props;
  console.log(props);
  return (
    <form onSubmit={handleSubmit}>
      <FormHeader>
        <img src={logo} alt="floriscopeLogo" />
        <div>Floriscope</div>
      </FormHeader>
      <AuthTabs>
        <AuthTabItem active>Connexion</AuthTabItem>
        <AuthTabItem>Créer un compte</AuthTabItem>
      </AuthTabs>
      <Field
        name="email"
        placeholder="Adresse électronique"
        type="email"
        logo={email}
        component={CustomInput}
      />
      <Field
        name="password"
        placeholder="Mot de passe"
        type="password"
        logo={lock}
        component={CustomInput}
      />
      <AuthButton type="submit">
        <div>Connexion</div>
      </AuthButton>
    </form>
  );
};
AuthForm = reduxForm({
  // a unique name for the form
  form: "authForm"
})(AuthForm);

export default AuthForm;
