import { userConstants } from "../actions/type/user.constants";

let user = localStorage.getItem("token");
const initialState = user ? { loggedIn: true, user, message: null } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOG_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOG_SUCCESS:
      return {
        loggedIn: true,
        user: action.user.data,
      };
    case userConstants.LOG_FAILURE:
      return {
        message: action.user.message,
      };
    case userConstants.REGISTER_REQUEST:
      return {
        registering: true,
        user: action.user,
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        registered: true,
        user: action.user.data,
      };
    case userConstants.REGISTER_FAILURE:
      return {
        message: action.user.message,
      };
    default:
      return state;
  }
}
