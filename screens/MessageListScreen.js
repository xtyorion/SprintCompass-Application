import React from 'react';
import { Button, Headline, Paragraph } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {styles} from '../styles/styles';

const MessageListScreen = (props) => {
  return (
    <Background>
      <Logo />
      <Headline>Message List</Headline>
  
     
    </Background>
  );
}

export default MessageListScreen;