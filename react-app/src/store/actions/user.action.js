import { userConstants } from "./type/user.constants";

  import { userServices } from "../../services/user.services";

import { alertActions } from "./alert.actions";

 



export const userActions={
    register,
    login,
    logout,
    getUserData
}

function register(username, email, password) {
  console.log(email);
  return (dispatch) => {
    dispatch(request({ username, email,password }));
    userServices.register(username, email, password).then(
      (user) => {
        console.log(user,'dssds')
        if (user.code === 200) {
          dispatch(success(user));
          window.location.href = "/login";
        } else {
          dispatch(failure(user));
        }
      },
      (error) => {
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }

  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }

  function failure(user) {
    return { type: userConstants.REGISTER_FAILURE, user };
  }
}



function login(email,password){

    return(dispatch)=>{
        dispatch(request({email}));
        userServices.login(email,password).then(
            (user)=>{
                if (user.code===200){
                    let token =user.data.token;
                    localStorage.setItem('token',token);
                    dispatch(success(user));
                    window.location.href="/";
                }else{
                    dispatch(failure(user));
                }
            },
            (error)=>{
                dispatch(alertActions.error(error.toString()));
            }
        )
    }
    function request (user){
        return {type:userConstants.LOG_REQUEST,user}
    }
    function success (user){
        return {type:userConstants.LOG_SUCCESS,user}
    }
    function failure (user){
        return {type:userConstants.LOG_FAILURE,user}
    }

}



function logout() {
  return (dispatch) => {
    dispatch(request());
    userServices.logout().then(
      (user) => {
        localStorage.removeItem('token');
        dispatch(success(user));
      },
      (error) => {
        console.log('Error fetching user data:', error);
      }
      );
      function request() {
        return { type: userConstants.LOGOUT_REQUEST};
      }
      function success (user){
        return {type:userConstants.LOGOUT_SUCCESS,user}
    }
  };
}







function getUserData() {
    return (dispatch) => {
      dispatch(request({}));
      userServices.getUserData().then(
        (users)=>dispatch(success(users)),
        (error)=>dispatch(failure(error))
      );
    
    };
  
    function request() {
      return { type: userConstants.GETUSER_REQUEST };
    }
    function success(users) {
      return { type: userConstants.GETUSER_SUCCESS, users };
    }
    function failure(error) {
      return { type: userConstants.GETUSER_FAILURE, error };
    }
  }



