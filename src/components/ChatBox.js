import React from "react";
import MessageBox from './MessageBox'
import Messages from './Messages'
import useChat from './_useChat'

const ChatBox = () => {
  const { messages, sendMessage} = useChat()
  return (
    <div className="messages">
      <Messages messages={messages}/>
      <MessageBox onSendMessage={message=> {
          console.log(message)
        sendMessage({message})
      }} />
    </div>
)
};

export default ChatBox;
