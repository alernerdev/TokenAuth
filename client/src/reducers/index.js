import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth';

export default combineReducers({
    auth: auth,
    // form key is required when using redux-form
    form: formReducer
});