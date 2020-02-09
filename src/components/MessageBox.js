import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";

const MessageBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [handle, setHandle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(message, handle);
    const mess = { message: message, handle: handle };
    onSendMessage(mess);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field
        label="Handle"
        id="handle"
        name="handle"
        control={Input}
        type="text"
        value={handle}
        onChange={e => setHandle(e.target.value)}
      />
    <Form.Field
        label="Message"
        id="message"
        name="message"
        control={Input}
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default MessageBox;
