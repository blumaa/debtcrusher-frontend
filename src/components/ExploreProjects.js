import React from "react";
import { connect } from "react-redux";
import { Grid, Header } from "semantic-ui-react";
import ProjectCard from "./ProjectCard";

const ExploreProjects = props => {
  const renderedProjects = props.projects.map(proj => {
    const projBackers = props.backers.filter(backer => {
      // console.log(backer);
      return backer.primaryProjectId == proj.id;
    });
    const backerMoneyArr = projBackers.map(backer => backer.amount);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = backerMoneyArr.reduce(reducer, 0);

    return <ProjectCard key={proj.id} proj={proj} total={total} />;
  });
  return (
    <div className="ui main">
      <Grid columns={3}>
        <Header>Help a student!</Header>
        <Grid.Row>{renderedProjects}</Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    backers: state.projectBackers.backers
  };
};
export default connect(mapStateToProps)(ExploreProjects);
