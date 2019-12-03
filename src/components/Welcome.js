import React from 'react'
import { connect } from 'react-redux'
import { Header } from "semantic-ui-react";


const Welcome = (props) => {
  return(
    <Header as="h1" className="ui main">
      Welcome to debtCrusher {props.currentUser.displayName}!
    </Header>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(Welcome)
