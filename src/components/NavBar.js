import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { clearCurrentUser } from "../store/actions/users";
import mainLogo from "../images/dbCrush.png";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";

const NavBar = props => {
  // console.log('navbar current user', props.currentUser)
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          {props.currentUser ? (
            <>
            <Menu.Item
              as={NavLink}
              to="/login"
              className="blue item"
              onClick={() => {
                localStorage.removeItem("token");
                props.history.push("/login");
                props.clearCurrentUser();
              }}
              >
              Logout
            </Menu.Item>
            <Menu.Item as={NavLink} to="/myProfile" className="olive item">
              {props.currentUser.username}
            </Menu.Item>
              <Menu.Item as={NavLink} to="/myProject" className="violet item">
                My Project
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                to="/exploreProjects"
                className="blue item"
                >
                Help a Student!
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item as={NavLink} to="/sign_up" className="blue item">
                Sign Up
              </Menu.Item>
              <Menu.Item as={NavLink} to="/login" className="blue item">
                Login
              </Menu.Item>
            </>
          )}
        </Container>
        <Container>
          <Menu.Item as="a" header position="right">
            <Image
              as={NavLink}
              to={"/welcome"}
              src={mainLogo}
              alt="debtCrusher"
              size="small"
            />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCurrentUser: () => dispatch(clearCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
