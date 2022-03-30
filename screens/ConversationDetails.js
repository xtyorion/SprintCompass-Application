import React, {useEffect, useState, useRef} from 'react';
import Background from '../components/Background';
import {styles} from '../styles/styles';
import {View, FlatList, TouchableOpacity, Keyboard, Text} from 'react-native';
import { connect } from 'react-redux';
import { getMessages, sendMessage } from '../store/MessageReducer';
import { Avatar, Title, Paragraph} from 'react-native-paper';
import TextInput from '../components/TextInput';
import Message from '../components/MessageComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const MessagesScreen = (props) => {
  const API_URL = process.env.REACT_APP_API_URL;
  // const socket = useRef(null);
  const flatList = useRef(null);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [state, setState] = useState({
    chatMessage: "",
    chatMessages: []
  });
  const chatMessages = state.chatMessages.map(chatMessage => (
    <Text style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
  ));

  const gotoMessages = (conversation) => {
    // props.dispatch(Set_Conversation(conversation));
    // props.navigation.navigate('ConversationDetails');
  }

  useEffect(() => {
    console.log("watch for message items change")
  },[props.Message.items]);

  useEffect(() => {
    props.dispatch(getMessages(props.Conversation.currentConversation.id));
  },[]);
  useEffect(() => {
    if(arrivalMessage && props.Conversation.currentConversation.sender.id === arrivalMessage.senderId?.id){
      props.Message.items.push(arrivalMessage)
      try{
        flatList.current.scrollToEnd({animated: true});
      }catch(e){console.log(e)}
    }

  },[arrivalMessage]);

  const submitChatMessage = () => {
    // socket.emit('chat message', state.chatMessage);
    setState({chatMessage: ''});
  }

  const handleSubmit = async(e) => {
    const messageItem = {
      senderId: props.Login.current,
      message: message.value,
      conversationId: props.Conversation.currentConversation.id,
      receiverId: props.Conversation.currentConversation.sender.id,
    }
    props.dispatch(sendMessage(messageItem));
    // socket.current.emit("sendMessage", messageItem)

    setMessage({ value: '', error: '' });
    Keyboard.dismiss();
    try{
      flatList.current.scrollToEnd({animated: true});
    }catch(e){console.log(e)}
  }


  return (
    <Background>
      <View style={{flexDirection: 'column', height: '100%'}}>
        <View style={{backgroundColor: 'transparent', width: 430, height: '20%',alignItems: 'center',
    justifyContent: 'center',}}>
        <Avatar.Image  size={100} source={require("../assets/avatar.jpg")}/>
        <Title
          numberOfLines={1}
          style={{marginTop: 10}}
        >
          {props.Conversation.currentConversation.sender?.name}
        </Title>
        </View>
        <View style={{marginTop:22 , backgroundColor: '#f0eef2', width: 430, height: '62%', borderColor: '#e0dce4',
         borderWidth:1, borderBottomWidth: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
          <FlatList 
            getItemLayout={(data, index) => (
              {length: 10, offset: 70 * index, index}
            )}
            initialScrollIndex={props.Message.items.length-1}
            ref={flatList}
            style={{width: '100%'}}
            data={props.Message.items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Message message={{...item, navigation: gotoMessages, currentUser: props.Login.current}}/>
          )}
          />
          <View style={{flexDirection:'row'}}>
            <TextInput
            label="Enter your message..."
            returnKeyType="next"
            value={message.value}
            onChangeText={text => setMessage({ value: text, error: '' })}
            error={!!message.error}
            errorText={message.error}
            autoCapitalize="none"
            style={{width:'80%', marginLeft:15}}
            />

            <TouchableOpacity onPress={handleSubmit} style={{right:80, width:'20%', backgroundColor: 'transparent'}}>
              <FontAwesome name={"send-o"} color={'#826cff'} size={40} style={{top:25, left: 18}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
}

const mapStateToProps = (state) => {
  const { Message, Conversation, Login } = state
  return { Message, Conversation, Login }
};

export default connect(mapStateToProps)(MessagesScreen);