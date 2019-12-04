import React from "react";
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'


const MySecondaryProjectBackersList = props => {
  // console.log(props.secondaryBackers)
  let secondaryBackers;
  if (props.secondaryBackers) {
    const filteredBackers = props.secondaryBackers.filter(backer=> backer.secondaryBackerId === props.currentUser.id)
    // console.log('filtered backers', filteredBackers)

    secondaryBackers = filteredBackers.map(backer => {
      // console.log(backer)
      const proj = props.projects.find(proj => proj.id === backer.secondaryProjectId);
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
      {secondaryBackers ? secondaryBackers : "You aren't backing any projects"}
    </>
  );
};

const mapStateToProps = state => {
  return {
    allBackers: state.projectBackers.backers,
    users: state.user.users,
    currentUser: state.user.currentUser,
    projects: state.projects.projects,
    secondaryBackers: state.secondaryBackers.secondaryBackers
  };
};

export default connect(mapStateToProps)(MySecondaryProjectBackersList);
