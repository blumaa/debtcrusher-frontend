import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  // const [essages, setEssages] = useState([])
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = socketIOClient(
      "https://debt-crusher-backend.herokuapp.com/"
    );

    socketRef.current.on("newChatMessage", ({ message }) => {
      console.log(message);
      setMessages(messages => [...messages, message]);
    });

    socketRef.current.on("typing", ({data}) => {
      // console.log(data);
      // setEssages(data)
      // setEssages((essages)=>[...essages, data])
    });

    // setTimeout(()=> {
    //   socketRef.currenct.disconnect()
    // }, 2000)
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = ({ message }) => {
    console.log(message);
    socketRef.current.emit("newChatMessage", { message });
  };

  const sendTyping = (data) => {
    console.log(data);
    socketRef.current.emit('typing', data)
  };

  return { messages, sendMessage, sendTyping };
};

export default useChat;
