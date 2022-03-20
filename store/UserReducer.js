import axios from 'axios';
import { Get_Prospect_Users, GET_PROSPECT_USERS } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = {
  prospectUsers: []
};

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROSPECT_USERS : return {...state, prospectUsers: action.payload}
    default:
      return state
  }
};

export const getProspectUsers = (data) => (dispatch, getState) => {
  (async () => {
    try {
      const data = await AsyncStorage.getItem('currentLoggedUser')
      const currentLoggedUser = JSON.parse(data);
      const userId = currentLoggedUser.user.id;
      if(currentLoggedUser !== null) {
        axios.get(API_URL + `/v1/users/` + userId + `/prospectUsers`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentLoggedUser.tokens.access.token
          }
        })
        .then(
          response => {
            const {data} = response;
            dispatch(Get_Prospect_Users(data))
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