import { emailConstants } from "../actions/type/email.constants";

export function sendemail(state = {}, action,) {
  switch (action.type) {
    case emailConstants.SEND_REQUEST:
      return {
        getUser: null,
        email: null
      };
    case emailConstants.SEND_SUCCESS:
      return {
        getuser: true,
        email: action.email
      };
    case emailConstants.SEND_FAILURE:
      return {
        message: action.error,
        email: null
      };
    default:
      return state;
  }
}

