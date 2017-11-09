import { Card, Container } from "rebass-emotion";
import React, { Component } from "react";
import styled, { css } from "react-emotion";

const AdminHomeContainer = styled("div")`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Admin extends Component {
  render() {
    return (
      <AdminHomeContainer>
        <Card>Admin Area</Card>
      </AdminHomeContainer>
    );
  }
}

export default Admin;
