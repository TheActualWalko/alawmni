import {
  UPDATE_FIRM_NAME,
  UPDATE_FIRST_NAME,
  UPDATE_LAST_NAME,
  UPDATE_EMAIL,
  SELECT_FIRM,
  MOVE_HIGHLIGHT_INDEX
} from './actions';

export default (
  state: any = {
    firmName: '',
    firm: undefined,
    firstName: '',
    lastName: '',
    email: '',
    highlightIndex: -1
  },
  action
) => {
  switch(action.type){
    case MOVE_HIGHLIGHT_INDEX:
      return {
        ...state,
        highlightIndex: Math.max(state.highlightIndex + action.amount, -1)
      };
    case UPDATE_FIRM_NAME:
      return {
        ...state,
        firmName: action.text,
        firm: undefined,
        highlightIndex: -1
      };
    case SELECT_FIRM:
      return {
        ...state,
        firmName: action.firm.name,
        firm: action.firm,
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
