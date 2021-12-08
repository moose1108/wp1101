import { Button, Input, message, Tag } from 'antd'
import useChat from '../Hooks/useChat.js';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from '../Components/Message.js';
import Title from '../Components/Title.js';
import App from './App.js';
// const { messages, sendMessage, clearMessages, body, setBody, bodyRef, username, setUsername, displayStatus } = App;
const ChatRoom = ({ me, messages, sendMessage, clearMessages, body, setBody, bodyRef, username, setUsername, displayStatus }) => {

    return (
    <>
      <Title>
        <h1>{me}'s Chat Room</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </Title>
      <Message>
        {messages.length === 0 ? 
        (<p style={{ color: '#ccc' }}>No messages...</p>) 
        :
        (messages.map(({name, body}, i) => 
        (<p className="App-message" key={i}><Tag color="blue">{name}</Tag>{body}</p>)))}
      </Message>
      <Input.Search
        ref={bodyRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg){
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return;
          }
          sendMessage({ name : me, body : msg });
          setBody('');
        }}
      ></Input.Search>
    </>
  )
}

export default ChatRoom;
