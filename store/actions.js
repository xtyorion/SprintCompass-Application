export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const GET_CONVERSATIONS = "GET_CONVERSATIONS";
export const GET_MESSAGES = "GET_MESSAGES";
export const SET_CONVERSATION = "SET_CONVERSATION";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_USER_PROJECTS = "SET_USER_PROJECTS";
export const SET_PROJECT = "SET_PROJECT";
export const SET_PROJECT_LOGS = "SET_PROJECT_LOGS";

export const Logout = (user) => ({
  type: LOGOUT,
  payload: user
})
export const Login = (user) => ({
  type: LOGIN,
  payload: user
})
export const Signup = (user) => ({
  type: SIGNUP,
  payload: user
})
export const Get_Conversations = (conversations) => ({
  type: GET_CONVERSATIONS,
  payload: conversations
})
export const Get_Messages = (messages) => ({
  type: GET_MESSAGES,
  payload: messages
})
export const Set_Conversation = (conversation) => ({
  type: SET_CONVERSATION,
  payload: conversation
})
export const Add_Message = (message) => ({
  type: ADD_MESSAGE,
  payload: message
})
export const Set_User_Projects = (projects) => ({
  type: SET_USER_PROJECTS,
  payload: projects
})
export const Set_Project = (project) => ({
  type: SET_PROJECT,
  payload: project
})
export const Set_Project_Logs = (logs) => ({
  type: SET_PROJECT_LOGS,
  payload: logs
})
