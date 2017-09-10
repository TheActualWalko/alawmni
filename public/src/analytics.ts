import {
  TYPING,
  SELECT_SUBJECT,
  CLICK_STUDENT
} from './search/actions';

import {
  REGISTER
} from './register/actions';

import $ = require('jquery');

import {debounce} from 'lodash';
import {LOCATION_CHANGE} from 'react-router-redux';

const track = (action, data) => {
  if (typeof window !== 'undefined') {
    $.post(
      '/track', 
      { action, data }
    );
  }
}

const trackLoad = (pathname) => {
  track('load', pathname);
}

const trackTyping = debounce((text) => {
  track('typing', text);
}, 500);

const trackSelectSubject = (subject) => {
  setTimeout(()=>track('selectSubject', subject), 500);
}

const trackClickStudent = (studentID) => {
  track('clickStudent', studentID);
}

const trackRegister = ({ email, firstName, lastName, subject }) => {
  track('register', `${firstName} ${lastName}`);
}

let lastText = '';

export default ({dispatch, getState}) => (next) => (action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      trackLoad(action.payload.pathname);
      break;
    case TYPING:
      if (action.text !== '' && action.text !== lastText) {
        lastText = action.text;
        trackTyping(action.text);
      }
      break;
    case SELECT_SUBJECT:
      trackSelectSubject(action.subject);
      break;
    case CLICK_STUDENT:
      trackClickStudent(action.studentID);
    case REGISTER:
      trackRegister(action);
  }
  next(action);
}