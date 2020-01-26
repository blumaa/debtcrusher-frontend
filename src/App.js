import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import NavBar from "./components/NavBar";
import ExploreProjects from "./components/ExploreProjects";
import MyProfile from "./components/MyProfile";
import CreateProject from "./components/CreatProject";
import StripeLogin from "./components/StripeLogin";
import StripeCheckout from "./components/StripeCheckout";
import MyProject from "./components/MyProject";
import ProfileShow from "./components/ProfileShow";
import SignUpForm from "./components/SignUpForm";
import LogInForm from "./components/LoginForm";
import Welcome from "./components/Welcome";
import style from "./index.css";
import { connect } from "react-redux";
import { authenticateUser } from "./store/actions/users";
import { fetchProjects } from "./store/actions/projects";
import { fetchBackers } from "./store/actions/projectBackers";
import { fetchUsers } from "./store/actions/users";
import { fetchSecondaryBackers } from "./store/actions/secondaryBacker";
import ParticleComponent from "../src/components/ParticleComponent";

class App extends Component {
  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      this.props.authenticateUser();
      this.props.fetchUsers();
      this.props.fetchProjects();
      this.props.fetchBackers();
      this.props.fetchSecondaryBackers();
    }
    // console.log("app mounted");
  };
  render() {
    return (
      <>
        <Router>
          <ParticleComponent />

          <div className="app">
            <Route exact path="/" component={Welcome} />
            <Route
              path="/"
              render={props => (
                <NavBar {...props} currentUser={this.props.currentUser} />
              )}
            />

            <Switch>
              <Route path="/welcome" component={Welcome} />
              <Route exact path="/sign_up" component={SignUpForm} />
              <Route exact path="/login" component={LogInForm} />

              {this.props.currentUser ? (
                <>
                  <Route exact path="/myProfile" component={MyProfile} />
                  <Route exact path="/myProject" component={MyProject} />

                  <Route exact path="/stripeLogin" component={StripeLogin} />
                  <Route
                    exact
                    path="/createProject"
                    component={CreateProject}
                  />
                  <Route
                    exact
                    path="/exploreProjects"
                    component={ExploreProjects}
                  />

                  <Route
                    exact
                    path="/stripeCheckout"
                    component={StripeCheckout}
                  />

                  <Route exact path="/users/:id" component={ProfileShow} />
                </>
              ) : (
                <Route exact path="/login" component={LogInForm} />
              )}
            </Switch>
          </div>
        </Router>
      </>
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
    authenticateUser: token => dispatch(authenticateUser(token)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchProjects: () => dispatch(fetchProjects()),
    fetchBackers: () => dispatch(fetchBackers()),
    fetchSecondaryBackers: () => dispatch(fetchSecondaryBackers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
