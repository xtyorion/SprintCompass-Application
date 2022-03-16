import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageBackground, StyleSheet } from 'react-native';
import UserHomeScreen from './UserHomeScreen';
import LikesListScreen from './LikesListScreen';
import ProfileScreen from './ProfileScreen';
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MessengerStackScreen from './MessengerStackScreen';


const UserHomeNavigatorScreen = props => {
  const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator  
        screenOptions={{
          headerShown: true,
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
          )
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
        <Tab.Screen name="Messages" component={MessengerStackScreen} options={{
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