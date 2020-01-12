import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Grid,
  Card,
  Image,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createSecondaryBacker } from "../store/actions/secondaryBacker";
import { Elements, injectStripe } from "react-stripe-elements";

class FundOtherStudentsButton extends Component {
  state = {
    open: false,
    donationPool: this.props.currentUser.donationPool,
    amount: 0,
    userId: this.props.currentUser.id,
    projectId: 0,
    stripeId: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("https://debt-crusher-backend.herokuapp.com//api/stripe/secondaryCheckout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: this.state.amount,
        stripeId: this.state.stripeId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log("secondary payment completed");

      });
      this.props.createSecondaryBacker({
        amount: this.state.amount,
        userId: this.state.userId,
        projectId: this.state.projectId
      });
    this.setState({
      open: false,
      donationPool: 0,
      amount: 0,
      projectId: 0,
      userId: 0,
      stripeId: ""
    });
  };

  handleChange = e => {
    console.log(e.target.dataset.stripeid);
    const name = e.target.name;
    this.setState({
      [name]: parseInt(e.target.value),
      projectId: parseInt(e.target.id),
      stripeId: e.target.dataset.stripeid
    });
    console.log(this.state);
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    const allProjects = this.props.projects;

    const projectOptions = allProjects.map(proj => {
      const projBackers = this.props.backers.filter(backer => {
        // console.log(backer);
        return backer.primaryProjectId == proj.id;
      });
      const backerMoneyArr = projBackers.map(backer => backer.amount);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const total = backerMoneyArr.reduce(reducer, 0);

      // console.log('fund other students button', proj)
      console.log(proj.stripe_user_id);
      return (
        <Form.Field key={proj.id}>
          <Grid.Row>
            <Card>
              <Card.Content>
                Project Created By:
                <Card.Content
                  as={Link}
                  to={proj.User ? "/users/" + proj.User.id : ""}
                >
                  {proj.User ? proj.User.displayName : null}
                </Card.Content>
              </Card.Content>
              <Card.Content extra>
                <Image
                  floated="right"
                  size="small"
                  src={"https://debt-crusher-backend.herokuapp.com/" + proj.User.userImage}
                />
                <Card.Header>{proj.name}</Card.Header>
                <Card.Description>
                  This student needs ${proj.goal} to get an education
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Icon name="money" />
                Total amount of backing money: ${total}
              </Card.Content>
            </Card>
          </Grid.Row>
          <Grid.Row>
            <input
              type="radio"
              name="amount"
              id={proj.id}
              data-stripeid={proj.stripe_user_id}
              value={this.state.donationPool}
              onChange={this.handleChange}
            />
            <label>Donate to {proj.name}</label>
          </Grid.Row>
        </Form.Field>
      );
    });
    console.log(this.props);

    return (
      <>
        <Button color="pink" onClick={this.show("blurring")}>
          Fund other students projects
        </Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>
            You have ${this.state.donationPool} in your donation pool to back
            projects with.{" "}
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              {projectOptions}
              <Button
                type="submit"
                positive
                icon="checkmark"
                labelPosition="right"
                content="Submit"
              />
            </Form>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    backers: state.projectBackers.backers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createSecondaryBacker: secondaryBacker =>
      dispatch(createSecondaryBacker(secondaryBacker))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundOtherStudentsButton);
