import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Container, Segment, List, Button, Card } from "semantic-ui-react";

const Welcome = props => {
  return (
    <Container className="ui main">
      <Segment>

          <Header as="h1" >
            Welcome to debtCrusher, {props.currentUser ? props.currentUser.displayName : "User"}!
          </Header>

      </Segment>
      <Container className="ui container welcome">
        If you are a beta tester or just checking out the site, feel free to sign up and play around with the site. Everything is still in development so none of the payment forms are real. But everything works!
      </Container>
      <Segment>
        <Header as="h3">
          Here's how debtCrusher works:
        </Header>
        <p>
          As a student, we know you need help paying your student loans. There is too much student loan debt in the United States of America!
        </p>
        <p>
          When you sign up for debtCrusher, you can get help with your student loans! Here's how it works:
        </p>
        <List bulleted>
          <List.Item>Sign up for only $5!
          <List.List>
            <List.Item>That $5 goes into your <strong>donation pool</strong> which you can immediately give to other student's loan projects on debtCrusher.
              </List.Item>
            </List.List>
          </List.Item>
          <List.Item>Find people to back your student loans!
            <List.List><List.Item>When someone backs your student loan project, 90% of the money goes to your student loan, the other 10% goes back into your donation pool
              </List.Item>
            <List.Item>You decide which other students to give that 10% donation to!</List.Item>
          </List.List>
          </List.Item>
          <List.Item>In this way, <strong>ALL of the money</strong> gets paid forward.</List.Item>
        </List>
      </Segment>
      <Segment>
      <Header as="h3">debtCrusher doesn't get any money!</Header>
      </Segment>
      <Button as={ Link } to="/exploreProjects" className="ui green item">Click here to start helping students!</Button>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

export default connect(mapStateToProps)(Welcome);
