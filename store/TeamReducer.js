import axios from 'axios';
import { Set_Current_Team, SET_CURRENT_TEAM } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = {
    currentTeam: [],
  };

export const teamReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_TEAM:
      return {...state, currentTeam: action.payload}
    default:
      return state
  }
};

export const getTeamList = (projectId) => (dispatch, getState) => {
  (async () => {
    try {
      const user = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(user);
      if(projectId) {
        axios.get(API_URL + `/v1/projects/` + projectId + `/team`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            const {data} = response;
            if (data!= null && data.length > 0){
              dispatch(Set_Current_Team(data));
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


export default teamReducer;
