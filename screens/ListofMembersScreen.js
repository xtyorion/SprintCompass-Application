import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Button, Headline,  Text} from 'react-native-paper';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import Logo from '../components/Logo';
import {styles} from '../styles/styles';
import { connect } from 'react-redux';

const TeamListScreen = (props) => {
  const [enteredContactName, setContactItem] = useState();

  const ContactItemInputHandler = (value) => {
      setContactItem(value);
    
  }

  const addItemHandler = () => {
      props.onAddItem(enteredContactName);
  
      setContactItem('');
  }


  const [project, setProject] = useState({
    memberoneName: '',
    membertwoName: '',
    enteredContactName: '',
    memberName: '',
    userId: ''
  });

  const handleUpdateTeamList = () => {
   // props.dispatch(createProject(project));
   props.navigation.navigate('MembersScreen');
  }

  return (
    <Background>
      <Headline style={{marginTop: -100}}>Team Members List</Headline>
      <Text>Team Member First and Last Name</Text>
      <TextInput
        label="Team Member First and Last Name"
        returnKeyType="next"
        onChangeText={text => setProject({...project, enteredContactName: text})}
        value={project.enteredContactName} 
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
       <Text>Team Member's Email Address</Text>
      <TextInput
        label="Team Member Email Address"
        returnKeyType="next"
        value={project.membertwoName}
        onChangeText={text => setProject({...project, membertwoName: text})}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
      <Button style={styles.button} mode="contained" onPress={handleUpdateTeamList}>
        Add Member
      </Button>
      <Button style={styles.button} mode="contained" onPress={props.onCancel} >
        Cancel
      </Button>
    </Background>
  );
}
const mapStateToProps = (state) => {
  const { Project } = state
  return { Project }
};

export default connect(mapStateToProps)(TeamListScreen);
