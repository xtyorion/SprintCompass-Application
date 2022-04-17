import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Button, Headline,  Text} from 'react-native-paper';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import Logo from '../components/Logo';
import {styles} from '../styles/styles';
import { connect } from 'react-redux';
import { createProject } from '../store/ProjectReducer';

const TeamListScreen = (props) => {
  const [project, setProject] = useState({
    memberoneName: '',
    membertwoName: '',
    memberName: '',
    userId: ''
  });

  const handleUpdateTeamList = () => {
    props.dispatch(createProject(project));
  }

  return (
    <Background>
      <Headline style={{marginTop: -100}}>Team Members List</Headline>
      <Text>Team Member One's First and Last Name</Text>
      <TextInput
        label="Team Member One's Name"
        returnKeyType="next"
        value={project.memberoneName}
        onChangeText={text => setProject({...project, memberoneName: text})import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Button, Headline,  Text} from 'react-native-paper';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import Logo from '../components/Logo';
import {styles} from '../styles/styles';
import { connect } from 'react-redux';
//import { createTeamList } from '../store/TeamListReducer';
import { createProject } from '../store/ProjectReducer';

const TeamListScreen = (props) => {
  const [teamlist, setTeamList] = useState({
    memberoneName: '',
    membertwoName: '',
    memberName: '',
    userId: ''
  });

  const handleUpdateTeamList = () => {
    props.dispatch(createProject(teamlist));

    console.log("\nTeam Members have been updated! ");

    console.log(`Team member one: ${teamlist.memberoneName}`);
    console.log(`Team member two: ${teamlist.membertwoName}`);
    console.log(`Team member three: ${teamlist.memberName}`);
  }

  return (
    <Background>
      <Headline style={{marginTop: -100}}>Team Members List</Headline>
      <Text>Team Member One's First and Last Name</Text>
      <TextInput
        label="Team Member One's Name"
        returnKeyType="next"
        value={teamlist.memberoneName}
        onChangeText={text => setTeamList({...teamlist, memberoneName: text})}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
       <Text>Team Member Two's First and Last Name</Text>
      <TextInput
        label="Team Member Two's Name"
        returnKeyType="next"
        value={teamlist.membertwoName}
        onChangeText={text => setTeamList({...teamlist, membertwoName: text})}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
       <Text>Team Member Three's First and Last Name</Text>
      <TextInput
        label="Team Members Three's Name"
        returnKeyType="next"
        value={teamlist.memberName}
        onChangeText={text => setTeamList({...teamlist, memberName: text})}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />

      <Button style={styles.button} mode="contained" onPress={handleUpdateTeamList}>
        Update Team List
      </Button>
    </Background>
  );
}
const mapStateToProps = (state) => {
  const { teamlist } = state
  return { teamlist }
};

export default connect(mapStateToProps)(TeamListScreen);

        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
       <Text>Team Member Two's First and Last Name</Text>
      <TextInput
        label="Team Member Two's Name"
        returnKeyType="next"
        value={project.membertwoName}
        onChangeText={text => setProject({...project, membertwoName: text})}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />
       <Text>Team Member Three's First and Last Name</Text>
      <TextInput
        label="Team Members Three's Name"
        returnKeyType="next"
        value={project.memberName}
        onChangeText={text => setProject({...project, memberName: text})}
        autoCapitalize="none"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
      />

      <Button style={styles.button} mode="contained" onPress={handleUpdateTeamList}>
        Update Team List
      </Button>
    </Background>
  );
}
const mapStateToProps = (state) => {
  const { Project } = state
  return { Project }
};

export default connect(mapStateToProps)(TeamListScreen);
