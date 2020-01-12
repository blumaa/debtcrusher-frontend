import React, { Component } from "react";
import { Button, Form, Container, Header, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { signUpUser } from "../store/actions/users";
import Calendar from 'react-input-calendar'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class SignUpForm extends Component {

    state = {
      username: "",
      displayName: "",
      birthDate: new Date(),
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

  handleBirthDateChange = date => {
    this.setState({
      birthDate: date
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
      `https://connect.stripe.com/express/oauth/authorize?redirect_uri=localhost:3000/success&client_id=ca_GHuiRPzrsA38adHU0qaRWViSQtTd0xxK&state=foovbhjgjhg`
    );
  };

  render() {
    console.log(this.matchPasswords)

    const passwordsMatch =
      this.state.password === this.state.passwordConfirm
        ? "Passwords match"
        : "Passwords MUST match";

    return (
      <Container style={{ marginTop: "6.1em" }}>
        <Header as="h2">Sign Up for debtCrusher!</Header>
        {/* <Button onClick={this.connectToStripe}>Connect to Stripe</Button> */}

        <Form
          onSubmit={e => {
            if (this.state.password === this.state.passwordConfirm) {
            this.props.signUpUser(e, this.state, this.props.history)
          } else {
            toast.error("Error: passwords don't match !", {
              position: toast.POSITION.TOP_LEFT
            });
            console.log('error: passwords must be the same')
          }
            }
          }
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
          <Form.Field required>
            <label>Birth Date</label>
              <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={this.state.birthDate}
                showYearDropdown
                dropdownMode="select"
                isClearable
                onChange={this.handleBirthDateChange}
                placeholderText="Click to select a date"

              />
          </Form.Field>
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
        {this.matchPasswords ? <Button type="submit">Submit</Button> : <Button type="submit" disabled>Submit</Button> }
        <ToastContainer />
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: (e, user, history) => dispatch(signUpUser(e, user, history))
  };
};

export default connect(null, mapDispatchToProps)(SignUpForm);
