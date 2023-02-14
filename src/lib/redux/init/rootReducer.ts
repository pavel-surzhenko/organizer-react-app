// Core
import { combineReducers } from 'redux';

// Reducers
import { authReducer as auth } from '../reducers';


export const rootReducer = combineReducers({
    auth,
});
