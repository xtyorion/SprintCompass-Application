import axios from 'axios';
import { Set_Logs, SET_LOGS, Set_Current_Log, SET_CURRENT_LOG } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = {
  items: [],
  currentLog: {}
};

export const logReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOGS:
      return {...state, items: action.payload}
    case SET_CURRENT_LOG: 
      return {...state, currentLog: action.payload}
    default:
      return state
  }
};

export const getLogs = (projectId) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem('currentLoggedUser')
        const currentLoggedUser = JSON.parse(user);
        if(projectId && currentLoggedUser) {
          
          axios.get(API_URL + `/v1/projects/` + projectId +'/logs',{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
            }
          })
          .then(
            response => {
              const {data} = response;
              dispatch(Set_Logs(data));
              return resolve(data);
            },
            err => {
              return reject();
            }
          );
        }
      } catch(e) {
        // error reading value
        console.log(e)
      }
    })().catch(e => console.log("Caught: " + e));
  });
}

export const createLog = (data) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      const userId = currentLoggedUser.user.id;
      Object.assign(data,{userId: userId});
      console.log(data)
      if(currentLoggedUser !== null) {
        axios.post(API_URL + `/v1/logs/`, data,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            //dispatch(Add_Log({...data, id: Date.now(), senderId: currentLoggedUser.user}));
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



export default logReducer;