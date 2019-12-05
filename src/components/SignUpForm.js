import React, { Component } from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";
import { connect } from 'react-redux'
import { signUpUser } from '../store/actions/users'

class SignUpForm extends Component {
  state = {
    username: "",
    displayName: "",
    birthDate: "",
    bio: "",
    password: "",
    passwordConfirm: ""
  };


  handleChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });

  };

  validatePassword = () => {
    const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regEx.test(this.state.password);
  };

  matchPasswords = () => {
    return this.state.password === this.state.passwordConfirm;
  };

  connectToStripe = e => {
    console.log(this.props.history);
    window.open(
      `https://connect.stripe.com/express/oauth/authorize?redirect_uri=localhost:3000/myProfile&client_id=ca_GHuiRPzrsA38adHU0qaRWViSQtTd0xxK&state=foovbhjgjhg`
    );
  };

  // connectToStripe = e => {
  //   console.log(this.props.history);
  //   window.open(
  //     `https://connect.stripe.com/express/oauth/authorize?redirect_uri=localhost:3000/sign_up&client_id=ca_32D88BD1qLklliziD7gYQvctJIhWBSQ7&state={STATE_VALUE}}`
  //   );
  // };


  render() {
    const passwordsMatch =
      this.state.password === this.state.passwordConfirm
        ? "Passwords match"
        : "Passwords MUST match";

    return (
      <Container style={{ marginTop: '6.1em' }}>
        <Header as="h2">Sign Up for debtCrusher!</Header>
        {/* <Button onClick={this.connectToStripe}>Connect to Stripe</Button>*/} 

        <Form
          onSubmit={(e)=>this.props.signUpUser(e,this.state, this.props.history)}
          onChange={this.handleChange}
        >
          <Form.Input
            label="Email"
            type="email"
            name="username"
            id="username-field"
            value={this.state.username}
            required
          />
          <Form.Input
            label="Display Name"
            type="text"
            name="displayName"
            value={this.state.displayName}
            id="display-name-field"
            required
          />
          <Form.Input
            label="Birth Date"
            name="birthDate"
            id="birth-date-field"
            value={this.state.birthDate}
            type="text"
            required
          />
          <Form.Input
            label="User Image"
            name="userImage"
            id="user-image"
            type="file"
            required
          />
          <Form.TextArea
            label="Bio"
            name="bio"
            id="bio-field"
            value={this.state.bio}
            required
          />
          <Form.Input
            label="Enter Password"
            name="password"
            type="password"
            id="password-field"
            value={this.state.password}
            required
          />
          <Form.Input
            label={passwordsMatch}
            name="passwordConfirm"
            type="password"
            id="confirm-password-field"
            value={this.state.passwordConfirm}
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
    signUpUser: (e,user, history) => dispatch(signUpUser(e,user, history))
  }
}

export default connect(null, mapDispatchToProps)(SignUpForm);
