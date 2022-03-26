import React, {useState, useEffect} from 'react';
import { Button, Headline, Provider, Menu, Divider } from 'react-native-paper';
import { View, Text } from 'react-native';
import Background from '../components/Background';
import {styles} from '../styles/styles';
import Logo from '../components/Logo';

const UserHomeScreen = (props) => {


  return (
    <Background>
      <View style={styles.container}>
      <Headline>Dashboard!</Headline>
      <Logo />
      </View>
    </Background>
  );
}

export default UserHomeScreen;
