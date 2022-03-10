import { createStore, combineReducers, applyMiddleware } from "redux"

import UserReducer from "./UserReducer"
import LoginReducer from "./LoginReducer"

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  User: UserReducer,
  Login: LoginReducer
});

export default createStore(rootReducer, applyMiddleware(thunk))
