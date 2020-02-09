import React from "react";
import { List } from "semantic-ui-react";

export default function Messages({ messages }) {
  console.log(messages);
  return (
    <List>
      {messages
        .flatMap((message, index) => [
          <List.Item key={index}>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{message.message}</List.Header>
              <List.Description>sender: {message.handle}</List.Description>
            </List.Content>
          </List.Item>
        ])
        }
    </List>
  );
}
