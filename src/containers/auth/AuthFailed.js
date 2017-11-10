import React from "react";

const styles = {
  errorsContainer: {
    margin: 12,
    color: "black",
    background: "red",
    width: "300px",
    borderRadius: "2px",
    boxShadow: "0 0 40px 4px #111118",
    display: "block"
  },
  header: {
    marginBottom: 12
  }
};

const AuthFailed = ({ message, children }) => {
  return <div style={styles.errorsContainer}>{message.toString()}</div>;
};

export default AuthFailed;
