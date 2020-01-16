import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Image,
  Header,
  Segment,
  Container,
  Icon,
  Card
} from "semantic-ui-react";
import MyProjectBackersList from "./MyProjectBackersList";
import MySecondaryProjectBackersList from "./MySecondaryProjectBackersList";
import FundOtherStudentsButton from "./FundOtherStudentsButton";
import EditUserButton from "./EditUserButton";
import { Elements } from "react-stripe-elements";

class MyProfile extends Component {
  // console.log('donation pool', this.props.currentUser.donationPool)
  donationPool(currentUser) {
    return (
      <>
      <Card>
        <Card.Content>
          <Header as="h2">My Donation Pool</Header>
        </Card.Content>
      </Card>

          <Card>
            <Card.Content>
        <Header as="h5">
          You have ${this.props.currentUser.donationPool} in your donation pool
          to back projects with.
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
      </Card.Content>
    </Card>
        </>
    );
  }

  render() {
    // console.log(this.props.currentUser);
    return (
      <Container className="ui main">
        <Grid columns="equal" >
          <Grid.Row>
            <Grid.Column>

              <Card>
                <Card.Content>

                  <Header as="h2">My Profile</Header>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Grid stretched>
                    <Grid.Row>
                      <Grid.Column>
                      <Image
                        src={
                          "https://debt-crusher-backend.herokuapp.com/" +
                          this.props.currentUser.userImage
                        }
                        size="small"
                        floated="left"
                        />

                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>

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
                        <EditUserButton user={this.props.currentUser} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column>

                {this.props.currentUser.project
                  ? this.donationPool(this.props.currentUser)
                  : ""}


            </Grid.Column>

            <Grid.Column>
              <Card>
                <Card.Content>
                  <Header as="h2"> Projects you are backing:</Header>{" "}
                </Card.Content>
              </Card>

              <Card>
                <Card.Content>
                  <MyProjectBackersList />

                </Card.Content>
              </Card>

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
