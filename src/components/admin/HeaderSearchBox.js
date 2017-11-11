import Headroom from "react-headroom";
import React from "react";
import { Toolbar } from "rebass-emotion";

class HeaderSearchBox extends React.Component {
  render() {
    return (
      <Headroom
        onPin={() => console.log("pinned")}
        onUnpin={() => console.log("unpinned")}
        style={{
          height: 70,
          background: "none",
          boxShadow: "0 3px 2px rgba(0,0,0,0.15)",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Toolbar
          px={2}
          style={{ backgroundColor: this.props.bgc, width: "100vw" }}
        >
          {this.props.children}
        </Toolbar>
      </Headroom>
    );
  }
}

export default HeaderSearchBox;
