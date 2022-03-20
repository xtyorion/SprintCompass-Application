import React, {useEffect} from 'react';
import { FlatList } from 'react-native';
import Background from '../components/Background';
import Conversation from '../components/Conversation';
import { getConversations } from '../store/ConversationReducer';
import { connect } from 'react-redux';
import { Set_Conversation } from '../store/actions';

const ConversationsScreen = (props) => {
  const gotoMessages = (conversation) => {
    props.dispatch(Set_Conversation(conversation));
    props.navigation.navigate('ConversationDetails');
  }

  useEffect(() => {
    props.dispatch(getConversations());
  },[]);

  return (
    <Background>
      <FlatList 
        style={{width: 380}}
        data={props.Conversation.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Conversation conversation={{...item, navigation: gotoMessages}}/>
        )}
        />
     
    </Background>
  );
}
const mapStateToProps = (state) => {
  const { Conversation } = state
  return { Conversation }
};

export default connect(mapStateToProps)(ConversationsScreen);