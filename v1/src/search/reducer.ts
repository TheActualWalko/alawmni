import {
  MOVE_HIGHLIGHT_INDEX,
  UPDATE_SEARCH,
  SELECT_FIRM,
  RECEIVE_STUDENTS
} from './actions';

export default (
  state: any = {
    text: '',
    firm: undefined,
    highlightIndex: -1,
    isWaitingForStudents: false,
    students: []
  },
  action
)=>{
  switch(action.type){
    case MOVE_HIGHLIGHT_INDEX:
      return {
        ...state,
        highlightIndex: Math.max(state.highlightIndex + action.amount, -1)
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        text: action.text,
        students: [],
        highlightIndex: -1
      };
    case SELECT_FIRM:
      return {
        ...state,
        text: action.firm.name,
        firm: action.firm,
        students: [],
        highlightIndex: -1,
        isWaitingForStudents: true
      };
    case RECEIVE_STUDENTS:
      return {
        ...state,
        students: action.students,
        isWaitingForStudents: false,
      };
    default:
      return state;
  }
};
