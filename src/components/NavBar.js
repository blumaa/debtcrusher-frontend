import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { clearCurrentUser } from "../store/actions/users";
import squareLogo from "../images/debtCrusherSquare.png";
import mainLogo from "../images/debtCrusherWide.png";
import {
  Container,
  Image,
  Menu,
} from "semantic-ui-react";

const NavBar = props => {
  // console.log('navbar current user', props.currentUser)
  return (
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
          <Menu.Item header position="right">
            <Image
              as={NavLink}
              to={"/welcome"}
              src={mainLogo}
              alt="debtCrusher"
              size="small"
            />
          </Menu.Item>
      </Menu>
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
