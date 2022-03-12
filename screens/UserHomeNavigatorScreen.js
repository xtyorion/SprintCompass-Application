import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import UserHomeScreen from './UserHomeScreen';
import LikesListScreen from './LikesListScreen';
import MessageListScreen from './MessageListScreen';
import ProfileScreen from './ProfileScreen';
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const UserHomeNavigatorScreen = props => {
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
          }
        }}>
        <Tab.Screen name="Home" component={UserHomeScreen} options={{
          tabBarIcon: ({focused, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} color={'#826cff'} size={size} />
          ),
        }}/>
        <Tab.Screen name="Likes" component={LikesListScreen} options={{
          tabBarIcon: ({focused, size}) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} color={'#826cff'} size={size} />
          )
        }}/>
        <Tab.Screen name="Messages" component={MessageListScreen} options={{
          tabBarIcon: ({focused, size}) => (
            <Ionicons name={focused ? "mail-open" : "mail-outline"} color={'#826cff'} size={size} />
          )
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