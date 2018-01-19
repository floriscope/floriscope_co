import Headroom from "react-headroom";
import React from "react";
import { Toolbar } from "rebass-emotion";

class HeaderSearchBox extends React.Component {
  state = {
    searchActive: false,
    filterActive: false
  };
  render() {
    return (
      <Toolbar
        px={2}
        style={{
          backgroundColor: this.props.bgc,
          width: "100vw",
          position: "sticky",
          top: 0,
          height: 70,
          boxShadow: "0 3px 2px rgba(0,0,0,0.15)",
          display: "flex",
          justifyContent: "center"
        }}
      >
        {this.props.children}
      </Toolbar>
    );
  }
}

export default HeaderSearchBox;
