import React from 'react';
import { Button, Headline, Paragraph } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {styles} from '../styles/styles';

const LikesListScreen = (props) => {
  return (
    <Background>
      <Logo />
      <Headline>Likes List</Headline>
  
     
    </Background>
  );
}

export default LikesListScreen;