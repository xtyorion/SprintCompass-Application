import axios from 'axios';
import { Get_Messages, GET_MESSAGES, Add_Message, ADD_MESSAGE } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = {
  items: [],
};

export const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {...state, items: action.payload}
    case ADD_MESSAGE:
      state.items.push(action.payload)
      return state;
    default:
      return state
  }
};

export const getMessages = (data) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      if(currentLoggedUser !== null) {
        
        axios.get(API_URL + `/v1/messages/` + data,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            const {data} = response;
            dispatch(Get_Messages(data));
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

export const sendMessage = (data) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      if(currentLoggedUser !== null) {
        delete data.receiverId;
        axios.post(API_URL + `/v1/messages/`, Object.assign(data,{senderId: data.senderId.id}),{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            dispatch(Add_Message({...data, id: Date.now(), senderId: currentLoggedUser.user}));
          },
          err => {
            console.log(err)
          }
        );
      }
    } catch(e) {
      // error reading value
      console.log(e)
    }
  })().catch(e => console.log("Caught: " + e));
}



export default messageReducer;