import { Button, Input, message, Tag } from 'antd'
import useChat from '../Hooks/useChat.js';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from '../Components/Message.js';
import Title from '../Components/Title.js';
import ChatRoom from './ChatRoom.js';
import SignIn from './SIgnIn.js';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;
const LOCALSTORAGE_KEY = "save-me";
const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const { status, messages, sendMessage, clearMessages} = useChat();
  const [username, setUsername] = useState('');
  const [body, setBody] = useState(''); // textbody
  const [me, setMe] = useState(savedMe || '');
  const [signedIn, setSignedIn] = useState(false);
  const bodyRef = useRef(null);
  const displayStatus = (payload) => {
    if (payload.msg){
      const { type, msg } = payload;
      const content = { content: msg, duration: 0.5 };
      switch(type){
        case 'success': 
          message.success(content);
          break;
        case 'error': 
        default:
          message.error(content);
          break;
      }
    }
  }
  useEffect(() => {
      displayStatus(status)}, [status]);
  useEffect(() => {     
      if (signedIn)
        localStorage.setItem(LOCALSTORAGE_KEY, me);        
    }, [signedIn]);
  return (
    <Wrapper>
      {signedIn? 
      (<ChatRoom 
        me={me}
        messages={messages}
        sendMessage={sendMessage}
        clearMessages={clearMessages}
        username={username}
        setUsername={setUsername}
        body={body}
        setBody={setBody}
        bodyRef={bodyRef}
        displayStatus={displayStatus}
        signedIn={signedIn}
        setSignedIn={setSignedIn}
      />)
      : 
      (<SignIn
        me={me} 
        setMe={setMe} 
        setSignedIn={setSignedIn} 
        displayStatus={displayStatus}
      />)} 
    </Wrapper>
  )
}

export default App;
