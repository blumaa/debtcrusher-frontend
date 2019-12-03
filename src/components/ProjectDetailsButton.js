import React, { Component } from "react";
import {
  Button,
  Image,
  Modal,
  Container,
  Icon,
  Progress
} from "semantic-ui-react";
import FundButton from "./FundButton";

class ProjectDetailsButton extends Component {
  state = {
    open: false
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <>
        <Button onClick={this.show("blurring")}>Project Details</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>
            {this.props.proj.name}
            <Image
              src={"http://localhost:8080/" + this.props.proj.User.userImage}
              size="small"
              floated="left"
            />
          </Modal.Header>
          <Modal.Content>
            <Container>
              <p>
                Project Created By:
                {this.props.proj.User ? this.props.proj.User.displayName : null}
              </p>
              <p>
                This student needs ${this.props.proj.goal} to get an education
              </p>
              <p>
                <Icon name="money" />
                Total amount of backing money: ${this.props.total}
              </p>
                <Progress
                  percent={(this.props.total / this.props.proj.goal) * 100}
                  indicating
                />
              <div className="ui two buttons">
                <FundButton project={this.props.proj} />
              </div>
            </Container>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default ProjectDetailsButton;
