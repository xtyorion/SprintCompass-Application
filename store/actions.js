export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";

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