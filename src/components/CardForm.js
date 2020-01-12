import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Segment,
  Container,
  Message,
  Dropdown
} from "semantic-ui-react";
import {
  CardElement,
  Elements,
  injectStripe,
  ReactStripeElements
} from "react-stripe-elements";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";

const handleBlur = () => {
  console.log("[blur]");
};
const handleChange = change => {
  console.log("[change]", change);
};
const handleClick = () => {
  console.log("[click]");
};
const handleFocus = () => {
  console.log("[focus]");
};
const handleReady = () => {
  console.log("[ready]");
};

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4"
        },
        padding
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
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
    console.log(billDetails);
    console.log(cardElement);

    this.props.stripe
      .createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billDetails
      })
      .then(({ paymentMethod, error }) => {
        console.log("Received Stripe PaymentMethod:", paymentMethod);
        console.log("Received Stripe error:", error);
        fetch("http://localhost:8080/api/stripe/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            amount: this.state.amount,
            stripeId: this.props.project.stripe_user_id,
            paymentMethod
          })
        })
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
    this.setState({ country: val });
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

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>
            When you donate money to{" "}
            {this.props.project.User ? this.props.project.User.displayName : ""}
            student's loan, 90% of that money will be committed to
          </label>
          <p>
            How much would you like to give
            {this.props.User ? this.props.project.User.displayName : ""} per
            month?
          </p>
          Amount:
          <div>
            <input
              type="radio"
              name="amount"
              value="10"
              onChange={this.handleChange}
              required
            />
            <label>$10</label>
          </div>
          <div>
            <input
              type="radio"
              name="amount"
              value="20"
              onChange={this.handleChange}
              required
            />
            <label>$20</label>
          </div>
          <div>
            <input
              type="radio"
              name="amount"
              value="30"
              onChange={this.handleChange}
              required
            />
            <label>$30</label>
          </div>
        </Form.Field>
        <Form.Field>
          <label>Billing Details</label>
          <Form.Group>
            <Form.Input
              label="First Name"
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              width={5}
              required
            />
            <Form.Input
              label="Last Name"
              type="text"
              name="lastName"
              width={5}
              value={this.state.lastName}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Email"
              type="text"
              name="email"
              width={5}
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="Phone Number"
              type="text"
              name="phoneNumber"
              width={5}
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Address"
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
              label="City"
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="State"
              type="text"
              name="state"
              value={this.state.state}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="Zip Code"
              type="text"
              name="zipCode"
              value={this.state.zipCode}
              onChange={this.handleChange}
              required
            />
            <CountryDropdown
          value={this.state.country}
          onChange={(val) => this.selectCountry(val)} />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <label>
            Card details
            <CardElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              {...createOptions(this.props.fontSize)}
            />
          </label>
          <Button>Pay</Button>
        </Form.Field>
      </Form>
    );
  }
}

export default injectStripe(_CardForm);
