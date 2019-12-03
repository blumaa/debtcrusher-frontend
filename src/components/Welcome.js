import React from "react";
import { connect } from "react-redux";
import { Header, Container } from "semantic-ui-react";

const Welcome = props => {
  return (
    <Container style={{ marginTop: "6.1em" }}>
      <Header as="h1" className="ui main">
        Welcome to debtCrusher, {props.currentUser.displayName}!
      </Header>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

export default connect(mapStateToProps)(Welcome);
