import React, { useState } from "react";
import { Form, Button, Input, Segment } from "semantic-ui-react";

const MessageBox = ({ onSendMessage, onSendTyping }) => {
  const [message, setMessage] = useState("");
  const [handle, setHandle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(message, handle);
    const mess = { message: message, handle: handle };
    onSendMessage(mess);
    setMessage("");
  };

  const handleChange = e => {
    const name = e.target.name;
    if (name === "message") {
      setMessage(e.target.value);
    } else if (name === "handle") {
      setHandle(e.target.value);
    }
    // this.setState({
    //   [name]: e.target.value
    // });
  };

  return (
    <Segment style={{ borderRadius: 10, }}>
      <Form onSubmit={handleSubmit}>
        <Form.Field
          label="Handle"
          id="handle"
          name="handle"
          control={Input}
          type="text"
          value={handle}
          onChange={handleChange}
        />
        <Form.Field
          label="Message"
          id="message"
          name="message"
          control={Input}
          type="text"
          value={message}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Segment>
  );
};

export default MessageBox;
