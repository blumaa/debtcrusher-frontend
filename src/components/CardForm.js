import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Segment,
  Header,
  Container
} from "semantic-ui-react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { CountryDropdown } from "react-country-region-selector";

const handleBlur = () => {
  console.log("[blur]");
};
const handleChange = change => {
  console.log("[change]", change);
};
const handleFocus = () => {
  console.log("[focus]");
};
const handleReady = () => {
  console.log("[ready]");
};

class _CardForm extends Component {
  state = {
    open: false,
    amount: 0,
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
    email: ""
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handleSubmit = ev => {
    ev.preventDefault();
    console.log(this.state.country);

    const cardElement = this.props.elements.getElement("card");
    const billDetails = {
      address: {
        city: this.state.city,
        country: this.state.country,
        line1: this.state.address,
        line2: null,
        postal_code: this.state.zipCode,
        state: this.state.state
      },
      email: this.state.email,
      name: this.state.firstName,
      phone: this.state.phoneNumber
    };
    // console.log(billDetails);
    // console.log(cardElement);

    this.props.stripe
      .createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billDetails
      })
      .then(({ paymentMethod, error }) => {
        console.log("Received Stripe PaymentMethod:", paymentMethod);
        console.log("Received Stripe error:", error);
        fetch(
          "https://debt-crusher-backend.herokuapp.com/api/stripe/checkout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              amount: this.state.amount,
              stripeId: this.props.project.stripe_user_id,
              paymentMethod
            })
          }
        )
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.status === "succeeded") {
              console.log("purchase completed");
            }
          });
        this.props.handleSubmit(this.state.amount);
      });
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  selectCountry = val => {
    // console.log(val);
    this.setState({ country: val });
    // console.log(this.state.country);
  };

  render() {
    // console.log(this.props);
    // console.log(this.props.project);
    // console.log(this.props.history);
    // console.log(this.props.user);
    //
    const createOptions = fontSize => {
      return {
        style: {
          base: {
            fontSize: "16px",
            color: "#7505ad",
            fontFamily:
              '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
            "::placeholder": {
              color: "#e23a19"
            }
          },
          invalid: {
            color: "#9e2146"
          }
        }
      };
    };

    const user = this.props.project.User;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Segment inverted style={{ backgroundColor: "teal" }}>
            <label>
              When you donate money to {user ? `${user.displayName}'s` : ""}{" "}
              student's loan, 90% of the money goes to{" "}
              {user ? `${user.displayName}'s` : ""} loan, then{" "}
              {user ? user.displayName : ""} decides to which student to give
              the other 10%. In this way, your money is helping lots of students
              on debtCrusher!
            </label>
          </Segment>
          <Segment>
            <Header>
              How much would you like to give {user ? user.displayName : ""}?
            </Header>
            <Form.Group inline required>
              <div style={{ padding: "20px" }}>
                <input
                  type="radio"
                  name="amount"
                  value="10"
                  onChange={this.handleChange}
                  required
                />
                <label style={{ marginLeft: "10px" }}>$10</label>
              </div>
              <div style={{ padding: "20px" }}>
                <input
                  type="radio"
                  name="amount"
                  value="20"
                  onChange={this.handleChange}
                  required
                />
                <label style={{ marginLeft: "10px" }}>$20</label>
              </div>
              <div style={{ padding: "20px" }}>
                <input
                  type="radio"
                  name="amount"
                  value="30"
                  onChange={this.handleChange}
                  required
                />
                <label style={{ marginLeft: "10px" }}>$30</label>
              </div>
            </Form.Group>
          </Segment>
        </Form.Field>
          <Segment>
            <Form.Field>
              <Header>Billing Details</Header>
              <Form.Group>
                <Form.Input
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  width={8}
                  required
                />
                <Form.Input
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  width={8}
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  width={8}
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
                <Form.Input
                  icon="phone"
                  iconPosition="left"
                  placeholder="Phone Number"
                  type="text"
                  name="phoneNumber"
                  width={8}
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  placeholder="Address"
                  type="text"
                  name="address"
                  width={8}
                  value={this.state.address}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  placeholder="City"
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                  required
                />
                <Form.Input
                  placeholder="State"
                  type="text"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChange}
                  required
                />

                <Form.Input
                  placeholder="Zip Code"
                  type="text"
                  name="zipCode"
                  value={this.state.zipCode}
                  onChange={this.handleChange}
                  required
                />
              <CountryDropdown
                  valueType="short"
                  value={this.state.country}
                  onChange={val => this.selectCountry(val)}
                  style={{width: "150px", marginLeft: '10px'}}
                />
              </Form.Group>
            </Form.Field>
          </Segment>
          <Segment>
            <Container className="ui container test-login">
              For testing purposes, you can enter the credit card number{" "}
              <span style={{ color: "#ff00b8" }}>4242424242424242</span>, the
              expiration date <span style={{ color: "#ff00b8" }}>04/24</span> and
              the CVC <span style={{ color: "#ff00b8" }}>42424</span>
            </Container>
          </Segment>
          <Segment>
            <Form.Field>
              <Header>Payment Information</Header>
              <CardElement
                className="StripeElement"
                style={{
                  base: {
                    iconColor: "#666EE8",
                    color: "#494949",
                    lineHeight: "40px",
                    fontSize: "16px",
                    fontSmoothing: "antialiased",
                    ":-webkit-autofill": {
                      color: "#fce883"
                    },

                    "::placeholder": {
                      color: "#CFD7E0"
                    }
                  }
                }}
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              />
            </Form.Field>
          </Segment>
          <Button>Pay</Button>
      </Form>
    );
  }
}

export default injectStripe(_CardForm);
