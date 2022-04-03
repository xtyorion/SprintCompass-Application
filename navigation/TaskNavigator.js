import React, {useState, useEffect} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BoardScreen from '../screens/BoardScreen';
import {primary10} from '../styles/styles';
import {getLogs, setCurrentLog} from '../store/LogReducer';
import {getTasks} from '../store/TaskReducer';
import { connect } from 'react-redux';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import SubTaskListScreen from '../screens/SubTaskListScreen';

const Tab = createMaterialTopTabNavigator();

const TaskNavigator = (props) => {

  // useEffect(()=>{
  //   props.dispatch(getLogs(props.Project.currentProject.id));
  // },[]);

  // useEffect(()=>{
  //   if (Object.keys(props.Log.currentLog).length === 0 && props.Log.items.length > 0){
  //     props.dispatch(setCurrentLog(props.Log.items[0]))
  //   }
  // },[props.Log.items]);

  // useEffect(() => {
  //   props.dispatch(getTasks(props.Log.currentLog.id))
  // }, [props.Log.currentLog]);

  // useEffect(() => {
  //   props.dispatch(getTasks(props.Log.currentLog.id))
  // }, [props.Task.currentTask]);

  return (
    <Tab.Navigator 
    screenOptions={{
      swipeEnabled: true,
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
      <Tab.Screen name="Task Details" children={()=><TaskDetailScreen items={props.Task.items[1]} {...props}/>} />
      <Tab.Screen name="Sub Tasks" children={()=><SubTaskListScreen items={props.Task.items[2]} {...props}/>} />
    </Tab.Navigator>
  );
}
const mapStateToProps = (state) => {
  const { Project, Log, Task } = state
  return { Project, Log, Task }
};

export default connect(mapStateToProps)(TaskNavigator);