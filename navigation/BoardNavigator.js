import React, {useState, useEffect} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BoardScreen from '../screens/BoardScreen';
import {primary10} from '../styles/styles';
import {getLogs} from '../store/LogReducer'
import { connect } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const BoardNavigator = (props) => {
  const [visible, setVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [projectTitle, setProjectTitle] = useState("Projects");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(()=>{
    props.dispatch(getLogs(props.Project.currentProject.id));
  },[]);


  return (
    <Tab.Navigator 
    screenOptions={{
      swipeEnabled: false,
      tabBarActiveTintColor: primary10,
      tabBarIndicatorStyle: primary10,
      tabBarStyle: {
        top: -10,
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
const mapStateToProps = (state) => {
  const { Project, Log } = state
  return { Project, Log }
};

export default connect(mapStateToProps)(BoardNavigator);