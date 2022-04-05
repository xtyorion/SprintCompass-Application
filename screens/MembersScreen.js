import React, {useEffect, useState, useRef} from 'react';
import { Button, Headline,  Provider, FlatList, Menu, Divider } from 'react-native-paper';
import { View, Text } from 'react-native';
import Background from '../components/Background';
import {styles} from '../styles/styles';
import Logo from '../components/Logo';

import ContactListItem from '../components/TeamListItem';
import ContactItemInput from '../screens/ListofMembersScreen';

const MembersScreen = (props) => {
    const [ContactList, setContactList] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);
    const flatList = useRef(null);
  
  
    const addContactItemHandler = (ContactItem) => {
      setContactList(ContactList => [...ContactList, { key: Math.random().toString(), value: ContactItem }]);
      setIsAddMode(false);
    }
  
    const removeContactItemHandler = itemId => {
      setContactList(
        ContactList => {
          return ContactList.filter((item) => item.key !== itemId);
        }
      );
    }
  
    //put flatlist here of team member with email 

  return (
    <Background>
      <View style={styles.container}>
      <Headline>Members Screen</Headline>
      <Logo />
      </View>
    </Background>
  );
}

export default MembersScreen;
