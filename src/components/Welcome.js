import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Header,
  Container,
  Segment,
  List,
  Button,
  Grid,
  Icon,
  Image
} from "semantic-ui-react";
import mainLogo from "../images/debtCrusherPS.png";

const Welcome = props => {
  // console.log(props.currentUser)
  return (
    <>

      <Container className="ui main">
        <div className="wrapper">
          <Image src={mainLogo} alt="debtCrusher" size="medium" id='main-logo'  />
        </div>
        <Segment raised>
          <Header as="h1">
            Welcome to debtCrusher,{" "}
            {props.currentUser ? props.currentUser.displayName : "User"}!
          </Header>
        </Segment>
        <Segment raised>
          <Grid verticalAlign="middle">
            <Grid.Row>
              <Grid.Column textAlign="center" width={1}>
                <Icon name="exclamation circle" size="large"></Icon>
              </Grid.Column>
              <Grid.Column width={15}>
                <Container className="ui container welcome">
                  If you are a tester or just checking out the site, feel free
                  to sign up and play around with the site. Everything is still
                  in development so none of the payment forms are real. But
                  everything works.
                </Container>
                <Container className="ui container test-login">
                  If you don't want to sign up, you can login with the username:{" "}
                  <span style={{ color: "#ff00b8" }}>test@gmail.com</span> and
                  the password: <span style={{ color: "#ff00b8" }}>test</span>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment raised>
          <Header as="h3">Here's how debtCrusher works:</Header>
          <p>
            As a student, we know you need help paying your student loans. There
            is too much student loan debt in the United States.
          </p>
          <p>
            When you sign up for debtCrusher, you can get help with your student
            loans and you can help other students- at the ame time. Here's how
            it works:
          </p>
          <List bulleted>
            <List.Item>
              Sign up for only $5.
              <List.List>
                <List.Item>
                  That $5 goes into your <strong>donation pool</strong> which
                  you can immediately give to other student's loan projects on
                  debtCrusher.
                </List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              Find people to back your student loans (friends, family,
              strangers, businesses)
              <List.List>
                <List.Item>
                  When someone donates to your student loan, 90% of the money
                  goes to your student loan, the other 10% goes back into your
                  donation pool.
                </List.Item>
                <List.Item>
                  You decide which other students to give that 10% donation to.
                </List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              In this way, <strong>ALL of the money</strong> gets paid forward.
            </List.Item>
          </List>
        </Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="center">
              {props.currentUser ? (
                <Button
                  as={Link}
                  to="/exploreProjects"
                  className="ui green item"
                >
                  {" "}
                  <Header as="h3" inverted>
                    Click here to start helping students!
                  </Header>
                </Button>
              ) : (
                ""
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

export default connect(mapStateToProps)(Welcome);
