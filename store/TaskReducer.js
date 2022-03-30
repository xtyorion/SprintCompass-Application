import axios from 'axios';
import { Set_Tasks, SET_TASKS, Update_Tasks_By_Status, SET_CURRENT_TASK, UPDATE_TASKS_BY_STATUS, Set_Current_Task } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = {
  items: {},
  currentTask: {}
};

export const logReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TASKS:
      return {...state, items: action.payload}
    case SET_CURRENT_TASK: 
      return {...state, currentTask: action.payload}
    case UPDATE_TASKS_BY_STATUS:
      return {...state, items: {...state.items, [action.payload[0].statusId]: action.payload}}
    default:
      return state
  }
};

export const getTasks = (logId) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      if(logId && currentLoggedUser) {
        
        axios.get(API_URL + `/v1/logs/` + logId +'/tasks',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            const {data} = response;
            dispatch(Set_Tasks(formatTasksByStatus(data, 'statusId')));
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

export const updateTasks = (tasks) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      const userId = currentLoggedUser.user.id;
      if(currentLoggedUser !== null) {
        axios.post(API_URL + `/v1/tasks/updateMultipleTasks`, tasks,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            console.log("newdata", response.data)
            dispatch(Update_Tasks_By_Status(response.data))
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

export const updateTask = (taskId, data) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      const userId = currentLoggedUser.user.id;
      if(currentLoggedUser !== null) {
        axios.put(API_URL + `/v1/tasks/` + taskId, data,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            console.log("newdata", response.data)
            dispatch(Set_Current_Task(response.data))
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

export const createTask = (data) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      if(currentLoggedUser !== null) {
        axios.post(API_URL + `/v1/tasks/`, data,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            dispatch(Set_Current_Task(response.data));
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

const formatTasksByStatus = (items, key) => {
  return items.reduce((group, task) => {
    const { statusId } = task;
    group[statusId] = group[statusId] ?? [];
    group[statusId].push(task);
    return group;
  }, {});
}

export const setCurrentTask = (data) => (dispatch, getState) => {
  dispatch(Set_Current_Task(data));
}


export default logReducer;