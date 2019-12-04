import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { postProjectBacker } from "../store/actions/projectBackers";

class FundButton extends Component {
  state = {
    open: false,
    amount: 0
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handleSubmit = () => {
    // console.log(this.props);
    this.props.backProject(
      this.props.user.currentUser.id,
      this.props.project.id,
      this.state.amount,
      this.props.project.User.id
    );
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

    return (
      <>
        <Button color="pink" onClick={this.show("blurring")}>
          Help This Student
        </Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Help this student!</Modal.Header>
          <Modal.Content></Modal.Content>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>
                  When you donate money to{" "}
                  {this.props.project.User
                    ? this.props.project.User.displayName
                    : ""}
                  student's loan, 90% of that money will be committed to
                </label>
                <p>
                  How much would you like to give
                  {this.props.User
                    ? this.props.project.User.displayName
                    : ""}{" "}
                  per month?
                </p>
                Amount:
                <div>
                  <input
                    type="radio"
                    name="amount"
                    value="10"
                    onChange={this.handleChange}
                  />
                  <label>$10</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="amount"
                    value="20"
                    onChange={this.handleChange}
                  />
                  <label>$20</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="amount"
                    value="30"
                    onChange={this.handleChange}
                  />
                  <label>$30</label>
                </div>
              </Form.Field>
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
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    backProject: (backerId, projectId, amount, userId) =>
      dispatch(postProjectBacker(backerId, projectId, amount, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FundButton);
