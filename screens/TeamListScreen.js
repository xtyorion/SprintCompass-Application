import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import { Button, Headline,  Text, Portal, Dialog} from 'react-native-paper';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import TeamListItem from '../components/TeamListItem';
import Logo from '../components/Logo';
import {styles} from '../styles/styles';
import { connect } from 'react-redux';
import { getAvailableUsers, updateProject } from '../store/ProjectReducer';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const TeamListScreen = (props) => {
  const [modalVisible, setModalVisible] = useState();
  const [team, setTeam] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [usersToAdd, setUsersToAdd] = useState([]);
  const [project, setProject] = useState({
    memberoneName: '',
    membertwoName: '',
    memberName: '',
    userId: ''
  });
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  useEffect(() => {
    if (props.Project.currentProject.members.length > 0)
      setTeam(props.Project.currentProject.members);

  }, [props.Project.currentProject.members]);
  useEffect(() => {
    if (props.Project.availableUsers)
    setAvailableUsers(props.Project.availableUsers)
  },[props.Project.availableUsers]);

  const handleGetAvailableUsers = () => {
    setModalVisible(true)
    props.dispatch(getAvailableUsers(props.Project.currentProject.id));
  }
  const renderItem = ({ item }) => (
    <TeamListItem item={item} includeUser={handleIncludeUserToProject} />
  );

  const handleIncludeUserToProject = (userId) => {
    let users = usersToAdd;
    
    if (users.includes(userId)){
      let index = users.indexOf(userId);
      if (index !== -1) {
        users.splice(index, 1);
      }
    } else {
      users.push(userId);
    }

    setUsersToAdd(users);
    console.log("setUsersToAdd", users)
  }

  const handleUpdateProjectUsers = () => {
    setModalVisible(false);
    const members = (props.Project.currentProject.members.map((member) => member.id)).concat(usersToAdd)
    props.dispatch(updateProject(props.Project.currentProject.id, {members: members}));
  }


  return (
    <Background>
      <View style={{marginBottom: 75}}>
        <FlatList
          data={team}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <Button mode="contained" onPress={handleGetAvailableUsers}>
          Add to Team List
        </Button>
        <Portal>
          <Dialog visible={modalVisible} onDismiss={()=>setModalVisible(false)}>
            <Dialog.Title>Add User to Team</Dialog.Title>
            <Dialog.Content>
            <FlatList
              data={availableUsers}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode="outlined" style={{marginRight: 10, borderColor:"#732e51"}} 
              onPress={()=>setModalVisible(false)}>Cancel</Button>
              <Button onPress={handleUpdateProjectUsers} mode="contained">Add</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Background>
  );
}
const mapStateToProps = (state) => {
  const { Project } = state
  return { Project }
};
export default connect(mapStateToProps)(TeamListScreen);
