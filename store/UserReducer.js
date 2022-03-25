import axios from 'axios';
import { SET_USER_PROJECTS, Set_User_Projects, Set_Project, SET_PROJECT } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = {
  projects: [],
  currentProject: {},
};

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_PROJECTS : return {...state, projects: action.payload}
    case SET_PROJECT : return {...state, currentProject: action.payload}
    default:
      return state
  }
};

export const getUserProjects = () => (dispatch, getState) => {
  (async () => {
    try {
      const data = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(data);
      const userId = currentLoggedUser.user.id;
      console.log("token", currentLoggedUser.tokens.access.token);
      if(currentLoggedUser !== null) {
        axios.get(API_URL + `/v1/users/` + userId + `/projects`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            const {data} = response;
            dispatch(Set_User_Projects(data));
            if (data!= null && data.length > 0){
              dispatch(Set_Project(data[0]));
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

export default usersReducer;