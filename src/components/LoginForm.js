import React, { Component } from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";
import { loginUser } from "../store/actions/users";
import { connect } from "react-redux";

class LogInForm extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    const name = event.target.name;
    const input = event.target.value;
    this.setState({
      [name]: input
    });
  };

  render() {

    return (
      <Container style={{ marginTop: '6.1em' }}>
      <Header as="h2">Login</Header>
      <Form
        onSubmit={() => this.props.loginUser(this.state, this.props.history)}
        onChange={this.handleChange}
      >
        <Form.Input
          label="Email"
          type="email"
          name="username"
          id="email-field"
          required
        />
        <Form.Input
          label="Enter Password"
          name="password"
          type="password"
          id="password-field"
          required
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (user, history) => dispatch(loginUser(user, history))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LogInForm);
