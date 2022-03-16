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

const Conversation = ({conversation}) => {
  const [image, setImage] = useState(0);
  const priceChange24h = conversation.price_change_24h
  const currentPrice = conversation.current_price
  const symbol = conversation.symbol
  const sender = conversation.members

  useEffect(() => {
    if (conversation.sender.image){
      setImage(conversation.sender.image);
    }
  }, []);

  function gotoMessages() {
    conversation.navigation(conversation);
  }
  
  return (
    <TouchableOpacity
      onPress={() => gotoMessages()}
      style={styles.surfaceContainer}
    >
      <Surface style={styles.surface}>
        <View style={{flexDirection: 'row'}}>
          <Avatar.Image  size={70} source={image}/>
          <View style={{flexDirection: 'column'}}>
            <Title numberOfLines={1} style={styles.conversationSender}>
              {conversation.sender.name}
            </Title>
            <Paragraph style={styles.conversationLastMessage}>{conversation.lastMessage}</Paragraph>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  )
}

export default Conversation;