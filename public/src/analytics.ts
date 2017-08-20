import {
  TYPING,
  SELECT_SUBJECT
} from './search/actions';

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
  track('selectSubject', subject);
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
  }
  next(action);
}