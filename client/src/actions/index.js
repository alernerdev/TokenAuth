import {AUTH_USER} from './types';
import axios from 'axios';

export const signup = (formProps) => {
    // with redux-thunk, you can return either action object or a function
    // offers total control over the dispatch process
    return function(dispatch) {
        axios.post('http://localhost:3090/signup', 
        {email: formProps.email, password: formProps.password})
    };
}