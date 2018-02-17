import userReducer from './userReducer';
import messageReducer from './messageReducer';
import {combineReducers} from 'redux';

function rootReducer(state = {name: 'Horizons'}, action) {
    switch (action.type) {
        default:
            return state;
    }
}
const mainReducer = combineReducers({userReducer, messageReducer, rootReducer});
export default mainReducer;
