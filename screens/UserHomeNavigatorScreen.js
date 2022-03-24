import React, {useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Headline, Paragraph, Text } from 'react-native-paper';
import UserHomeScreen from './UserHomeScreen';
import TimeListScreen from './TimeListScreen';
import ProfileScreen from './ProfileScreen';
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MessengerStackScreen from './MessengerStackScreen';
import AdministratorStackScreen from './AdministratorStackScreen'
import { connect } from 'react-redux';
import { Set_Conversation } from '../store/actions';

import {styles} from '../styles/styles';



const UserHomeNavigatorScreen = props => {
  const isAdmin = true;
  const Tab = createBottomTabNavigator();
  const [headerRightMessage, setHeaderRightMessage] = useState(null);

  useEffect(() => {
    if (props.Conversation.currentConversation.id){
      setHeaderRightMessage(
        <View style={{flexDirection:"row"}}>
          <Button style={{...styles.messengerButton, backgroundColor: '#E74C3C'}} mode="contained" onPress={() => {}}>
            Block User
          </Button>
          <Button style={{...styles.messengerButton, backgroundColor: '#826cff', marginRight: 0}} mode="contained" onPress={() => {}}>
            Go to Date
          </Button>
        </View>
      )
    }
    else {
      setHeaderRightMessage(null);
    }
  }, [props.Conversation.currentConversation]);

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
          ),
        }}>
        <Tab.Screen name="Home" component={UserHomeScreen} options={{
          tabBarIcon: ({focused, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} color={'#826cff'} size={size} />
          ),
        }}/>
        <Tab.Screen name="Time" component={TimeListScreen} options={{
          tabBarIcon: ({focused, size}) => (
            <Ionicons name={focused ? "time" : "time-outline"} color={'#826cff'} size={size} />
          )
        }}/>
        <Tab.Screen name="List" component={MessengerStackScreen} options={{
          tabBarIcon: ({focused, size}) => (
            <Ionicons name={focused ? "list" : "list-outline"} color={'#826cff'} size={size} />
          ),
          headerRight: (nav) => (
            headerRightMessage
          ),
        }}
        listeners={{
          tabPress: e => {
              props.dispatch(Set_Conversation({}));
          },
        }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarIcon: ({focused, size}) => (
            <FontAwesome name={focused ? "user" : "user-o"} color={'#826cff'} size={size} />
          )
        }}/>
        {isAdmin &&
        <Tab.Screen name="Administrator" component={AdministratorStackScreen} options={{
          tabBarIcon: ({focused, size}) => (
            <Ionicons name="settings-outline" color={'#826cff'} size={size} />
          )
        }}/>
        }

      </Tab.Navigator>
    );
}

const mapStateToProps = (state) => {
  const { Conversation } = state
  return { Conversation }
};

export default connect(mapStateToProps)(UserHomeNavigatorScreen);
