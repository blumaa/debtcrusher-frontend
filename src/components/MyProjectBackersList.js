import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MyProjectBackersList extends Component {
  myBackers(filteredBackers, allProjects, allUsers){
    return filteredBackers.map(backer => {
      // console.log(backer)
    const proj = allProjects.find(
      proj => proj.id === backer.primaryProjectId
    );

    // if (!proj){
    //   console.log('FOOBAR  BAZ')
    //   return (
    //     <Card key={backer.id}>
    //       <Card.Content>
    //        invalid card
    //       </Card.Content>
    //     </Card>
    //   );
    // }
    const user = allUsers.find(user => user.id === proj.userId);
    return (
      <Card key={backer.id}>
        <Card.Content>
          You are backing the project <strong>{proj ? proj.name : ""}</strong> created by
          <Link as={Link} to={"/users/" + user.id}>
            {user.displayName}
          </Link>
          for <strong>${backer.amount}</strong>.
        </Card.Content>
      </Card>
    );
  });
}

fetchSuccesful(){
  const filteredBackers = this.props.allBackers.filter(
    backer => backer.backerId === this.props.currentUser.id
  );
  const allProjects = this.props.projects
  const allUsers = this.props.users
  return filteredBackers.length > 0 && allProjects.length > 0 && allUsers.length > 0
}

  render() {

    const filteredBackers = this.props.allBackers.filter(
      backer => backer.backerId === this.props.currentUser.id
    );

    const allProjects = this.props.projects
    const allUsers = this.props.users

    // console.log(filteredBackers);
    return (
      <>
        { this.fetchSuccesful() ? this.myBackers(filteredBackers, allProjects, allUsers) : (<Button as={ Link} to={'/exploreProjects'} className="ui green item">Help a student!</Button>) }
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
