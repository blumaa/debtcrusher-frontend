import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Image,
  Header,
  Container,
  Segment,
  Rail
} from "semantic-ui-react";

const MyProfile = props => {
  return (
    <>
    <Header as="h2" className="ui main">
      My Profile
    </Header>

    <Grid centered columns={2} padded divided className="ui main">
      <Grid.Column>
        <Header as="h2">
          <Image
            src={"http://localhost:8080/" + props.currentUser.userImage}
            size="small"
            floated="left"
          />
          {props.currentUser.displayName}
        </Header>
      </Grid.Column>
      <Grid.Column>
        <p>Bio: {props.currentUser.bio}</p>
        <p>Birth Date: {props.currentUser.birthDate}</p>
        <p>Account balance: {props.currentUser.accountBalance}</p>
        <p>
          Email:{" "}
          <a href="{props.currentUser.username}">
            {props.currentUser.username}
          </a>
        </p>
      </Grid.Column>
    </Grid>
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

export default connect(mapStateToProps)(MyProfile);
