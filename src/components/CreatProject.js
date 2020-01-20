import React, { Component } from "react";
import { connect } from "react-redux";
import { postProject } from "../store/actions/projects";
import {
  Form,
  Button,
  Header,
  Container,
  Grid,
  Segment,
  TextArea
} from "semantic-ui-react";

class CreateProject extends Component {
  state = {
    name: "",
    goal: 0,
    videoUrl: "",
    school: "",
    userId: this.props.currentUser.id,
    stripeId: "",
    description: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.postProject(this.state);
    this.setState({
      name: "",
      goal: 0,
      school: "",
      videoUrl: "",
      description: ""
    });
    this.props.history.push("/myProject");
  };

  handleChange = event => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
    console.log(this.state);
  };

  componentDidMount = () => {
    console.log(this.props.location.search);
    const codeWithState = this.props.location.search.split("=");
    console.log(codeWithState[1]);
    const code = codeWithState[1].split("&");
    console.log(code);
    const newCode = code[0];
    console.log(newCode);

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: newCode
      })
    };

    fetch("https://debt-crusher-backend.herokuapp.com/api/stripe/token", reqObj)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          stripeId: data.resp.stripe_user_id
        });
        console.log(this.state);
      });
  };

  render() {
    // console.log('this b the user', this.props.currentUser)
    // console.log('uri params', this.props.location.search)

    return (
      <Container className="ui main">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Header as="h2">
                  Fill out this form to create a loan project and get help.
                </Header>
              </Segment>
              <Form onSubmit={this.handleSubmit}>
                <Segment>
                  <Form.Field>
                    <label>
                      Title of Project / Loan (Why do you need help?)
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>How much is your loan?</label>
                    <input
                      type="text"
                      name="goal"
                      placeholder="goal"
                      value={this.state.goal}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>YouTube Video Link:</label>
                    <input
                      type="text"
                      name="videoUrl"
                      placeholder="YouTube Video Link"
                      value={this.state.videoUrl}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>What school do you attend?</label>
                    <input
                      type="text"
                      name="school"
                      placeholder="school"
                      value={this.state.school}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>
                      Write a short description about why you want help with
                      this loan?
                    </label>
                    <TextArea
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      required
                    />


                  </Form.Field>
                </Segment>
                <Button className="ui olive item" type="submit">
                  Submit
                </Button>
              </Form>
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

const mapDispatchToProps = dispatch => {
  return {
    postProject: project => dispatch(postProject(project))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
