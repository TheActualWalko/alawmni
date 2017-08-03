import $ = require('jquery');
import {push} from 'react-router-redux';
import {getAll} from './selectors';

export const UPDATE_COMPANY_NAME = 'alawmni/register/UPDATE_COMPANY_NAME';
export const updateCompanyName = (text: string)=>{
  return {
    type: UPDATE_COMPANY_NAME,
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

export const register = ()=>{
  return (dispatch, getState) => {
    const {email, firstName, lastName, company, submittable} = getAll(getState());
    $.post(
      '/register', 
      { email, firstName, lastName, company }, 
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