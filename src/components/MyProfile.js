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
        <Card fluid>
          <Card.Content>
            <Header as="h2">My Donation Pool</Header>
          </Card.Content>
        </Card>

        <Card fluid>
          <Card.Content>
            <Header as="h5">
              You have ${this.props.currentUser.donationPool} in your donation
              pool to back projects with.
            </Header>
            <Segment textAlign="center">
              {this.props.currentUser.donationPool > 0 ? (
                <Elements>
                  <FundOtherStudentsButton
                    currentUser={this.props.currentUser}
                  />
                </Elements>
              ) : (
                "Get some more backers!"
              )}
            </Segment>
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
    const avatars = ['debtCrusher1', 'debtCrusher2', 'debtCrusher3']
    return (
      <Container className="ui main">
        <Grid stackable columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Card fluid>
                <Card.Content>
                  <Header as="h2">My Profile</Header>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Grid stretched>
                    <Grid.Row>
                      <Grid.Column>
                        <Card fluid>
                          <Card.Content textAlign="center">
                            <Image
                              src={"https://api.adorable.io/avatar/" + avatars[Math.floor(Math.random() * avatars.length)] }
                              size="small"
                              circular
                            />

                          {/*<Image
                              src={
                                "https://debt-crusher-backend.herokuapp.com/" +
                                this.props.currentUser.userImage
                              }
                              size="small"
                            />*/}
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Card fluid>
                          <Card.Content textAlign="center">
                            <Header as="h2">
                              {this.props.currentUser.displayName}
                            </Header>
                            <p>Bio: {this.props.currentUser.bio}</p>
                            <p>
                              Birth Date: {this.props.currentUser.birthDate}
                            </p>
                            <p>
                              Donation Pool: $
                              {this.props.currentUser.donationPool}
                            </p>
                            <p>
                              Email:
                              <a href="{this.props.currentUser.username}">
                                {this.props.currentUser.username}
                              </a>
                            </p>
                            <EditUserButton user={this.props.currentUser} />
                          </Card.Content>
                        </Card>
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
              <Card fluid>
                <Card.Content>
                  <Header as="h2"> Projects you are backing:</Header>{" "}
                </Card.Content>
              </Card>

              <Card fluid>
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
