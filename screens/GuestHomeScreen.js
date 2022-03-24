import React from 'react';
import { Button, Headline, Paragraph } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {styles} from '../styles/styles';

const GuestHomeScreen = (props) => {
  return (
    <Background>
      <Logo />
      <Headline>SprintCompass Application</Headline>
  
      <Paragraph>
        One Application to replace them all
      </Paragraph>
      <Button style={styles.button} mode="contained" onPress={() => props.navigation.navigate('LoginScreen')}>
        Login
      </Button>
      <Button
        style={styles.button}
        mode="outlined"
        onPress={() => props.navigation.navigate('SignupScreen')}
      >
        Sign Up
      </Button>
    </Background>
  );
}

export default GuestHomeScreen;
