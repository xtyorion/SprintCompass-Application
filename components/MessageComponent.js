import React, {useEffect, useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {styles} from '../styles/styles';
import {  
  Title,
  Caption,
  Divider,
  Avatar,
  Surface,
  Button,
  DarkTheme,
  Paragraph,  } from 'react-native-paper';

const Message = ({message}) => {
  const [image, setImage] = useState(0);

  useEffect(() => {
    console.log("message", message)
  }, []);

  function gotoMessages() {
    message.navigation(message.id);
  }
  
  return (
    <TouchableOpacity
      onPress={() => gotoMessages()}
      style={{
        marginVertical: 7,
        marginHorizontal: 15,
        justifyContent: "center",
        alignItems: message.senderId.id !== message.currentUser.id ? 'flex-start': 'flex-end'
      }}
    >
      <Surface style={{
        width: 'auto',
        backgroundColor: message.senderId.id !== message.currentUser.id ? "#e0dce4": "#826cff",
        borderRadius: 20,
        borderColor: "#e0dce4",
        borderWidth:1,
        paddingVertical: 10,
        paddingHorizontal: 15
      }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <Paragraph style={styles.messageLastMessage}>{message.message}</Paragraph>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  )
}

export default Message;