import React, { useState, useEffect }  from 'react';
import { View, StyleSheet, Text, Alert, Modal, Pressable} from 'react-native';
import { Headline } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';


const TaskItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    console.log
  },[])

  return (
    <TouchableOpacity
      onPress={()=>{setModalVisible(true)}}>
      <View style={styles.item}>
        <Text>[Priority: {props.priorityNumber} ]</Text>
        <Headline>{props.name}</Headline>
        <Text>{props.description}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{width: '50%', textAlign: 'left' }}>Assign: Vincent Image</Text>
          <Text style={{width: '50%', textAlign: 'right' }}>Status: {props.statusId}</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>[Priority: {props.priorityNumber} ]</Text>
            <Headline style={{width: 320}}>{props.name}</Headline>
            <Text>{props.description}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{width: '50%', textAlign: 'left' }}>Assign: Vincent Image</Text>
              <Text style={{width: '50%', textAlign: 'right' }}>Status:{props.statusId}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 30}}>
              <Pressable
                style={[styles.button, styles.buttonEdit]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{
                  color: "#826cff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}>Edit</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
           
          </View>
        </View>
      </Modal>
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