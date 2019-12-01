import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { clearCurrentUser } from "../store/actions/users";
import mainLogo from "../images/dbCrush.png";
import { Image } from "semantic-ui-react";

const NavBar = props => {
  // console.log('navbar current user', props.currentUser)
  return (
    <div className="ui fixed inverted menu">
      <Image
        as={NavLink}
        to={"/welcome"}
        src={mainLogo}
        alt="debtCrusher"
        size="small"
      />

      {props.currentUser ? (
        <>
          <NavLink
            to="/login"
            className="blue item"
            onClick={() => {
              localStorage.removeItem("token");
              props.history.push("/login");
              props.clearCurrentUser();
            }}
          >
            Logout
          </NavLink>
          <NavLink to="/myProfile" className="olive item">
            {props.currentUser.username}
          </NavLink>
          <NavLink to="/myProject" className="violet item">
            My Project
          </NavLink>
          <NavLink to="/exploreProjects" className="blue item">
            Help a Student!
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/sign_up" className="blue item">
            Sign Up
          </NavLink>
          <NavLink to="/login" className="blue item">
            Login
          </NavLink>
        </>
      )}
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
