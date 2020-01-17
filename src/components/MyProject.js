import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects } from "../store/actions/projects";
import {
  Button,
  Card,
  Image,
  Icon,
  Grid,
  Header,
  Container,
  Progress,
  Segment
} from "semantic-ui-react";
import ProjectBackersList from "./ProjectBackersList";

class MyProject extends Component {
  state = { percent: 0 };

  connectToStripe = e => {
    console.log(this.props.history);
    window.open(
      `https://connect.stripe.com/express/oauth/authorize?redirect_uri=localhost:3000/myProfile&client_id=ca_GHuiRPzrsA38adHU0qaRWViSQtTd0xxK&state=foovbhjgjhg`
    );
  };


  render() {
    // console.log(this.props.currentUser);
    // console.log(this.props.projects)
    const userProj = this.props.projects.filter(
      proj => proj.userId === this.props.currentUser.id
    );
    const userProject = userProj[0];
    // console.log(userProject);

    if (userProject) {
      const projBackers = this.props.backers.filter(backer => {
        // console.log(backer);
        return backer.primaryProjectId == userProject.id;
      });
      const backerMoneyArr = projBackers.map(backer => backer.amount);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const total = backerMoneyArr.reduce(reducer, 0);

      // console.log(backerMoneyArr);
      // console.log(total);
      // console.log(projBackers);

      return (
        <Container className="ui main">

          <Grid columns="equal" padded stackable>
            {/* <Grid.Row stretched>
              <Button onClick={this.connectToStripe}>Connect to Stripe</Button>
            </Grid.Row>*/}
            <Grid.Row>
              <Grid.Column>
                <Card fluid>
                  <Card.Content>
                    <Header as="h2">My Project</Header>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content textAlign="center">
                    <Segment><iframe width="255" height="160" src="https://www.youtube.com/embed/lZJjygOli78" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Segment>
                    <Card.Header>{userProject.name}</Card.Header>
                    <Card.Description>
                      This student needs ${userProject.goal} to get an education
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="money" />
                    Total amount of backing money: ${total}
                    <Progress
                      percent={(total / userProject.goal) * 100}
                      indicating
                    />
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <ProjectBackersList project={userProject} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
    } else {
      return (
        <Container className="ui main">
          <Grid stackable>
            <Grid.Row>
              <Header as="h2" className="ui main">
                You don't have a Student Loan Project. Would you like to create
                one?
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Button as={Link} to="/stripeLogin">
                Get Help With a Loan
              </Button>
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    users: state.user.users,
    projects: state.projects.projects,
    backers: state.projectBackers.backers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: () => dispatch(fetchProjects())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProject);
