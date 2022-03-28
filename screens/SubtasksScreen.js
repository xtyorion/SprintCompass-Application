import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Headline, Text } from 'react-native-paper';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import Logo from '../components/Logo';
import { styles } from '../styles/styles';
import { connect } from 'react-redux';
import { createProject } from '../store/ProjectReducer';

const SubtasksScreen = (props) => {
  const [project, setProject] = useState({
    memberoneName: '',
    membertwoName: '',
    memberName: '',
    subtaskName: '',
    userId: ''
  });

  const handleTasksCreation = () => {
    props.dispatch(createProject(project));
  }

  return (
    <Background>
      <Headline style={{ marginTop: -100 }}>Tasks Creation</Headline>
      <Text>Create a Task</Text>
      <TextInput
        label="Create a Task"
        returnKeyType="next"
        value={project.memberoneName}
        onChangeText={text => setProject({ ...project, memberoneName: text })}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
      <Text>Create a Subtask</Text>
      <TextInput
        label="Create a Subtask"
        returnKeyType="next"
        value={project.membertwoName}
        onChangeText={text => setProject({ ...project, membertwoName: text })}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
      <Text>Create a Subtask</Text>
      <TextInput
        label="Create a Subtask"
        returnKeyType="next"
        value={project.memberName}
        onChangeText={text => setProject({ ...project, memberName: text })}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
      <Text>Create a Subtask</Text>
      <TextInput
        label="Create a Subtask"
        returnKeyType="next"
        value={project.subtaskName}
        onChangeText={text => setProject({ ...project, subtaskName: text })}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />

      <Button style={styles.button} mode="contained" onPress={handleTasksCreation}>
        Create
      </Button>
    </Background>
  );
}
const mapStateToProps = (state) => {
  const { Project } = state
  return { Project }
};

export default connect(mapStateToProps)(SubtasksScreen);
