import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects } from "../store/actions/projects";
import { Button, Card, Image, Icon, Grid } from "semantic-ui-react";
import ProjectBackersList from "./ProjectBackersList";

class MyProject extends Component {
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
          <Grid columns="equal" padded divided className="ui main">
            <Grid.Row stretched>
              <Grid.Column>
                <Card>
                  <Card.Content extra>
                    <Image
                      floated="right"
                      size="small"
                      src={"http://localhost:8080/" + this.props.currentUser.userImage}
                    />
                    <Card.Header>{userProject.name}</Card.Header>
                    <Card.Description>
                      This student needs ${userProject.goal} to get an education
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="money" />
                    Total amount of backing money: ${total}
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <ProjectBackersList project={userProject} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
      );
    } else {
      return (
        <>
          <Button as={Link} to="/createProject" className="ui main">
            Get Help With a Loan
          </Button>
        </>
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
