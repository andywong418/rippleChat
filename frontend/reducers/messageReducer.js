import * as types from '../actions/types';

const defaultState = {
    messages: [],
};

const copyState = (state) => {
    return Object.assign({}, state);
};

export default function(state = defaultState, action) {
    const newState = copyState(state);
    switch(action.type) {
        case(types.ADD_MESSAGE):
            const newMessages = newState.messages.slice();
            newState.messages = newState.messages.concat(action.messageObj);
            return newState;
        default:
            return state;
    }
}
