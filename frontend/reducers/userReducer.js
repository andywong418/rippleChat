import * as types from '../actions/types';

const defaultState = {
    username: ''
};

const copyState = (state) => {
    return Object.assign({}, state);
};

export default function(state = defaultState, action) {
    const newState = copyState(state);
    switch(action.type) {
        case(types.UPDATE_USERNAME):
            newState.username = action.username;
            return newState;
        default:
            return state;
    }
}
