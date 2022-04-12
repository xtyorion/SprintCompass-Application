import React, { useState } from 'react';
import {Headline,  View, StyleSheet, TextInput, Button, Modal } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { styles } from '../styles/styles';

const TeamItemInput = props => {
    const [enteredContactName, setContactItem] = useState();
    //const [enteredContactNumber, setContactNumber] = useState();
    //const [enteredContactNumber, setContactNumber] = useState();


    const ContactItemInputHandler = (value) => {
        setContactItem(value);
     
      
    }
 
    // const ContactItemInputHandler1 = (value1) => {
    //     setContactItem(value1);
      
    // }
    // const ContactItemInputHandler1 = (value1) => {
    //     setContactNumber(value1);
    //     //setContactItem(value1);
    // }


    const addItemHandler = () => {
        props.onAddItem(enteredContactName);
       //props.onAddItem(enteredContactNumber);

        setContactItem('');
       //setContactNumber('');
    }

    return (
    <Background>
    <Logo />
    <Headline>Welcome back.</Headline>
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput placeholder="Team Name" style={styles.input} onChangeText={ContactItemInputHandler} value={enteredContactName} />
                <TextInput placeholder="Email Address" style={styles.input} onChangeText={ContactItemInputHandler} value={enteredContactName} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button} ><Button title="CANCEL" onPress={props.onCancel} /></View>
                    <View style={styles.button} ><Button title="ADD" color="red" onPress={addItemHandler} /></View>
                </View>
            </View>
        </Modal>
     </Background>
    )
}


export default TeamItemInput;
