import { apiCall, setToken } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import {addError} from './error';


export const setAuthToken = (token) => {
  setToken(token);
};

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser({}))
    setAuthToken(false);
  }
};

export function authUser(type, userData) {
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
      return apiCall("post", `http://localhost:8081/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          setAuthToken(token);
          dispatch(setCurrentUser(user));
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject(); // indicate the API call failed
        });
    });
  };
}
