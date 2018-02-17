// Action Creators

import * as types from './types';

export const updateUsername = (username) => {
    return {
        type: types.UPDATE_USERNAME,
        username
    };
};

export const addMessage = (content, username) => {
    const messageObj = {
        content,
        username
    };
    return {
        type: types.ADD_MESSAGE,
        messageObj
    };
};
