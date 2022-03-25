import React, {useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageBackground, StyleSheet, View } from 'react-native';
import UserHomeStackScreen from '../stacks/UserHomeStackScreen';
import BoardListScreen from './BoardListScreen'
import ProfileScreen from '../screens/ProfileScreen';
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {styles} from '../styles/styles';



const UserHomeNavigatorScreen = props => {
  const isAdmin = true;
  const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator  
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          showLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: 'transparent',
            height: 90,
          },
          headerStyle:{ backgroundColor: 'transparent' },
          headerBackground: () => (
            <ImageBackground
              source={require('../assets/background_dot.png')}
              resizeMode="repeat"
              style={StyleSheet.absoluteFill}
            ></ImageBackground>
          ),
        }}>
        <Tab.Screen name="UserHomeStackScreen" component={UserHomeStackScreen} options={{
          tabBarIcon: ({focused, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} color={'#826cff'} size={size} />
          )
        }}/>
        <Tab.Screen name="BoardListScreen" component={BoardListScreen} options={{
          tabBarIcon: ({focused, size}) => (
            <Ionicons name={focused ? "time" : "time-outline"} color={'#826cff'} size={size} />
          )
        }}/>
        <Tab.Screen name="List" component={ProfileScreen} options={{
          tabBarIcon: ({focused, size}) => (
            <Ionicons name={focused ? "list" : "list-outline"} color={'#826cff'} size={size} />
          ),
        }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarIcon: ({focused, size}) => (
            <FontAwesome name={focused ? "user" : "user-o"} color={'#826cff'} size={size} />
          )
        }}/>

      </Tab.Navigator>
    );
}

export default UserHomeNavigatorScreen;
