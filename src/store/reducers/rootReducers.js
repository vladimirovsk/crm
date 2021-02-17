import {combineReducers} from 'redux';
import loginForm from './loginForm';
import authUser from './auth';

export default combineReducers({
  login: loginForm,
  auth: authUser
})