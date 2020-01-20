import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Card,
  Header,
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
      <Container className="ui main">

      <Grid stretched>
        <Grid.Row>
          <Grid.Column>
            <Card>
              <Card.Content>

                <Header as="h3">Before you create a loan project, you need to connect to Stripe so that your project can receive payments. After you connect to Stripe you will be redirected back to debtCrusher.</Header>
              </Card.Content>
              <Card.Content textAlign="center">

                <Button onClick={this.connectToStripe} className="ui blue item">Connect to Stripe</Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    )
  }
}

export default StripeLogin
