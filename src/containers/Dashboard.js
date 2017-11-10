import styled, { css } from "react-emotion";

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

const Container = styled("div")`background: #333;`;
const myStyle = css`color: rebeccapurple;`;

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <p className={myStyle}>Dashboard with Emotion styles</p>
        </Container>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(Dashboard));
