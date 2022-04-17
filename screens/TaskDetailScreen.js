import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity,SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView  } from 'react-native';
import { Button, Headline, Text, Menu, Divider } from 'react-native-paper';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createTask, updateTask} from '../store/TaskReducer';


const TaskDetailScreen = (props) => {
  const initialData = {
    name: '',
    description: '',
    logId: '',
    statusId: 1,
    members: [],
    initialRelativeEstimate: 0,
    initialEstimatedCost: 0,
    updatedRelativeEstimate: 0,
    updatedEstimatedCost: 0,
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
  const [visibleTeamMenu, setVisibleTeamMenu] = useState(false);
  const openTeamMenu = () => setVisibleTeamMenu(true);
  const closeTeamMenu = () => setVisibleTeamMenu(false);
  const [isTaskMovable, setIsTaskMovable] = useState(true);

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
      setStatusLabel(statuses[task.statusId-1].label)
      setLogLabel(()=>{ 
        return props.Log.items.find( (item) => item.id === props.Task.currentTask.logId).name 
      })
    }
  },[props.Task.currentTask]);

  useEffect(()=> {
    console.log("check", task.id)
    if (task.id !== undefined){
      const logItem = props.Log.items.find(log => log.id === task.id)
      updateLog(logItem);
    }
   
  },[props.Log.items]);
  useEffect(()=> {
    if(props.Subtask.items && props.Subtask.items.length > 0)
    props.Subtask.items.forEach((item)=>{if (item.statusId === 4) setIsTaskMovable(false)})
   
  },[props.Subtask.items]);

  const handleTasksCreation = () => {
    if (task.id){
      // const members = task.members;
      // members.push('62293d8fe647ac672cc76339');
      // setTask({...task, members: members})
      // console.log(task)
      props.dispatch(updateTask(task.id, task));
    } else{
      props.dispatch(createTask(task));
    }
    
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
    closeStatusMenu();
  }
  const updateLog = (log) => {
    if (log) {
      setLogLabel(log.name);
      setTask({...task, logId: log.id});
      closeLogMenu();
    }
  }


  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={task.name}
          onChangeText={text => setTask({ ...task, name: text })}
          autoCapitalize="none"
          autoCompleteType="name"
          textContentType="name"
          keyboardType="default"
          style={{marginTop:60}}
        />
        
        <Menu
          visible={visibleTeamMenu}
          onDismiss={closeTeamMenu}
          style={{left: 205, top: 230}}
          anchor={
            <Button onPress={openTeamMenu} mode="outlined" style={{backgroundColor: 'white', borderWidth: 1, borderColor: 'gray'}}>
              {logLabel}
              <Ionicons name={"chevron-down-outline"} color={'#826cff'} size={20} style={{marginTop: 2, right:5}}/>
            </Button>
            }>
          {props.Log.items.map(item => (
            <Menu.Item key={item.id} onPress={()=>updateLog(item)} title={item.name}/>
          ))}
        </Menu>
        
        <TextInput
          label="Description"
          returnKeyType="next"
          value={task.description}
          onChangeText={text => setTask({ ...task, description: text })}
          autoCapitalize="none"
          autoCompleteType="name"
          textContentType="name"
          keyboardType="default"
          multiline={true}
          numberOfLines={4}
          dense={true}
        />
        
        <TextInput
          label="Initial Relative Estimate"
          returnKeyType="next"
          value={task.initialRelativeEstimate.toString()}
          onChangeText={text => {setTask({ ...task, initialRelativeEstimate: parseInt(text), 
            initialEstimatedCost: parseInt(text) * props.Project.currentProject.numberOfHours * 65 });}}
          keyboardType="numeric"
        />
        
        <TextInput
          label="Initial Estimated Cost"
          returnKeyType="next"
          value={task.initialEstimatedCost.toString()}
          keyboardType="numeric"
          disabled={true}
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
            <Menu.Item onPress={() => {updateStatus(3)}} title={statuses[3].label} />
          </Menu>
          <Menu
            visible={visibleLogMenu}
            onDismiss={closeLogMenu}
            style={{left: 205, top: 560}}
            anchor={
              <Button onPress={openLogMenu} mode="outlined" style={{ marginLeft: 3, backgroundColor: 'white', borderWidth: 1, borderColor: 'gray'}}>
                {logLabel}
                <Ionicons name={"chevron-down-outline"} color={'#826cff'} size={20} style={{marginTop: 2, marginLeft:5}}/>
              </Button>
              }>
            {props.Log.items.map(item => (
              <Menu.Item key={item.id} onPress={()=>updateLog(item)} title={item.name} disabled={!isTaskMovable}/>
            ))}
          </Menu>
        </View>
       
        </ScrollView>
      </SafeAreaView>
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
  const { Task, Log, Subtask, Project } = state
  return { Task, Log, Subtask, Project}
};

const styles = StyleSheet.create({
  container: {
    height: 540,
    marginTop: -100
  },
  scrollView: {
  },
  text: {
    fontSize: 42,
  },
  button: {
    width: '100%',
    marginVertical: 10,
},
});

export default connect(mapStateToProps)(TaskDetailScreen);
