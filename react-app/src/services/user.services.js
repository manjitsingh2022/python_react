import { apiUrl } from '../config';
import {authHeader} from "../services/http.header"
export const userServices={
  register,
  login,
  // logout,
  getUserData,
  emailSendData
}

function handleResponse(response) {
  return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      return data;
  });
}


// async function logout(){
//   const requestOptions={
//     method:"POSt",
//     headers: authHeader(),
//   }
//   try {
//     const response = await fetch(`${apiUrl}/users/logout/`, requestOptions);
//     const user = await handleResponse(response);
//     return user;
//   } catch (error) {
//     console.error('Error occurred:', error);
//     throw error;
//   }
// }


async function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  try {
    const response = await fetch(`${apiUrl}/users/login/`, requestOptions);
    const user = await handleResponse(response);
    return user;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
}

async function register(username,email,password){
  const requestOptions={
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({username,email,password})
  }
  try{
    const response= await fetch(`${apiUrl}/users/register/`,requestOptions);
    const user= await handleResponse(response)
    return user
  }catch(error){
    console.log(error,'Error Occurred:');
    throw error;
  }
}


async function getUserData() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  try {
    const response = await fetch(`${apiUrl}/users/me/`, requestOptions);
    const userData = await handleResponse(response);
    return userData;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error; 
  }
}


async function  emailSendData ( subject, message, recipients ,attachment)  {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(subject, message, recipients ,attachment),
  };

  try {
    const response = await fetch(`${apiUrl}/users/sendemail/`, requestOptions);
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
};
  