import { Button, Input, message, Tag } from 'antd'
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
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
  const [me, setMe] = useState(savedMe || '');
  const [signedIn, setSignedIn] = useState(false);
  const displayStatus = (payload) => {
    if (payload.msg){
      const { type, msg } = payload;
      const content = { content: msg, duration: 1.5 };
      switch(type){
        case 'success':
          message.success(content);
          console.log(msg);
          break;
        case 'error':
        default:
          message.error(content);
          break;
      }
    }
  }
  useEffect(() => {     
      if (signedIn)
        localStorage.setItem(LOCALSTORAGE_KEY, me);        
    }, [signedIn, me]);
  return (
    <Wrapper>
      {signedIn? 
      (<ChatRoom 
        me={me}
        displayStatus={displayStatus}
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
