import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { clearCurrentUser } from "../store/actions/users";
import mainLogo from "../images/debtCrusherPS.png";
import { Image, Menu, Icon } from "semantic-ui-react";
import Chat from "./Chat";




const NavBar = props => {
  // console.log('navbar current user', props.currentUser)
  return (
    <>
      <Menu fixed="top" inverted>
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
              <Icon name="user" />
              {props.currentUser.username}
            </Menu.Item>
            <Menu.Item as={NavLink} to="/myProject" className="violet item">
              <Icon name="money" />
              My Project
            </Menu.Item>
            <Menu.Item as={NavLink} to="/exploreProjects" className="blue item">
              <Icon name="search" />
              Help a Student!
            </Menu.Item>
            <Menu.Item as={NavLink} to={"/welcome"} className="grey item">
              <Icon name="info circle" />
              Info
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
        <Menu.Item position="right">
          <Image
            as={NavLink}
            to={"/welcome"}
            src={mainLogo}
            alt="debtCrusher"
            size="tiny"
          />
        </Menu.Item>
        <Chat />


        {/*<Button id="chat-help-button"><Icon name='chat' /></Button>*/}
      </Menu>
    </>
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
