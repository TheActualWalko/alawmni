import $ = require('jquery');
import {push} from 'react-router-redux';
import {getAll} from './selectors';

export const UPDATE_SUBJECT_NAME = 'alawmni/register/UPDATE_SUBJECT_NAME';
export const updateSubjectName = (text: string)=>{
  return {
    type: UPDATE_SUBJECT_NAME,
    text
  };
}

export const UPDATE_FIRST_NAME = 'alawmni/register/UPDATE_FIRST_NAME';
export const updateFirstName = (text: string)=>{
  return {
    type: UPDATE_FIRST_NAME,
    text
  };
}

export const UPDATE_LAST_NAME = 'alawmni/register/UPDATE_LAST_NAME';
export const updateLastName = (text: string)=>{
  return {
    type: UPDATE_LAST_NAME,
    text
  };
}

export const UPDATE_EMAIL = 'alawmni/register/UPDATE_EMAIL';
export const updateEmail = (text: string)=>{
  return {
    type: UPDATE_EMAIL,
    text
  };
}

export const REGISTER = 'alawmni/register/REGISTER';
export const register = ()=>{
  return (dispatch, getState) => {
    const {email, firstName, lastName, subject, submittable} = getAll(getState());
    dispatch({
      type: REGISTER,
      firstName,
      lastName
    });
    $.post(
      '/register', 
      { email, firstName, lastName, subject }, 
      (result)=>{
        if (result === 'success') {
          alert('Registered successfully!');
          window.location.href = '/';
        } else {
          alert('There was an error: ' + result);
        }
      }
    );
  }
}