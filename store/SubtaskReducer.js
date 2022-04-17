import axios from 'axios';
import { Set_Subtasks, SET_SUBTASKS, SET_CURRENT_SUBTASK, UPDATE_SUBTASKS_BY_STATUS, Set_Current_Subtask } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = {
  items: {},
  currentSubtask: {}
};

export const logReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SUBTASKS:
      return {...state, items: action.payload}
    case SET_CURRENT_SUBTASK: 
      return {...state, currentSubtask: action.payload}
    case UPDATE_SUBTASKS_BY_STATUS:
      return {...state, items: {...state.items, [action.payload[0].statusId]: action.payload}}
    default:
      return state
  }
};

export const getSubtasks = (taskId) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      if(taskId && currentLoggedUser) {
        
        axios.get(API_URL + `/v1/tasks/` + taskId +'/subtasks',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            const {data} = response;
            dispatch(Set_Subtasks(data));
          },
          err => {
          }
        );
      } else {
        dispatch(Set_Subtasks([]));
      }
    } catch(e) {
      // error reading value
      console.log(e)
    }
  })().catch(e => console.log("Caught: " + e));
}
export const createSubtask = (data) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      if(currentLoggedUser !== null) {
        axios.post(API_URL + `/v1/subtasks/`, data,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            dispatch(Set_Current_Subtask(response.data));
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
export const updateSubtask = (subtaskId, data) => (dispatch, getState) => {
  (async () => {
    try {
      console.log(data)
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      const userId = currentLoggedUser.user.id;
      if(currentLoggedUser !== null) {
        axios.put(API_URL + `/v1/subtasks/` + subtaskId, data,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            console.log("newdata", response.data)
            dispatch(Set_Current_Subtask(response.data))
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