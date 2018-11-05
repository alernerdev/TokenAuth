import { AUTH_USER, AUTH_ERROR } from './types';
import axios from 'axios';

export const signupAction = (formProps, callback) => {
  // with redux-thunk, you can return either action object or a function
  // offers total control over the dispatch process
  return async function(dispatch) {
    try {
      const response = await axios.post("http://localhost:3090/signup", {
        email: formProps.email,
        password: formProps.password
      });
      dispatch({type: AUTH_USER, payload: response.data.token});
      localStorage.setItem('token', response.data.token);
      callback();
    } catch (e) {
      dispatch({ type: AUTH_ERROR, payload: "Email in use" });
    }
  }
}

export const signoutAction = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  };
}

export const signinAction = (formProps, callback) => {
  // with redux-thunk, you can return either action object or a function
  // offers total control over the dispatch process
  return async function(dispatch) {
    try {
      const response = await axios.post("http://localhost:3090/signin", {
        email: formProps.email,
        password: formProps.password
      });
      dispatch({type: AUTH_USER, payload: response.data.token});
      localStorage.setItem('token', response.data.token);
      callback();
    } catch (e) {
      dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
    }
  }
}
