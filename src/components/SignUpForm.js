import React, { Component } from "react";
import {
  Button,
  Form,
  Container,
  Header,
  Segment,
  Image,
  Grid
} from "semantic-ui-react";
import { connect } from "react-redux";
import { signUpUser } from "../store/actions/users";
// import Calendar from 'react-input-calendar'
import DatePicker from "react-datepicker";
// import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainLogo from "../images/debtCrusherPS.png";

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
    console.log(this.matchPasswords);

    const passwordsMatch =
      this.state.password === this.state.passwordConfirm
        ? "Passwords match"
        : "Passwords MUST match";

    return (
      <Container className="sign-up-form">
        <div className="wrapper">
          <Image
            src={mainLogo}
            alt="debtCrusher"
            size="medium"
            id="main-logo"
          />
        </div>
        <Segment style={{width: '98%'}}>
          <Header as="h2">Sign Up for debtCrusher!</Header>
        </Segment>
        <Form
          onSubmit={e => {
            if (this.state.password === this.state.passwordConfirm) {
              this.props.signUpUser(e, this.state, this.props.history);
            } else {
              toast.error("Error: passwords don't match !", {
                position: toast.POSITION.TOP_LEFT
              });
              console.log("error: passwords must be the same");
            }
          }}
          onChange={this.handleChange}
        >
          <Grid style={{ width: "100%" }} columns={2}>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  type="email"
                  name="username"
                  id="username-field"
                  value={this.state.username}
                  required
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Display Name"
                  type="text"
                  name="displayName"
                  value={this.state.displayName}
                  id="display-name-field"
                  required
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header as="h4">Profile Picture</Header>
                  <Form.Input
                    name="userImage"
                    id="user-image"
                    type="file"
                    required
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Form.Field required>
                  <Segment>
                    <Header as="h4">Birth Date</Header>
                    <DatePicker
                      placeholder="Birth Date"
                      dateFormat="yyyy-MM-dd"
                      selected={this.state.birthDate}
                      showYearDropdown
                      dropdownMode="select"
                      isClearable
                      onChange={this.handleBirthDateChange}
                      placeholderText="Click to select a date"
                    />
                  </Segment>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ width: "100%" }}>
                <Form.TextArea
                  fluid
                  placeholder="Write a short bio for yourself"
                  name="bio"
                  id="bio-field"
                  value={this.state.bio}
                  required
                  style={{ borderRadius: "10px" }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header as="h4">Enter Password</Header>
                <Form.Input
                  name="password"
                  type="password"
                  id="password-field"
                  value={this.state.password}
                  required
                />
                              </Segment>

              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Header as="h4">Confirm Password</Header>


                <Form.Input
                  name="passwordConfirm"
                  type="password"
                  id="confirm-password-field"
                  value={this.state.passwordConfirm}
                  required
                />
              </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {this.matchPasswords ? (
                  <Button type="submit" inverted secondary>
                    Submit
                  </Button>
                ) : (
                  <Button type="submit" disabled>
                    Submit
                  </Button>
                )}
                <ToastContainer />
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
