import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Image,
  Header
} from "semantic-ui-react";
import ProjectCard from './ProjectCard'

const ProfileShow = props => {
  // console.log(props.match.params.id)
  // console.log(props.users)
  const user = props.users.find(user=> {
    console.log(user)
    return user.id === parseInt(props.match.params.id)
  })
  // console.log(user)
  const project = props.projects.find(proj=> proj.id === user.project.id)
  const projBackers = props.backers.filter(backer => {
    // console.log(backer);
    return backer.primaryProjectId == project.id;
  });
  const backerMoneyArr = projBackers.map(backer => backer.amount);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = backerMoneyArr.reduce(reducer, 0);

  // console.log(user)

  return (
    <Grid centered columns={2} padded divided className="ui main">
      <Grid.Column>

          <Image
            src={"http://localhost:8080/" + user.userImage}
            size="small"
            floated="left"
          />
        <Header as="h2">
        {user.displayName}
        </Header>
        <p>Bio: {user.bio}</p>
        <p>Birth Date: {user.birthDate}</p>
        <p>
          Email:{" "}
          <a href="{props.currentUser.username}">
            {user.username}
          </a>
        </p>
      </Grid.Column>
      <Grid.Column>
        <ProjectCard proj={project} total={total}/>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    users: state.user.users,
    backers: state.projectBackers.backers
  };
};

export default connect(mapStateToProps)(ProfileShow);
