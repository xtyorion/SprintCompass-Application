import React, {useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageBackground, StyleSheet, View } from 'react-native';
import UserHomeStackScreen from '../stacks/UserHomeStackScreen';
import ProfileScreen from '../screens/ProfileScreen';
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button, Portal, Dialog, Menu, Divider} from 'react-native-paper';

import { getProjects, getProject } from '../store/ProjectReducer';
import { createLog, setCurrentLog } from '../store/LogReducer';
import {setCurrentTask} from '../store/TaskReducer';
import { connect } from 'react-redux';
import TeamListScreen from '../screens/TeamListScreen';
import BoardStackScreen from '../stacks/BoardStackScreen';
import TextInput from '../components/TextInput';




const UserHomeNavigatorScreen = props => {
  const [visibleProjectMenu, setVisibleProjectMenu] = React.useState(false);
  const [visibleLogMenu, setVisibleLogMenu] = React.useState(false);
  const [projectTitle, setProjectTitle] = useState("Projects");
  const [logTitle, setLogTitle] = useState("Logs");
  const [logName, setLogName] = useState();

  const openProjectMenu = () => setVisibleProjectMenu(true);
  const closeProjectMenu = () => setVisibleProjectMenu(false);
  const openLogMenu = () => setVisibleLogMenu(true);
  const closeLogMenu = () => setVisibleLogMenu(false);

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  

  const [isBoardHeaderView, setIsBoardHeaderView] = useState(true);

  useEffect(()=>{
    props.dispatch(getProjects(props.User.currentUser.id));
  },[props.User.currentUser]);

  useEffect(() => {
    if(props.Project.currentProject)
    setProjectTitle(props.Project.currentProject.productName)
  }, [props.Project.currentProject]);

  const handleGetProject = (projectId) =>{
    props.dispatch(getProject(projectId))
  }

  const renderProjectItems = (projectItems) => projectItems.map((project) => <Menu.Item key={project.id} onPress={() => {handleGetProject(project.id);closeProjectMenu();}} title={project.productName}/> )
  const renderLogItems = (logItems) => logItems.map((log) => <Menu.Item key={log.id} onPress={() => {setLogToCurrent(log); closeLogMenu();}} title={log.name}/>);
  
  useEffect(() => {
    if(Object.keys(props.Log.currentLog).length !== 0){
      setLogTitle(props.Log.currentLog.name)
    }
  }, [props.Log.currentLog.name]);

  const gotoAddTask = () => {
    props.dispatch(setCurrentTask({}));
    props.navigation.navigate('TaskNavigator');
  }

  const boardHeaderView = (isVisible) => {
    setIsBoardHeaderView(isVisible);
  }

  const setLogToCurrent = (log) => {
    console.log("log: ", log);
    props.dispatch(setCurrentLog(log))
  }

  const handleCreateLog = () => {
    if(logName && props.Project.currentProject.id){
      props.dispatch(createLog({name: logName, projectId: props.Project.currentProject.id}))
    }
    hideDialog();
  }



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
            height: 50,
          },
          headerStyle:{ backgroundColor: 'transparent', height: 65 },
          headerBackground: () => (
            <ImageBackground
              source={require('../assets/background_dot.png')}
              resizeMode="repeat"
              style={StyleSheet.absoluteFill}
            ></ImageBackground>
          ),
        }}>
        <Tab.Screen name="UserHomeStackScreen" component={UserHomeStackScreen}   options={{
          title: "",
          tabBarIcon: ({focused, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} color={'#826cff'} size={size} />
          ),
          headerLeft: () => (
            <View
              style={{
                position: 'relative',
                zIndex: 3, // works on ios
                elevation: 3, // works on android
              }}>
              <Menu
                visible={visibleProjectMenu}
                onDismiss={closeProjectMenu}
                style={{left: 150, top: 30}}
                anchor={
                  <Button onPress={openProjectMenu}>
                    {projectTitle}
                    <Ionicons name={"chevron-down-outline"} color={'#826cff'} size={20} style={{marginTop: 2, marginLeft:5}}/>
                  </Button>
                  }>
                {renderProjectItems(props.Project.items)}
                <Divider />
                <Menu.Item onPress={() => {props.navigation.navigate('ProjectDetailsScreen'); closeProjectMenu();}} title="New Project" />
              </Menu>
            </View>
          )
        }}/>
        <Tab.Screen name="BoardStackScreen" 
          children={()=><BoardStackScreen boardHeaderView={boardHeaderView} {...props}/>}
          options={{
          title:"",
          headerLeft: () => (
          ( isBoardHeaderView &&
          <View
            style={{
              position: 'relative',
            }}>
            <Menu
              visible={visibleLogMenu}
              onDismiss={closeLogMenu}
              style={{left: 70, top: 70}}
              anchor={
                <Button onPress={openLogMenu}>
                  {logTitle}
                  <Ionicons name={"chevron-down-outline"} color={'#826cff'} size={20} style={{marginTop: 2, marginLeft:5}}/>
                </Button>
                }>
              {renderLogItems(props.Log.items)}
              <Divider />
              <Menu.Item onPress={()=>{showDialog(); closeLogMenu();}} title="New Sprint" />
            </Menu>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Create new Log/Sprint</Dialog.Title>
                <Dialog.Content>
                  <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={logName}
                    onChangeText={text => {setLogName(text)}}
                    keyboardType="default"
                  />
                </Dialog.Content>
                <Dialog.Actions>
                <Button mode="outlined" onPress={hideDialog} style={{marginRight:10}}>Cancel</Button>
                  <Button mode="contained" onPress={handleCreateLog}>Create!</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
          )
          ),
          headerRight: () => (
            ( isBoardHeaderView &&
            <View>
              <Button mode="contained" disabled={!props.Log.currentLog} style={{marginRight:15, paddingVertical: -1}} onPress={gotoAddTask}>Add Task</Button>
            </View>
            )
          ),
          tabBarIcon: ({focused, size}) => (
            <Ionicons name={focused ? "time" : "time-outline"} color={'#826cff'} size={size} />
          )
        }}/>
        <Tab.Screen name="List" component={TeamListScreen} options={{
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

const mapStateToProps = (state) => {
  const { User, Project, Log } = state
  return { User, Project, Log }
};

export default connect(mapStateToProps)(UserHomeNavigatorScreen);
