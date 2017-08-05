import {
  UPDATE_SUBJECT_NAME,
  UPDATE_FIRST_NAME,
  UPDATE_LAST_NAME,
  UPDATE_EMAIL
} from './actions';

export default (
  state: any = {
    subject: '',
    firstName: '',
    lastName: '',
    email: '',
    highlightIndex: -1
  },
  action
) => {
  switch(action.type){
    case UPDATE_SUBJECT_NAME:
      return {
        ...state,
        subject: action.text,
        highlightIndex: -1
      };
    case UPDATE_FIRST_NAME:
      return {
        ...state,
        firstName: action.text,
        highlightIndex: -1
      };
    case UPDATE_LAST_NAME:
      return {
        ...state,
        lastName: action.text,
        highlightIndex: -1
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.text,
        highlightIndex: -1
      };
    default:
      return state;
  }
};
