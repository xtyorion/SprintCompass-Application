import axios from 'axios';
import { Get_Conversations, GET_CONVERSATIONS, SET_CONVERSATION } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = {
  items: [],
  currentConversation: {}
};

export const conversationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {...state, items: action.payload}
    case SET_CONVERSATION:
      return {...state, currentConversation: action.payload}
    default:
      return state
  }
};

export const getConversations = (data) => (dispatch, getState) => {
  (async () => {
    try {
      const data = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(data);
      const userId = currentLoggedUser.user.id;
      if(currentLoggedUser !== null) {
        console.log("API", API_URL)
        axios.get(API_URL + `/v1/conversations/` + userId,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            const {data} = response;
            dispatch(Get_Conversations(extractUserFromMembers(data, userId)))
          },
          err => {
          }
        );
      }
    } catch(e) {
      // error reading value
      console.log(e)
    }
  })().catch(e => console.log("Caught: " + e));
}

const extractUserFromMembers = (data, userId) => {
  let index = 0;

  data.forEach((convo) => {
    index = convo.members.findIndex(x => x.id === userId);
    convo.members.splice(index, 1);
    convo.sender = convo.members[0];
    delete convo.members;
  });
  return data
}


export default conversationReducer;