import axios from 'axios';
import { Login, LOGIN, Signup, SIGNUP, Logout, LOGOUT, Set_Current_User } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;


const INITIAL_STATE = {
  isLoggedIn: false,
  auth: {}
};

export const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, auth: action.payload.tokens, isLoggedIn: true}
    case SIGNUP:
      return {...state, auth: action.payload.tokens, isLoggedIn: true}
    case LOGOUT:
      return {...state, auth: action.payload.auth, isLoggedIn: action.payload.isLoggedIn}
    default:
      return state
  }
};

export const login = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.post(API_URL + `/v1/auth/login`, data,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(
      response => {
        console.log("Tokens for testing: ",response.data.tokens)
        dispatch(Login(response.data.tokens))
        dispatch(Set_Current_User(response.data.user))
        saveCredentials(response.data);
        
        return resolve();
        //save to localstorage
        
      },
      err => {
        return reject(err);
      }
    );
  });
}
const saveCredentials = async(data) => {
  try {
    data = JSON.stringify(data);
    await AsyncStorage.setItem('currentLoggedUser',data);
  } catch (error) {
    // Error saving data
    console.log(error)
  }
}

export const signup = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    console.log("signup");
    axios.post(API_URL + `/v1/auth/register`, data,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(
      response => {
        dispatch(Signup(response.data))
        return resolve();
        //save to localstorage
        
      },
      err => {
        return reject(err);
      }
    );
  });
}

export const logout = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch(Logout(INITIAL_STATE))
    return resolve();
  });
}


export default loginReducer;