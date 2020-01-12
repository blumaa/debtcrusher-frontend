import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { postProjectBacker } from "../store/actions/projectBackers";
import {
  CardElement,
  Elements,
  injectStripe,
  ReactStripeElements
} from "react-stripe-elements";
import CardForm from "./CardForm";

class FundButton extends Component {
  state = {
    open: false,
    amount: 0
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handleSubmit = (amount) => {
    console.log(this.props.history);
    console.log(amount);


    this.props.backProject(
      this.props.user.currentUser.id,
      this.props.project.id,
      amount,
      this.props.project.User.id,
      this.props.project.stripe_user_id,
      this.props.history
    );
    // this.props.history.push("/stripeCheckout");
    this.setState({
      open: false,
      amount: 0
    });
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    const { open, dimmer } = this.state;
    // console.log(this.props.history);
    // console.log(this.props.project);

    return (
      <>
        <Button color="pink" onClick={this.show("blurring")}>
          Help This Student
        </Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Help this student!</Modal.Header>
          <Modal.Content></Modal.Content>
          <Modal.Content>
            <Elements>
              <CardForm
                project={this.props.project}
                handleSubmit={this.handleSubmit}
                user={this.props.user}
                history={this.props.history}
              />
            </Elements>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    backProject: (backerId, projectId, amount, userId, stripeId, history) =>
      dispatch(
        postProjectBacker(
          backerId,
          projectId,
          amount,
          userId,
          stripeId,
          history
        )
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FundButton);
