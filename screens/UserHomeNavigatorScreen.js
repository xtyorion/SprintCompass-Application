import React from 'react';
import { Button, Headline, Paragraph } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {styles} from '../styles/styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UserHomeScreen from './UserHomeScreen';
import LikesListScreen from './LikesListScreen';
import MessageListScreen from './MessageListScreen';
import ProfileScreen from './ProfileScreen';


const UserHomeNavigatorScreen = props => {
  const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator  
      screenOptions={{
        headerShown: false
      }}>
          <Tab.Screen name="Home" component={UserHomeScreen}/>
          <Tab.Screen name="Likes" component={LikesListScreen}/>
          <Tab.Screen name="Messages" component={MessageListScreen}/>
          <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
}

export default UserHomeNavigatorScreen;