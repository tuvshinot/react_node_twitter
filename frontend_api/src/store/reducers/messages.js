import {LOAD_MESSAGES, END_FETCH_MESSAGE, START_FETCH_MESSAGE } from "../actionTypes";

const initialState = {
    messages : [],
    loading : false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return {...state, messages : action.messages};
    case START_FETCH_MESSAGE:
      return {...state, loading : true };
    case END_FETCH_MESSAGE:
      return {...state, loading : false };
    default:
      return state;
  }
};
