import axios from 'axios';
import { SET_CURRENT_USER } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = {
    currentTeamList: {},
    items: []
  };

 export const teamReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SET_CURRENT_TEAMLIST:
        return {...state, currentTeamList: action.payload}
      case SET_TEAMLIST:
        return {...state, items: action.payload}
      case ADD_TEAMLIST:
        state.items.push(action.payload)
        return state;
      default:
        return state
    }
  };


export const teamlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: return { ...state, currentUser: action.payload }
    default:
      return state
  }
};

export const createTeamList = (data) => (dispatch, getState) => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem('currentLoggedUser')
        const currentLoggedUser = JSON.parse(user);
        const userId = currentLoggedUser.user.id;
        Object.assign(data,{userId: userId});
        console.log(data)
        if(currentLoggedUser !== null) {
          axios.post(API_URL + `/v1/users/`, data,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
            }
          })
          .then(
            response => {
              //dispatch(Add_Project({...data, id: Date.now(), senderId: currentLoggedUser.user}));
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
  
  export const getTeamList = (userId) => (dispatch, getState) => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem('currentLoggedUser')
        const currentLoggedUser = JSON.parse(user);
        if(userId) {
          axios.get(API_URL + `/v1/users/` + userId + `/users`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
            }
          })
          .then(
            response => {
              const {data} = response;
              dispatch(SET_TEAMLIST(data));
              if (data!= null && data.length > 0){
                dispatch(SET_CURRENT_TEAMLIST(data[0]));
              }
              
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


export default teamlistReducer;
