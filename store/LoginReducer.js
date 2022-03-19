import axios from 'axios';
import { Login, LOGIN, Signup, SIGNUP, Logout, LOGOUT } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.API_URL;

const INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  auth: {}
};

export const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, current: action.payload.user, auth: action.payload.tokens, isLoggedIn: true}
    case SIGNUP:
      return {...state, current: action.payload.user, auth: action.payload.tokens, isLoggedIn: true}
    case LOGOUT:
      return {...state, current: action.payload.current, auth: action.payload.auth, isLoggedIn: action.payload.isLoggedIn}
    default:
      return state
  }
};

export const login = (data) => (dispatch, getState) => {
  console.log(API_URL);
  return new Promise((resolve, reject) => {
    axios.post(API_URL + `/v1/auth/login`, data,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(
      response => {
        
        dispatch(Login(response.data))
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