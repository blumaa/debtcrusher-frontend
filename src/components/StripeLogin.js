import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container
} from "semantic-ui-react";

class StripeLogin extends Component {

  connectToStripe = e => {
    console.log(this.props.history);
    window.open(
      `https://connect.stripe.com/express/oauth/authorize?redirect_uri=localhost:3000/createProject&client_id=ca_GHuiRPzrsA38adHU0qaRWViSQtTd0xxK&state=foovbhjgjhg`
    );
  };

  render() {
    return(
      <Button onClick={this.connectToStripe} className="ui main">Connect to Stripe</Button>
    )
  }
}

export default StripeLogin
