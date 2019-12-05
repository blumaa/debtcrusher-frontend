import React from "react";
import { Card, Header, Container, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ProjectBackersList = props => {
  // console.log(props.project)
  let userBackers;
  if (props.project.projectBackers) {
    const filteredBackers = props.project.projectBackers.filter(
      backer => backer.primaryProjectId === props.project.id
    );
    // console.log(filteredBackers)
    userBackers = filteredBackers.map(backer => {
      const user = props.users.find(user => user.id === backer.backerId);
      if (backer.backerId === user.id) {
        return (
          <Card key={backer.id}>
            <Card.Content>
              <Card.Content as={Link} to={"/users/" + user.id}>
                {user.displayName}{" "}
              </Card.Content>
              donated $ {backer.amount}
            </Card.Content>
          </Card>
        );
      }
      return user;
    });
  }

  return (

      <Container>
        <Grid columns="equal" padded divided>
          <Grid.Row>
            <Header>People who are helping you with your loan:</Header>
            {props.project ? userBackers : "No one is helping you yet!"}
          </Grid.Row>
        </Grid>
      </Container>

  );
};

const mapStateToProps = state => {
  return {
    users: state.user.users
  };
};

export default connect(mapStateToProps)(ProjectBackersList);

/* console.log('this project', props.project)
console.log('project list users', props.users)
console.log('this projects backers', props.project.projectBackers)
const uniqueUsersAmount = props.users.map(user => {
  const uniqBackers = props.project.projectBackers.map(backer=> backer.backerId === user.id)
  console.log(uniqBackers)
  return uniqBackers
})
console.log(uniqueUsersAmount)
return(
  <Container className="ui main">
    Hello
    display each user and how much they are backing the project for
  </Container>
)
*/
