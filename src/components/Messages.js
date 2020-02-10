import React from "react";
import { List, Container, Header } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

export default function Messages({ messages }) {
  console.log(messages);
  return (
    <List style={{maxHeight: 300, overflowY: 'auto'}}>
      {messages.flatMap((message, index) => [
        <List.Item
          key={index}
          style={{
            backgroundColor: "#fff",
            padding: 4,
            borderRadius: 5,
            margin: 3,
            boxShadow: "0px 2px 10px rgb(110, 110, 110)"
          }}
        >
          <List.Content>
            <FontAwesomeIcon
              style={{ fontSize: "2em" }}
              icon={faUserAstronaut}
            />
            <List.Header>{message.message}</List.Header>
            <List.Description>from: {message.handle}</List.Description>
          </List.Content>
        </List.Item>
      ])}
    </List>
  );
}
