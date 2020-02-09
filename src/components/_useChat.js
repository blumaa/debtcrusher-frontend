import { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'

const useChat = () => {
  const [messages, setMessages ]= useState([])
  const socketRef = useRef()
  useEffect(()=>{
    socketRef.current = socketIOClient('https://debt-crusher-backend.herokuapp.com/')

    socketRef.current.on('newChatMessage', ({message})=> {
      console.log(message)
      setMessages(messages=> [...messages, message])
    })

    // setTimeout(()=> {
    //   socketRef.currenct.disconnect()
    // }, 2000)
    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  const sendMessage = ({message}) => {
    console.log(message)
    socketRef.current.emit('newChatMessage', {message})
  }

  return { messages, sendMessage}

}

export default useChat
