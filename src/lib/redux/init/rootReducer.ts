// Core
import { combineReducers } from 'redux';

// Reducers
import { authReducer as auth, taskReducer as task, tagReducer as tag } from '../reducers';


export const rootReducer = combineReducers({
    auth,
    task,
    tag,
});
