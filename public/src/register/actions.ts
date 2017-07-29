import $ = require('jquery');
import {push} from 'react-router-redux';

export const UPDATE_FIRM_NAME = 'alawmni/register/UPDATE_FIRM_NAME';
export const updateFirmName = (text: string)=>{
  return {
    type: UPDATE_FIRM_NAME,
    text
  };
}

export const SELECT_FIRM = 'alawmni/register/SELECT_FIRM';
export const selectFirm = (firm: any)=>{
  return (dispatch, getState)=>{
    dispatch({
      type: SELECT_FIRM,
      firm
    });
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

export const MOVE_HIGHLIGHT_INDEX = 'alawmni/register/MOVE_HIGHLIGHT_INDEX';
export const moveHighlightIndex = (amount: number)=>{
  return {
    type: MOVE_HIGHLIGHT_INDEX,
    amount
  };
}

export const register = (email, firstName, lastName, firmID)=>{
  return (dispatch, getState) => {
    $.post(
      '/register.php', 
      { email, firstName, lastName, firmID }, 
      (result)=>{
        if (result === 'success') {
          alert('Registered successfully!');
          dispatch(push(''))
        } else {
          alert('There was an error: ' + result);
        }
      }
    );
  }
}