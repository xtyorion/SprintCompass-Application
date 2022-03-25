import React, {useState} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BoardScreen from '../screens/BoardScreen';
import {primary10} from '../styles/styles'
import {View} from 'react-native'
import { Button, Headline, Provider, Menu, Divider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

const BoardListScreen = () => {
  const [visible, setVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [projectTitle, setProjectTitle] = useState("Projects");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarActiveTintColor: primary10,
      tabBarIndicatorStyle: primary10,
      tabBarStyle: {
        marginTop: 20,
        elevation: 0,
        backgroundColor: 'transparent',
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
      <Tab.Screen name="Open" component={BoardScreen} />
      <Tab.Screen name="Development" component={BoardScreen} />
      <Tab.Screen name="Testing" component={BoardScreen} />
      <Tab.Screen name="Closed" component={BoardScreen} />
    </Tab.Navigator>
  );
}

export default BoardListScreen;