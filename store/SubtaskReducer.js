import axios from 'axios';
import { Set_Subtasks, SET_SUBTASKS, SET_CURRENT_SUBTASK, UPDATE_SUBTASKS_BY_STATUS } from './actions';
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
            console.log("subtasks", data);
            dispatch(Set_Subtasks(data));
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

// export const updateSubtasks = (tasks) => (dispatch, getState) => {
//   (async () => {
//     try {
//       const user = await AsyncStorage.getItem('currentLoggedUser')
//       const currentLoggedUser = JSON.parse(user);
//       const userId = currentLoggedUser.user.id;
//       if(currentLoggedUser !== null) {
//         axios.post(API_URL + `/v1/tasks/updateMultipleSubtasks`, tasks,{
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
//           }
//         })
//         .then(
//           response => {
//             console.log("newdata", response.data)
//             dispatch(Update_Subtasks_By_Status(response.data))
//           },
//           err => {
//             console.log(err)
//           }
//         );
//       }
//     } catch(e) {
//       // error reading value
//       console.log(e)
//     }
//   })().catch(e => console.log("Caught: " + e));
// }

// export const updateSubtask = (taskId, data) => (dispatch, getState) => {
//   (async () => {
//     try {
//       const user = await AsyncStorage.getItem('currentLoggedUser')
//       const currentLoggedUser = JSON.parse(user);
//       const userId = currentLoggedUser.user.id;
//       if(currentLoggedUser !== null) {
//         axios.put(API_URL + `/v1/tasks/` + taskId, data,{
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
//           }
//         })
//         .then(
//           response => {
//             console.log("newdata", response.data)
//             dispatch(Set_Current_Subtask(response.data))
//           },
//           err => {
//             console.log(err)
//           }
//         );
//       }
//     } catch(e) {
//       // error reading value
//       console.log(e)
//     }
//   })().catch(e => console.log("Caught: " + e));
// }

// export const createSubtask = (data) => (dispatch, getState) => {
//   (async () => {
//     try {
//       const user = await AsyncStorage.getItem('currentLoggedUser')
//       const currentLoggedUser = JSON.parse(user);
//       if(currentLoggedUser !== null) {
//         axios.post(API_URL + `/v1/tasks/`, data,{
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
//           }
//         })
//         .then(
//           response => {
//             dispatch(Set_Current_Subtask(response.data));
//           },
//           err => {
//             console.log(err)
//           }
//         );
//       }
//     } catch(e) {
//       // error reading value
//       console.log(e)
//     }
//   })().catch(e => console.log("Caught: " + e));
// }

// const formatSubtasksByStatus = (items, key) => {
//   return items.reduce((group, task) => {
//     const { statusId } = task;
//     group[statusId] = group[statusId] ?? [];
//     group[statusId].push(task);
//     return group;
//   }, {});
// }

// export const setCurrentSubtask = (data) => (dispatch, getState) => {
//   dispatch(Set_Current_Subtask(data));
// }


export default logReducer;