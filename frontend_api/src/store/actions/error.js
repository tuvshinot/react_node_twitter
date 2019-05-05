import * as actionTypes from '../actionTypes';

export const addError = error => ({
    type:actionTypes.ADD_ERROR,
    error
});

export const removeError = () => ({
    type:actionTypes.REMOVE_ERROR
});

