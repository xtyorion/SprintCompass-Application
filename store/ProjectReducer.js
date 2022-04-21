import axios from 'axios';
import { SET_PROJECTS, ADD_PROJECT, Set_Projects, SET_CURRENT_PROJECT, Set_Current_Project, SET_AVAILABLE_USERS, Set_Available_Users,
  Set_Project_Reports, SET_PROJECT_REPORTS, Add_Project} from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;
const INITIAL_STATE = {
  currentProject: {},
  items: [],
  reports: {},
  availableUsers: []
};

export const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_PROJECT:
      return {...state, currentProject: action.payload}
    case SET_PROJECTS:
      return {...state, items: action.payload}
    case ADD_PROJECT:
      state.items.push(action.payload)
      return state;
    case SET_PROJECT_REPORTS: 
      return {...state, reports: action.payload}
    case SET_AVAILABLE_USERS:
      return {...state, availableUsers: action.payload}
    default:
      return state
  }
};

export const getProjects = (userId) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      if(userId) {
        axios.get(API_URL + `/v1/users/` + userId + `/projects`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            const {data} = response;
            dispatch(Set_Projects(data));
            if (data!= null && data.length > 0){
              dispatch(Set_Current_Project(data[0]));
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
export const getProject = (projectId) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      if(projectId != undefined) {
        axios.get(API_URL + `/v1/projects/` + projectId,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            const {data} = response;
            dispatch(Set_Current_Project(data));
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
            dispatch(Add_Project(response.data));
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
export const getReports = (projectId) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
     
      const currentLoggedUser = JSON.parse(user);
      if(projectId != undefined) {
        axios.get(API_URL + `/v1/projects/` + projectId + `/getReports`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            const {data} = response;
            delete data.logSet["Product Backlog"];
            data.ProjectVelocity = data.TotalEstimatedPoints / Object.keys(data.logSet).length;
            dispatch(Set_Project_Reports(data));
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
export const getAvailableUsers = (projectId) =>  (dispatch, getState) =>{
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      if(projectId) {
        axios.get(API_URL + `/v1/projects/` + projectId + `/getAvailableUsers`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            const {data} = response;
            dispatch(Set_Available_Users(data));
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
export const updateProject = (projectId, data) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      const userId = currentLoggedUser.user.id;
      if(currentLoggedUser !== null) {
        axios.put(API_URL + `/v1/projects/` + projectId, data,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            dispatch(getProject(projectId));
            dispatch(getAvailableUsers(projectId));
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