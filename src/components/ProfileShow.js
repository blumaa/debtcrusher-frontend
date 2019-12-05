import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Image, Header, Container, Segment } from "semantic-ui-react";
import ProjectCard from "./ProjectCard";
import { fetchUsers } from "../store/actions/users";


class ProfileShow extends Component {

  componentDidMount = () => {
    this.props.fetchUsers();
  }

  renderUserInfo(user){
    return(
      <>
      <Image
        src={"https://debt-crusher.herokuapp.com/" + user.userImage}
        size="small"
        floated="left"
      />
      <Header as="h2">{user.displayName}</Header>
      <p>Bio: {user.bio}</p>
      <p>Birth Date: {user.birthDate}</p>
      <p>
        Email: <a href="{this.props.currentUser.username}">{user.username}</a>
      </p>
    </>
    )

  }

  renderProjectCard(project){
    const projBackers = this.props.backers.filter(backer => {
      // console.log(backer);
      return backer.primaryProjectId == project.id;
    });
    const backerMoneyArr = projBackers.map(backer => backer.amount);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = backerMoneyArr.reduce(reducer, 0);

    return(
      <ProjectCard proj={project} total={total} />
    )
  }

  render() {
  // console.log(this.props.match.params.id)
    const user = this.props.users.find(user => {
      return user.id === parseInt(this.props.match.params.id);
    });
    // console.log(user)
    const project = this.props.projects.find(proj => proj.id === user.project.id);

    // console.log(user)

    return (
      <Container className="ui main">
        <Header as="h2">My Profile</Header>
        <Grid columns="equal" padded>
          <Grid.Column>
            <Segment>
            { user ?
              this.renderUserInfo(user)
            :
            <h3> Loadin </h3>
            }
</Segment>
          </Grid.Column>
          <Grid.Column>
            { project ? this.renderProjectCard(project) : <h3>loading</h3>}
          </Grid.Column>
        </Grid>
      </Container>
    );
};
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    users: state.user.users,
    backers: state.projectBackers.backers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileShow);
