import axios from 'axios';
import { GET_PROJECTS, ADD_PROJECT } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = {
  items: [],
};

export const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {...state, items: action.payload}
    case ADD_PROJECT:
      state.items.push(action.payload)
      return state;
    default:
      return state
  }
};

// export const getProjects = (data) => (dispatch, getState) => {
//   (async () => {
//     try {
//       const user = await AsyncStorage.getItem('currentLoggedUser')
//       const currentLoggedUser = JSON.parse(user);
//       if(currentLoggedUser !== null) {
        
//         axios.get(API_URL + `/v1/projects/` + data,{
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
//           }
//         })
//         .then(
//           response => {
//             const {data} = response;
//             dispatch(Get_Projects(data));
//           },
//           err => {
//           }
//         );
//       }
//     } catch(e) {
//       // error reading value
//       console.log(e)
//     }
//   })().catch(e => console.log("Caught: " + e));
//}

export const createProject = (data) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      const userId = currentLoggedUser.user.id;
      Object.assign(data,{userId: userId});
      console.log(data)
      if(currentLoggedUser !== null) {
        axios.post(API_URL + `/v1/projects/`, data,{
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



export default projectReducer;