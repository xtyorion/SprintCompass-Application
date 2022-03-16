export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const GET_CONVERSATIONS = "GET_CONVERSATIONS";
export const GET_MESSAGES = "GET_MESSAGES";
export const SET_CONVERSATION = "SET_CONVERSATION";
export const ADD_MESSAGE = "ADD_MESSAGE";

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