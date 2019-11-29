import React from "react";
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'


const MyProjectBackersList = props => {

  let myBackers;
  if (props.allBackers) {
    const filteredBackers = props.allBackers.filter(backer=> backer.backerId === props.currentUser.id)
    // console.log('filtered backers', filteredBackers)

    myBackers = filteredBackers.map(backer => {
      // console.log(backer)
      const proj = props.projects.find(proj => proj.id === backer.primaryProjectId);
      const user = props.users.find(user=> user.id === proj.userId)
      // console.log(proj)
        return (
          <Card key={backer.id}>
            <Card.Content>
              You are backing the project <strong>{proj.name}</strong> created by <Link as={Link} to={'/users/' + user.id}>{user.displayName}</Link> for <strong>${backer.amount}</strong>.
            </Card.Content>
          </Card>
        );
    });
    // console.log(myBackers)
  }

  return (
    <>
      {myBackers ? myBackers : "You aren't backing any projects"}
    </>
  );
};

const mapStateToProps = state => {
  return {
    allBackers: state.projectBackers.backers,
    users: state.user.users,
    currentUser: state.user.currentUser,
    projects: state.projects.projects
  };
};

export default connect(mapStateToProps)(MyProjectBackersList);
