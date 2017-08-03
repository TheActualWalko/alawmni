import {
  UPDATE_COMPANY_NAME,
  UPDATE_FIRST_NAME,
  UPDATE_LAST_NAME,
  UPDATE_EMAIL
} from './actions';

export default (
  state: any = {
    company: '',
    firstName: '',
    lastName: '',
    email: '',
    highlightIndex: -1
  },
  action
) => {
  switch(action.type){
    case UPDATE_COMPANY_NAME:
      return {
        ...state,
        company: action.text,
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
