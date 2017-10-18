import { Button, Form } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

import { Input } from "semantic-ui-redux-form-fields";
import React from "react";

const FormItem = Form.Item;

let LoginForm = props => {
  const { handleSubmit } = props;
  console.log(props);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Field
          name="email"
          component={Input}
          required={true}
          type="email"
          placeholder="Email"
        />
      </Form.Field>
      <Form.Field>
        <Field
          name="password"
          component={Input}
          type="password"
          placeholder="Mot de passe"
        />
      </Form.Field>
      <Button primary type="submit">
        Me connecter
      </Button>
    </Form>
  );
};
LoginForm = reduxForm({
  // a unique name for the form
  form: "loginForm"
})(LoginForm);

export default LoginForm;
