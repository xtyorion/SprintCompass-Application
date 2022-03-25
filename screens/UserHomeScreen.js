import React, {useState, useEffect} from 'react';
import { Button, Headline, Provider, Menu, Divider } from 'react-native-paper';
import { View, Text } from 'react-native';
import Background from '../components/Background';
import {styles} from '../styles/styles';
import { getUserProjects } from '../store/UserReducer';
import { connect } from 'react-redux';
import Logo from '../components/Logo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserHomeScreen = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [projectTitle, setProjectTitle] = useState("Projects");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  useEffect(()=>{
    props.dispatch(getUserProjects());
  },[]);

  useEffect(() => {
    setProjectTitle(props.User.currentProject.productName)
  }, [props.User.currentProject]);

  useEffect(() => {
    for (var project of props.User.projects) {
      setMenuItems(oldArray => [...oldArray, <Menu.Item key={project.id} onPress={() => {}} title={project.productName}/>]);
    }
  }, [props.User.projects]);


  return (
    <Background>
      <Provider>
        <View
          style={{
            paddingTop: 10,
            position: 'relative',
          }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            style={{marginLeft: 60, marginTop: 30}}
            anchor={
              <Button onPress={openMenu}>
                {projectTitle}
                <Ionicons name={"chevron-down-outline"} color={'#826cff'} size={20} style={{marginTop: 2, marginLeft:5}}/>
              </Button>
              }>
            {menuItems}
            <Divider />
            <Menu.Item onPress={() => {props.navigation.navigate('ProjectDetailsScreen')}} title="New Project" />
          </Menu>
        </View>
      </Provider>
      <View style={styles.container}>
      <Headline>Dashboard!</Headline>
      <Logo />
      </View>
    </Background>
  );
}

const mapStateToProps = (state) => {
  const { User, Project } = state
  return { User, Project }
};

export default connect(mapStateToProps)(UserHomeScreen);
