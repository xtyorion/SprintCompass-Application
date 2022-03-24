import React from 'react';
import { Button, Headline, Paragraph } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {styles} from '../styles/styles';

const TimeListScreen = (props) => {
  return (
    <Background>
      <Logo />
      <Headline>Time Board</Headline>
    </Background>
  );
}

export default TimeListScreen;
