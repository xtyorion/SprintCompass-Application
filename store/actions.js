export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const SET_PROJECTS = "SET_PROJECTS";
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";
export const SET_LOGS = "SET_LOGS";
export const SET_CURRENT_LOG = "SET_CURRENT_LOG";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_TASKS = "SET_TASKS";
export const UPDATE_TASKS_BY_STATUS = "UPDATE_TASKS_BY_STATUS";
export const SET_CURRENT_TASK = "SET_CURRENT_TASK";
export const SET_SUBTASKS = "SET_SUBTASKS";
export const SET_CURRENT_SUBTASK = "SET_CURRENT_SUBTASK";
export const SET_PROJECT_REPORTS = "SET_PROJECT_REPORTS";
export const ADD_PROJECT = "ADD_PROJECT";
export const ADD_LOG = "ADD_LOG";
export const SET_CURRENT_TEAM = "SET_CURRENT_TEAM";
export const SET_AVAILABLE_USERS = "SET_AVAILABLE_USERS";

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
export const Set_Current_Log = (log) => ({
  type: SET_CURRENT_LOG,
  payload: log
})
export const Set_Current_User = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
})

export const Set_Tasks = (tasks) => ({
  type: SET_TASKS,
  payload: tasks
})
export const Update_Tasks_By_Status = (tasks) => ({
  type: UPDATE_TASKS_BY_STATUS,
  payload: tasks
})
export const Set_Current_Task = (task) => ({
  type: SET_CURRENT_TASK,
  payload: task
})
export const Set_Subtasks = (subtasks) => ({
  type: SET_SUBTASKS,
  payload: subtasks
})
export const Set_Current_Subtask = (subtask) => ({
  type: SET_CURRENT_SUBTASK,
  payload: subtask
})
export const Set_Project_Reports = (reports) => ({
  type: SET_PROJECT_REPORTS,
  payload: reports
})
export const Add_Project = (project) => ({
  type: ADD_PROJECT,
  payload: project
})
export const Add_Log = (log) => ({
  type: ADD_LOG,
  payload: log
})
export const Set_Current_Team = (team) => ({
  type: SET_CURRENT_TEAM,
  payload: team
})
export const Set_Available_Users = (users) => ({
  type: SET_AVAILABLE_USERS,
  payload: users
})