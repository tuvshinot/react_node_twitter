import {apiCall} from '../../services/api';
import {addError} from './error';
import * as actionTypes from '../actionTypes';

export const loadMessages = messages => ({
    type : actionTypes.LOAD_MESSAGES,
    messages
});

export const startLoadingMsg = () => ({
    type : actionTypes.START_FETCH_MESSAGE
});

export const endLoadingMsg = () => ({
    type : actionTypes.END_FETCH_MESSAGE
});

export const fetchMessages = () => {
    return dispatch => {
        dispatch(startLoadingMsg())
        return apiCall("get", "http://localhost:8081/api/messages").then(res => {
            dispatch(loadMessages(res))
            dispatch(endLoadingMsg())
        }).catch(err => {
            dispatch(addError(err));
            dispatch(endLoadingMsg())
        })
    };
}

export const postNewMessage = text => {
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const id = currentUser.user.id;
        return apiCall("post", `http://localhost:8081/api/users/${id}/messages`, { text })
        .then(res => {}).catch(err => {
            dispatch(addError(err));
        })
    };
}