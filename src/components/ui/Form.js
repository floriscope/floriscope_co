import styled, { css } from "react-emotion";

import React from "react";

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
  font: 300 16px "Proxima Nova", sans-serif;
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

//@refactor: add CSS transition with CSSTranstionGroup or react-motion for input onFocus()
// see inspiration here: https://stackoverflow.com/questions/34269942/how-to-dynamically-add-class-to-parent-div-of-focused-input-field
// Give also a try to styled-system from @jxnblk: https://github.com/jxnblk/styled-system
// More details here: https://medium.com/@tkh44/emotion-ad1c45c6d28b

export class CustomInput extends React.Component {
  render() {
    return (
      <InputWrapper>
        <span>
          <img
            src={this.props.logo}
            alt="email"
            style={{
              position: "absolute",
              fontSize: 12,
              top: 10,
              left: 10
            }}
          />
        </span>
        <InputArea
          {...this.props.input}
          type={this.props.type}
          placeholder={this.props.placeholder}
        />
      </InputWrapper>
    );
  }
}
