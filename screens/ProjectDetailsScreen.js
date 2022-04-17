import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Button, Headline,  Text} from 'react-native-paper';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import Logo from '../components/Logo';
import {styles} from '../styles/styles';
import { connect } from 'react-redux';
import { createProject, getProjects } from '../store/ProjectReducer';

const ProjectDetailsScreen = (props) => {
  const [project, setProject] = useState({
    teamName: '',
    productName: '',
    numberOfHours: 0,
    totalEstimatedNumberOfStoryPoints: 0,
    totalEstimatedCost: 0,
    userId: ''
  });

  const handleCreateProject = () => {
    props.dispatch(createProject(project));
    props.navigation.goBack(null);
  }

  return (
    <Background>
      <Headline style={{marginTop: -100}}>Create New Project</Headline>

      <TextInput
        label="Team Name"
        returnKeyType="next"
        value={project.teamName}
        onChangeText={text => setProject({...project, teamName: text})}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
      <TextInput
        label="Product Name"
        returnKeyType="next"
        value={project.productName}
        onChangeText={text => setProject({...project, productName: text})}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
      <TextInput
        label="Number of hours per story point"
        returnKeyType="next"
        value={project.numberOfHours.toString()}
        onChangeText={text => setProject({...project, numberOfHours:parseInt(text)})}
        autoCapitalize="none"
        textContentType="none"
        keyboardType="numeric"
      />
      <TextInput
        label="Total Estimated number of Story Points"
        returnKeyType="next"
        value={project.totalEstimatedNumberOfStoryPoints.toString()}
        onChangeText={text => setProject({...project, totalEstimatedNumberOfStoryPoints: parseInt(text)})}
        autoCapitalize="none"
        textContentType="none"
        keyboardType="numeric"
      />
      <TextInput
        label="Total Estimated cost for the application development"
        returnKeyType="next"
        value={project.totalEstimatedCost.toString()}
        onChangeText={text => setProject({...project, totalEstimatedCost: parseInt(text)})}
        autoCapitalize="none"
        textContentType="none"
        keyboardType="numeric"
      />
     

      <Button style={styles.button} mode="contained" onPress={handleCreateProject}>
        Create
      </Button>
    </Background>
  );
}
const mapStateToProps = (state) => {
  const { Project, User } = state
  return { Project, User }
};

export default connect(mapStateToProps)(ProjectDetailsScreen);
