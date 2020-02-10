import React, { Component } from "react";
import {
  Segment,
  TransitionablePortal,
} from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import ChatBox from './ChatBox'


const transitions = ["fly up"];
// const options = transitions.map(name => ({
//   key: name,
//   text: name,
//   value: name
// }));

export default class Chat extends Component {
  state = { animation: transitions[0], duration: 500, open: false };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleClick = () => this.setState(prevState => ({ open: !prevState.open }));

  render() {
    const { animation, duration, open } = this.state;

    return (
      <>
        <button
          className="chat-help-button"
          onClick={this.handleClick}
        >
        <div className="fab-container">
          <div className="fab-icon-holder">
            <i><FontAwesomeIcon icon={faComment} /></i>

          </div>
        </div>
        </button>

        <TransitionablePortal open={open} transition={{ animation, duration }}>
          <Segment
            style={{
              position: "fixed",
              bottom: 60,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: "rgb(244, 85, 195)",
              backgroundColor: 'rgb(203, 241, 246)',
              height: 'auto',
              right: 65,
              zIndex: 1,
              boxShadow: "0px 5px 20px rgb(110, 110, 110)",
              overflow: 'hidden',

            }}
          >
            <ChatBox />
          </Segment>
        </TransitionablePortal>
      </>
    );
  }
}
