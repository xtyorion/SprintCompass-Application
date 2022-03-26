export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const SET_PROJECTS = "SET_PROJECTS";
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";
export const SET_LOGS = "SET_LOGS";
export const SET_CURRENT_LOG = "SET_CURRENT_LOG";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

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
export const Set_Projects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects
})
export const Set_Current_Project = (project) => ({
  type: SET_CURRENT_PROJECT,
  payload: project
})
export const Set_Logs = (logs) => ({
  type: SET_LOGS,
  payload: logs
})
export const Set_Current = (log) => ({
  type: SET_CURRENT_LOG,
  payload: log
})
export const Set_Current_User = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
})
