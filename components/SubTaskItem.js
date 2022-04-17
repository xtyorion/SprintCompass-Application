import React, { useState, useEffect }  from 'react';
import { View, StyleSheet, Text, Alert, Modal, Pressable} from 'react-native';
import { Headline, Dialog, Portal, Button, TextInput, Menu} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { updateSubtask } from '../store/SubtaskReducer';


const TaskItem = (props) => {
  const [statusLabel, setStatusLabel] = useState("Status");
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleStatusMenu, setVisibleStatusMenu] = useState(false);
  const openStatusMenu = () => setVisibleStatusMenu(true);
  const closeStatusMenu = () => setVisibleStatusMenu(false);
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
  const [subtask, setSubtask] = useState({
    name: "",
    description: "",
    statusId: 1,
    actualHours: 0,
    originalHours: 0,
    reestimateToComplete: 0
  });

  useEffect(()=>{
    setSubtask(props.item)
  },[])
  useEffect(()=>{
    setStatusLabel(statuses[subtask.statusId - 1].label)
  },[subtask])
  
  const updateStatus = (index) => {
    setStatusLabel(statuses[index].label)
    setSubtask({...subtask, statusId: statuses[index].value});
    closeStatusMenu();
  }

  const handleUpdateSubtask = () => {
    props.dispatch(updateSubtask(subtask.id, subtask));
    setModalVisible(false);
  }

  return (
    <TouchableOpacity
      onPress={()=>{setModalVisible(true)}}>
      <View style={styles.item}>
        <Text>[Priority: {props.item.priorityNumber} ]</Text>
        <Headline>{props.item.name}</Headline>
        <Text>{props.item.description}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{width: '50%', textAlign: 'left' }}>Assign: Vincent Image</Text>
          <Text style={{width: '50%', textAlign: 'right' }}>Status: {props.item.statusId}</Text>
        </View>
      </View>
      <Portal>
          <Dialog visible={modalVisible} onDismiss={()=>setModalVisible(false)}>
            <Dialog.Title>Edit Subtask Item</Dialog.Title>
            <Dialog.Content>
              <Text>Name</Text>
              <TextInput
                label="Name"
                returnKeyType="next"
                value={subtask.name}
                onChangeText={text => setSubtask({ ...subtask, name: text })}
                keyboardType="default"
              />
              <Text>Description</Text>
              <TextInput
                label="Description"
                returnKeyType="next"
                value={subtask.description}
                onChangeText={text => setSubtask({ ...subtask, description: text })}
                keyboardType="default"
              />
              <Text>Original Hours</Text>
              <TextInput
                label="Original Hours"
                returnKeyType="next"
                value={subtask.originalHours.toString()}
                keyboardType="numeric"
                disabled={true}
              />
              <Text>Actual Hours</Text>
              <TextInput
                label="Actual Hours"
                returnKeyType="next"
                value={subtask.actualHours.toString()}
                onChangeText={text => setSubtask({ ...subtask, actualHours: parseInt(text) })}
                keyboardType="numeric"
              />
              <Text>Estimate to Complete</Text>
              <TextInput
                label="Actual Hours"
                returnKeyType="next"
                value={subtask.reestimateToComplete.toString()}
                onChangeText={text => setSubtask({ ...subtask, reestimateToComplete: parseInt(text) })}
                keyboardType="numeric"
              />
              <Menu
                visible={visibleStatusMenu}
                onDismiss={closeStatusMenu}
                style={{left: 230, top: 350}}
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
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode="contained" onPress={()=>{setModalVisible(false)}} style={{marginRight: 10}}>Cancel</Button>
              <Button mode="outlined" onPress={handleUpdateSubtask}>Save</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </TouchableOpacity>
   
  );
}

export default TaskItem

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation:5,
    borderRadius: 5,
  },
  title: {
    fontSize: 32,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 30,
    marginLeft: 5
  },
  buttonOpen: {
    backgroundColor: "#826cff",
  },
  buttonClose: {
    backgroundColor: "#826cff",
  },
  buttonEdit: {
    borderColor: "#826cff",
    borderWidth: 2,
    backgroundColor: "white",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});