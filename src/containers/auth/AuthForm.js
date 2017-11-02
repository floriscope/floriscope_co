import { Field, reduxForm } from "redux-form";
import React, { Component } from "react";
import styled, { css } from "react-emotion";

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

const InputWrapper = styled("div")`
  height: 40px;
  position: relative;
  background: #f1f1f1;
  border-radius: 3px;
  border: 1px solid #f1f1f1;
  margin: 10px;
  padding-left: 40px;
`;
const InputLogo = styled("span")`
  height: 40px;
  position: absolute;
  width: 40px;
  padding: 10px;
  color: #171a1f;
`;

const InputArea = styled("input")`
  box-sizing: border-box;
  width: 100%;
  padding: 0;
  border-width: 0;
  background: white;
  padding: 12px;
  position: relative;
  height: 38px;
  border: 0;
  right: 0;
  font-size: 13px;
  border-radius: 0 2px 2px 0;
  color: rgba(0, 0, 0, 0.87);
  & :focus {
    outline: none;
  }
`;

const CustomInput = props => (
  <InputWrapper>
    <div style={{ position: "relative", display: "inline" }}>
      <InputLogo>L</InputLogo>
      <InputArea
        name={props.name}
        type={props.inputType}
        value={props.content}
        onChange={props.controlFunc}
        placeholder={props.placeholder}
      />
    </div>
  </InputWrapper>
);

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
      <AuthTabs>Auth Tabs</AuthTabs>
      <Field
        name="email"
        type="email"
        component={props => (
          <CustomInput
            name="email"
            type="email"
            placeholder="Adresse électronique"
            value={{ val: props.value }}
            onChange={param => props.onChange(param.val)}
          />
        )}
      />
      <Field
        name="password"
        type="password"
        component={password => (
          <div>
            <label>Password</label>
            <input type="text" {...password} />
            {password.touched &&
              password.error && <span className="error">{password.error}</span>}
          </div>
        )}
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
