import { createStore, combineReducers, applyMiddleware } from "redux"

import UserReducer from "./UserReducer"
import LoginReducer from "./LoginReducer"
import ConversationReducer from "./ConversationReducer"
import MessageReducer from "./MessageReducer"
import ProjectReducer from "./ProjectReducer"
import LogReducer from "./LogReducer"
import TaskReducer from "./TaskReducer"
import SubtaskReducer from "./SubtaskReducer"

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  User: UserReducer,
  Login: LoginReducer,
  Conversation: ConversationReducer,
  Message: MessageReducer,
  Project: ProjectReducer,
  Log: LogReducer,
  Task: TaskReducer,
  Subtask: SubtaskReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk))
