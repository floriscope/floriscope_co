import { Icon, Input, Label } from "semantic-ui-react";

import React from "react";

export default function SemanticReduxFormField({
  input,
  label,

  meta: { touched, error, warning },
  as: As = Input,
  ...props
}) {
  function handleChange(e, { value }) {
    return input.onChange(value);
  }
  const errorMessage = (
    <div style={{ color: "#E20000", paddingTop: ".3rem", fontSize: "12px" }}>
      <Icon name="warning" />
      {error}
    </div>
  );
  return (
    <div>
      <As
        labelPosition="left"
        {...input}
        value={input.value}
        {...props}
        onChange={handleChange}
        error={touched && error}
      >
        <Label>
          <Icon name={props.labelIcon} />
        </Label>
        <input />
      </As>
      {touched && (warning && <span>{warning}</span>) && error && errorMessage}
    </div>
  );
}
