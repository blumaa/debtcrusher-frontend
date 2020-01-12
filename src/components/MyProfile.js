import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Image, Header, Segment, Container, Icon } from "semantic-ui-react";
import MyProjectBackersList from "./MyProjectBackersList";
import MySecondaryProjectBackersList from "./MySecondaryProjectBackersList";
import FundOtherStudentsButton from "./FundOtherStudentsButton";
import EditUserButton from './EditUserButton'
import {
  Elements
} from "react-stripe-elements";



class MyProfile extends Component {
  // console.log('donation pool', this.props.currentUser.donationPool)
  donationPool(currentUser) {
    return (
        <Segment>
          <Header as="h3">Donation Pool</Header>
          <Header as="h5">
            You have ${this.props.currentUser.donationPool} in your donation
            pool to back projects with.
            {this.props.currentUser.donationPool > 0 ? (
              <Elements>
                <FundOtherStudentsButton currentUser={this.props.currentUser} />
              </Elements>
            ) : (
              "Get some more backers!"
            )}
          </Header>
          <Header as="h5">
            Through your project you are backing these projects:
          </Header>
          <MySecondaryProjectBackersList />
        </Segment>
    );
  }

  render() {
    // console.log(this.props.currentUser);
    return (
      <Container className="ui main">
        <Header as="h2">My Profile</Header>
        <Grid columns="equal" padded>
          <Grid.Row stretched>
            <Grid.Column floated="right">
              <Segment>
                <Image
                  src={
                    "http://localhost:8080/" + this.props.currentUser.userImage
                  }
                  size="small"
                  floated="left"
                />
                <Header as="h2">{this.props.currentUser.displayName}</Header>
                <p>Bio: {this.props.currentUser.bio}</p>
                <p>Birth Date: {this.props.currentUser.birthDate}</p>
                <p>Donation Pool: ${this.props.currentUser.donationPool}</p>
                <p>
                  Email:
                  <a href="{this.props.currentUser.username}">
                    {this.props.currentUser.username}
                  </a>
                </p>

                <EditUserButton user={this.props.currentUser}/>
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Grid padded celled="internally">
                {this.props.currentUser.project
                  ? this.donationPool(this.props.currentUser)
                  : ""}
                <Grid.Row>
                  <Segment>
                    <Header as="h3"> Projects you are backing:</Header>{" "}
                    <MyProjectBackersList />
                  </Segment>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

export default connect(mapStateToProps)(MyProfile);
