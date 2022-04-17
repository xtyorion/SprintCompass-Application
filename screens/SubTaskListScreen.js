import React, {useEffect, useState} from 'react';
import { SafeAreaView, FlatList, StyleSheet, StatusBar, View, Text} from 'react-native';
import { Headline, Dialog, Portal, Button, Colors} from 'react-native-paper';
import SubTaskItem from '../components/SubTaskItem';
import { connect } from 'react-redux';
import {getSubtasks, createSubtask} from '../store/SubtaskReducer';
import TextInput from '../components/TextInput';

const SubTaskListScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subtask, setSubtask] = useState({
    name: "",
    description: "",
    statusId: 1,
    originalHours: 0,
    actualHours: 0,
    reestimateToComplete: 0,
    taskId: props.Task.currentTask.id,
    members: ["62293d8fe647ac672cc76339"],
  });
  useEffect(()=>{
    if (props.Task.currentTask.id)
    props.dispatch(getSubtasks(props.Task.currentTask.id))
  },[props.Task.currentTask]);

  useEffect(()=>{
    if (props.Task.currentTask.id)
    props.dispatch(getSubtasks(props.Task.currentTask.id))
  },[props.Subtask.currentSubtask]);

  
  const renderItem = ({ item }) => (
    <SubTaskItem item={item} {...props} />
  );

  const handleSaveSubtask = () => {
    props.dispatch(createSubtask(subtask));
    setModalVisible(false);
    props.dispatch(getSubtasks(props.Task.currentTask.id))
  }

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={props.Subtask.items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <Button mode="contained" onPress={() => setModalVisible(true)} style={{width: 382, alignSelf: 'center'}}>
        Add New Subtask
      </Button>
      <Portal>
          <Dialog visible={modalVisible} onDismiss={()=>setModalVisible(false)}>
            <Dialog.Title>Subtask Item</Dialog.Title>
            <Dialog.Content>
              <Text>Name</Text>
              <TextInput
                label="Name"
                returnKeyType="next"
                value={subtask.name}
                onChangeText={text => setSubtask({ ...subtask, name: text })}
                autoCapitalize="none"
                autoCompleteType="name"
                textContentType="name"
                keyboardType="default"
              />
              <Text>Description</Text>
              <TextInput
                label="Description"
                returnKeyType="next"
                value={subtask.description}
                onChangeText={text => setSubtask({ ...subtask, description: text })}
                autoCapitalize="none"
                autoCompleteType="name"
                textContentType="name"
                keyboardType="default"
              />
              <Text>Relative Estimate</Text>
              <TextInput
                label="Original Hours Estimate"
                returnKeyType="next"
                value={subtask.originalHours.toString()}
                onChangeText={text => {setSubtask({ ...subtask, originalHours: parseInt(text)});}}
                autoCapitalize="none"
                autoCompleteType="name"
                textContentType="name"
                keyboardType="default"
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode="outlined" style={{marginRight: 10, borderColor:"#732e51"}} 
              onPress={()=>setModalVisible(false)}>Cancel</Button>
              <Button onPress={handleSaveSubtask} mode="contained">Add</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>
    
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    height: 560,
    marginBottom: 5
  },
});
const mapStateToProps = (state) => {
  const { Task, Subtask, Project } = state
  return { Task, Subtask, Project }
};
export default connect(mapStateToProps)(SubTaskListScreen);