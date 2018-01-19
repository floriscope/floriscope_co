import { Box, Flex } from "rebass-emotion";
import { Field, reduxForm } from "redux-form";

import { Form } from "semantic-ui-react";
import React from "react";
import SemanticUiField from "../../components/forms/SemanticReduxFormField";

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);

class AdminImageEdit extends React.Component {
  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "calc(100vh - 70px)",
          background: "white",
          padding: "24px"
        }}
      >
        <Form>
          <Flex mx={-2}>
            <Box w={1 / 2} px={2}>
              <Field
                component={SemanticUiField}
                as={Form.Input}
                name="firstname"
                validate={[required, maxLength15]}
                placeholder="Email"
                labelIcon="at"
              />
            </Box>
            <Box w={1 / 2} px={2}>
              <Field
                component={SemanticUiField}
                as={Form.Input}
                name="lastname"
                validate={[required, maxLength15]}
                placeholder="Mot de passe"
                labelIcon="lock"
              />
            </Box>
            <Box w={1 / 2} px={2}>
              <Field
                component={SemanticUiField}
                as={Form.Checkbox}
                toggle
                name="ant-btn-icon-only"
              />
            </Box>
          </Flex>
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: "adminImageEditForm" })(AdminImageEdit);
