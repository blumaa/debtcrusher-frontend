import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import { loginUser } from "../store/actions/users";
import { connect } from "react-redux";
import mainLogo from "../images/debtCrusherPS.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <>
        <Grid style={{ marginTop: "40px" }}>
          <Grid.Row stretched>
            <Grid.Column>
              <Image src={mainLogo} alt="debtCrusher" size="large" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid textAlign="center">
          <Grid.Row>
            <Grid.Column style={{ width: "50%", textAlign: "center" }}>
              <Segment>
                <Header as="h3" color="blue" textAlign="center">
                  Log-in to your account
                </Header>
              </Segment>
              <Form
                size="large"
                onSubmit={() =>
                  this.props.loginUser(this.state, this.props.history)
                }
                onChange={this.handleChange}
              >
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  type="email"
                  name="username"
                  id="email-field"
                  required
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  name="password"
                  type="password"
                  id="password-field"
                  required
                />

                <Button color="green" fluid size="large">
                  Login
                </Button>
              </Form>
              <Message>
                New to us? <a href="/sign_up">Sign Up</a>
              </Message>
              <ToastContainer autoClose={2000} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (user, history) => dispatch(loginUser(user, history))
  };
};

export default connect(null, mapDispatchToProps)(LogInForm);
