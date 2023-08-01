import { userConstants } from "../actions/type/user.constants";

export function userDetail(state = {}, action) {
  switch (action.type) {
    case userConstants.GETUSER_REQUEST:
      return {
        getUser: null,
        user_data: null
      };
    case userConstants.GETUSER_SUCCESS:
      return {
        getuser: true,
        user_data: action.users.data
      };
    case userConstants.GETUSER_FAILURE:
      return {
        message: action.error,
        user_data: null
      };
    default:
      return state;
  }
}
