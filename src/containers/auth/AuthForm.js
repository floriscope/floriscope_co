import { Field, reduxForm } from "redux-form";
import React, { Component } from "react";
import styled, { css } from "react-emotion";

import { CustomInput } from "../../components/ui/Form";
import email from "../../assets/images/email.svg";
import lock from "../../assets/images/lock.svg";

const FormHeader = styled("div")`
  display: block;
  background: #ececec;
  height: 118px;
  text-align: center;
  padding: 12px;
  color: #333;
  & img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  & div {
    color: black;
  }
`;

const AuthTabs = styled("div")`
  box-shadow: 0 1px 0 0 rgba(92, 102, 111, 0.2);
  color: black;
  font-size: 18px;
  height: 40px;
  margin-bottom: 10px;
`;

let AuthForm = props => {
  const { handleSubmit } = props;
  console.log(props);
  return (
    <form onSubmit={handleSubmit}>
      <FormHeader>
        <img
          src="https://vegebase-assets-production.s3.amazonaws.com/avatars/profile/40/avatarpic-1495206608.png"
          alt="floriscopeLogo"
        />
        <div>Floriscope</div>
      </FormHeader>
      <AuthTabs>auth-tabs</AuthTabs>
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
      <button type="submit">Submit</button>
    </form>
  );
};
AuthForm = reduxForm({
  // a unique name for the form
  form: "authForm"
})(AuthForm);

export default AuthForm;
