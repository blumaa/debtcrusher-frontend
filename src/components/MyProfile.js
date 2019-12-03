import React from "react";
import { connect } from "react-redux";
import { Grid, Image, Header, Segment } from "semantic-ui-react";
import MyProjectBackersList from "./MyProjectBackersList";
import MySecondaryProjectBackersList from "./MySecondaryProjectBackersList";
import FundOtherStudentsButton from "./FundOtherStudentsButton";

const MyProfile = props => {
  // console.log('donation pool', props.currentUser.donationPool)

  return (
    <>
    <Header as="h2" className="ui main">
      My Profile
    </Header>
    <Grid columns="equal" padded>
      <Grid.Row stretched>
        <Grid.Column floated="right">
          <Segment>
              <Image
                src={"http://localhost:8080/" + props.currentUser.userImage}
                size="small"
                floated="left"
              />
            <Header as="h2">
              {props.currentUser.displayName}
            </Header>
            <p>Bio: {props.currentUser.bio}</p>
            <p>Birth Date: {props.currentUser.birthDate}</p>
            <p>Donation Pool: ${props.currentUser.donationPool}</p>
            <p>
              Email:
              <a href="{props.currentUser.username}">
                {props.currentUser.username}
              </a>
            </p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Grid padded celled="internally">
              <Grid.Row>
                <Segment>
                  <Header as="h3">Donation Pool</Header>
                  <Header as="h5">
                    You have ${props.currentUser.donationPool} in your donation
                    pool to back projects with.
                    {props.currentUser.donationPool > 0 ?
                    (<FundOtherStudentsButton currentUser={props.currentUser}/>)
                    :
                    ("Get some more backers!")
                    }
                  </Header>
                  <Header as="h5">
                    Through your project you are backing these projects:
                  </Header>
                  <MySecondaryProjectBackersList />
                </Segment>
              </Grid.Row>
              <Grid.Row>
                <Segment>
                <Header as="h3"> Projects you are backing:</Header> <MyProjectBackersList />
                </Segment>
              </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
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
