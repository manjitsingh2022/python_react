import { emailConstants } from "./type/email.constants";
import { userServices } from "../../services/user.services";
import { alertActions } from "./alert.actions";

export const emailActions={
    sendEmailData
}
function sendEmailData(subject,message,recipients,attachment) {

    return (dispatch) => {
      dispatch(request({subject,message,recipients,attachment}));
      userServices.emailSendData(subject,message,recipients,attachment).then(
        (email) => {
          if (email.code === 200) {
              dispatch(alertActions.success(email.message));
          } else {
              dispatch(alertActions.error(email.message));
          }
          dispatch(success({ email }));
      },
      (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
      }
      );
    };
    function request() {
      return { type: emailConstants.SEND_REQUEST };
    }
    function success(email) {
      return { type: emailConstants.SEND_SUCCESS, email };
    }
    function failure(error) {
      return { type: emailConstants.SEND_FAILURE, error };
    }
  }