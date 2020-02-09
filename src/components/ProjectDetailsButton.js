import React, { Component } from "react";
import {
  Button,
  Image,
  Modal,
  Container,
  Icon,
  Progress,
  Grid
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
    const avatars = ["debtCrusher1", "debtCrusher2", "debtCrusher3"];

    return (
      <>
        <Button onClick={this.show("blurring")}>Project Details</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>
            <Grid columns={2}>
              <Grid.Row stretched>
                <Grid.Column width={2}>
                  <Image
                    src={
                      "https://api.adorable.io/avatar/" +
                      avatars[Math.floor(Math.random() * avatars.length)]
                    }
                    size="mini"
                    circular
                  />
                </Grid.Column>
                <Grid.Column > {this.props.proj.name}</Grid.Column>
              </Grid.Row>
            </Grid>
            {/*<Image
              src={"https://debt-crusher-backend.herokuapp.com/" + this.props.proj.User.userImage}
              size="small"
              floated="left"
            />*/}
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
                {this.props.proj.funded === true ? (
                  <Button className="ui olive item">
                    THIS PROJECT HAS BEEN FUNDED!
                  </Button>
                ) : (
                  <FundButton project={this.props.proj} />
                )}
              </div>
            </Container>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default ProjectDetailsButton;
