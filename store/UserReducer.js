import axios from 'axios';
import { SET_CURRENT_USER } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.REACT_APP_API_URL;

const INITIAL_STATE = {
  currentUser: {},
  items: []
};

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER : return {...state, currentUser: action.payload}
    default:
      return state
  }
};

export default usersReducer;