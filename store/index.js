import { createStore, combineReducers, applyMiddleware } from "redux"

import UserReducer from "./UserReducer"
import LoginReducer from "./LoginReducer"
import ConversationReducer from "./ConversationReducer"
import MessageReducer from "./MessageReducer"

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  User: UserReducer,
  Login: LoginReducer,
  Conversation: ConversationReducer,
  Message: MessageReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk))
