import {
  UPDATE_FIRM_NAME,
  UPDATE_NAME,
  UPDATE_EMAIL,
  SELECT_FIRM,
  MOVE_HIGHLIGHT_INDEX
} from './actions';

export default (
  state: any = {
    firmName: '',
    firm: undefined,
    name: '',
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
    case UPDATE_NAME:
      return {
        ...state,
        name: action.text,
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
