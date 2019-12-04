import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MyProjectBackersList extends Component {
  myBackers(filteredBackers){
    return filteredBackers.map(backer => {
      console.log(backer)
    const proj = this.props.projects.find(
      proj => proj.id === backer.primaryProjectId
    );
    console.log(proj)
    const user = this.props.users.find(user => user.id === proj.userId);
    console.log(user)
    return (
      <Card key={backer.id}>
        <Card.Content>
          You are backing the project <strong>{proj.name}</strong> created by
          <Link as={Link} to={"/users/" + user.id}>
            {user.displayName}
          </Link>
          for <strong>${backer.amount}</strong>.
        </Card.Content>
      </Card>
    );
  });
}

  render() {
    const filteredBackers = this.props.allBackers.filter(
      backer => backer.backerId === this.props.currentUser.id
    );
    console.log(filteredBackers);
    return (
      <>
        {filteredBackers.length > 0 ? this.myBackers(filteredBackers) : (<Button as={ Link} to={'/exploreProjects'}>Help a student!</Button>) }
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    allBackers: state.projectBackers.backers,
    users: state.user.users,
    currentUser: state.user.currentUser,
    projects: state.projects.projects
  };
};

export default connect(mapStateToProps)(MyProjectBackersList);
