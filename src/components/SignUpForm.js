import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
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

  handleSubmit = async () => {
    const user = this.state;
    console.log("user", user);
    const reqObj = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(user)
    };
    const resp = await fetch("http://localhost:8080/api/signup", reqObj);
    const data = await resp.json();
    console.log(data);
    this.props.history.push('/')
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    console.log(this.state);
  };

  validatePassword = () => {
    const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regEx.test(this.state.password);
  };

  matchPasswords = () => {
    return this.state.password === this.state.passwordConfirm;
  };

  render() {
    const passwordsMatch =
      this.state.password === this.state.passwordConfirm
        ? "Passwords match"
        : "Passwords MUST match";

    return (
      <>
        <Form
          onSubmit={()=>this.props.signUpUser(this.state, this.props.history)}
          onChange={this.handleChange}
          className="ui main"
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
            value={this.state.displayNname}
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
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: (user, history) => dispatch(signUpUser(user, history))
  }
}

export default connect(null, mapDispatchToProps)(SignUpForm);
