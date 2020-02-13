import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Header, Container, Card } from "semantic-ui-react";
import ProjectCard from "./ProjectCard";
import { fetchProjects } from "../store/actions/projects";


class ExploreProjects extends Component {
  componentDidMount = () => {
    this.props.fetchProjects();
  }


  render() {
    // console.log(this.props.history)
    const renderedProjects = this.props.projects.map(proj => {

      const projBackers = this.props.backers.filter(backer => {
        // console.log(backer);
        return backer.primaryProjectId == proj.id;
      });
      const backerMoneyArr = projBackers.map(backer => backer.amount);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const total = backerMoneyArr.reduce(reducer, 0);

      return (
        <ProjectCard
          key={proj.id}
          proj={proj}
          total={total}
          history={this.props.history}
        />
      );

    });
    console.log(renderedProjects);

    return (
      <Container className="ui explore">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Card fluid>
                <Card.Content textAlign="center">
                  <Header as="h2" className="ui blue item">Explore the projects. Help a student!</Header>
                </Card.Content>
              </Card>

            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid stackable columns={3} >
          <Grid.Row >
            {renderedProjects.length > 0
              ? renderedProjects
              : "There aren't any projects to fund yet"}
          </Grid.Row>
        </Grid>
      </Container>
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

    fetchProjects: () => dispatch(fetchProjects()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreProjects);
