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
  Segment,
  Divider
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
      const totalHelpToOtherProjects = total * .1
      // console.log(backerMoneyArr);
      // console.log(total);
      // console.log(projBackers);
      /* <iframe width="560" height="315" src="https://www.youtube.com/embed/lZJjygOli78" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */
      console.log(userProject.video_url)
      const vidSplit1 = userProject.video_url.split("=")
      console.log(vidSplit1)
      const vidSplit2 = vidSplit1[1].split("&")
      console.log(vidSplit2)
      console.log(userProject.description)
      console.log(userProject.goal)
      console.log(userProject.current_goal)
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

                    <Segment>

                      <Grid columns="equal" verticalAlign='middle' >
                        <Grid.Row>
                          <Grid.Column>
                            <iframe width="255" height="160" src={"https://www.youtube.com/embed/" + vidSplit2[0]} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                          </Grid.Column>
                          <Grid.Column>
                            <Card.Description className="card description">Total student loan debt: <Header className="ui red item">${userProject.goal}</Header></Card.Description>
                          </Grid.Column>
                        </Grid.Row>

                      </Grid>
                    </Segment>
                    <div className="card title">{userProject.name}</div>
                    <Divider />
                    <Card.Description className="card description">
                      {userProject.description}
                    </Card.Description>
                  </Card.Content>

                  <Card.Content extra textAlign="center">
                    <Segment>
                      <Card.Description className="card description">I only need ${userProject.current_goal} to reach my goal!</Card.Description>

                    <Progress
                      percent={(total / userProject.goal) * 100}
                      indicating
                    />
                  <Icon name="money" />
                  Total amount of backing money: ${total}
                  </Segment>
                  </Card.Content>
                  <Card.Content extra textAlign="center">

                    People helping this loan are also giving ${totalHelpToOtherProjects} to other student's loans.
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
          <Grid stackable stretched>
            <Grid.Row>
              <Card>
                <Card.Content>
                  <Header as="h3">
                    You don't have a Student Loan Project. Would you like to create
                    one?
                  </Header>
                  </Card.Content>
                  <Card.Content textAlign="center">
                  <Button as={Link} to="/stripeLogin" className="ui blue item">
                    Get Help With a Loan
                  </Button>

                </Card.Content>
              </Card>
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
