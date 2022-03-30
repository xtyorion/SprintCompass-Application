import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity,SafeAreaView, StyleSheet } from 'react-native';
import { Button, Headline, Text, Menu, Divider } from 'react-native-paper';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles/styles'
import {createTask} from '../store/TaskReducer'


const TaskDetailScreen = (props) => {
  const initialData = {
    name: '',
    description: '',
    logId: '',
    statusId: 1,
    members: [],
    initialRelativeEstimate: 0,
    initialEstimatedCost: 0
  };
  const [title, setTitle] = useState("Add Task");
  const [buttonTitle, setButtonTitle] = useState("Create");
  const [task, setTask] = useState(initialData);

  const [visibleStatusMenu, setVisibleStatusMenu] = useState(false);
  const openStatusMenu = () => setVisibleStatusMenu(true);
  const closeStatusMenu = () => setVisibleStatusMenu(false);
  const [visibleLogMenu, setVisibleLogMenu] = useState(false);
  const openLogMenu = () => setVisibleLogMenu(true);
  const closeLogMenu = () => setVisibleLogMenu(false);

  const [logItems, setLogItems] = useState([]);

  const statuses = [
    {
      label: 'Open',
      value: 1,
    },
    {
      label: 'Development',
      value: 2,
    },
    {
      label: 'Testing',
      value: 3,
    },
    {
      label: 'Closed',
      value: 4,
    },
  ]
  const [statusLabel, setStatusLabel] = useState('Status');
  const [logLabel, setLogLabel] = useState('Log / Sprint');

  useEffect(()=> {
    //hides the header 
    props.boardHeaderView(false)
    setTask({...task, logId: props.Log.currentLog.id})
  },[]);

  useEffect(()=> {
    //hides the header 
    props.boardHeaderView(false)
    if (Object.keys(props.Task.currentTask).length > 0 && props.Log.items.length > 0){
      setTask(props.Task.currentTask)
      setTitle("Edit Task")
      setButtonTitle("Save")
      setStatusLabel(statuses[task.statusId].label)
    }
  },[props.Task.currentTask]);

  useEffect(()=> {
    console.log(task.id)
    if (task.id !== undefined){
      const logItem = props.Log.items.find(log => log.id === task.id)
      updateLog(logItem);
    }
   
  },[props.Log.items]);

  const handleTasksCreation = () => {
    props.dispatch(createTask(task));
    props.boardHeaderView(true)
    props.navigation.navigate('BoardNavigator')
  }

  const handleBack = () => {
    props.navigation.navigate('BoardNavigator')
    props.boardHeaderView(true)
  }
  const updateStatus = (index) => {
    setStatusLabel(statuses[index].label)
    setTask({...task, statusId: statuses[index].value});
  }
  const updateLog = (log) => {
    setLogLabel(log.name);
    setTask({...task, logId: log.id});
    
  }

  return (
    <Background>
      <Headline style={{ marginTop: -100 }}>{title}</Headline>
      
      <TextInput
        label="Name"
        returnKeyType="next"
        value={task.name}
        onChangeText={text => setTask({ ...task, name: text })}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
      
      <TextInput
        label="Description"
        returnKeyType="next"
        value={task.description}
        onChangeText={text => setTask({ ...task, description: text })}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
      
      <TextInput
        label="Initial Relative Estimate"
        returnKeyType="next"
        value={task.initialRelativeEstimate?.toString()}
        onChangeText={text => setTask({ ...task, initialRelativeEstimate: parseInt(text) })}
        keyboardType="numeric"
      />
      
      <TextInput
        label="Create a Subtask"
        returnKeyType="next"
        value={task.initialEstimatedCost?.toString()}
        onChangeText={text => setTask({ ...task, initialEstimatedCost: parseInt(text) })}
        keyboardType="numeric"
      />
       <View
        style={{
          flexDirection: 'row',
        }}>
        <Menu
          visible={visibleStatusMenu}
          onDismiss={closeStatusMenu}
          style={{left: 55, top: 560}}
          anchor={
            <Button onPress={openStatusMenu} mode="outlined"  style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'gray'}}>
              {statusLabel}
              <Ionicons name={"chevron-down-outline"} color={'#826cff'} size={20} style={{marginTop: 2, marginLeft:5}}/>
            </Button>
            }>
          <Menu.Item onPress={() => {updateStatus(0)}} title={statuses[0].label} />
          <Menu.Item onPress={() => {updateStatus(1)}} title={statuses[1].label} />
          <Menu.Item onPress={() => {updateStatus(2)}} title={statuses[2].label} />
        </Menu>
        <Menu
          visible={visibleLogMenu}
          onDismiss={closeLogMenu}
          style={{left: 205, top: 560}}
          anchor={
            <Button onPress={openLogMenu} mode="outlined" style={{ marginLeft: 35, backgroundColor: 'white', borderWidth: 1, borderColor: 'gray'}}>
              {logLabel}
              <Ionicons name={"chevron-down-outline"} color={'#826cff'} size={20} style={{marginTop: 2, marginLeft:5}}/>
            </Button>
            }>
          {props.Log.items.map(item => (
            <Menu.Item key={item.id} onPress={()=>updateLog(item)} title={item.name}/>
          ))}
        </Menu>
      </View>
      <Button style={styles.button} mode="contained" onPress={handleTasksCreation}>
        {buttonTitle}
      </Button>
      <Button style={styles.button} mode="outlined" onPress={handleBack}>
        Back
      </Button>
    </Background>
  );
}
const mapStateToProps = (state) => {
  const { Task, Log } = state
  return { Task, Log }
};


export default connect(mapStateToProps)(TaskDetailScreen);
