import {
  SELECT_COMPANY,
  RECEIVE_STUDENTS,
  CLEAR
} from './actions';

export default (
  state: any = {
    company: '',
    highlightIndex: -1,
    isWaitingForStudents: false,
    students: []
  },
  action
)=>{
  switch(action.type){
    case CLEAR:
      return {
        ...state,
        company: '',
        students: [],
        highlightIndex: -1,
        isWaitingForStudents: false
      };
    case SELECT_COMPANY:
      return {
        ...state,
        company: action.company,
        students: [],
        highlightIndex: -1,
        isWaitingForStudents: true
      };
    case RECEIVE_STUDENTS:
      const newState = {
        ...state,
        company: action.company,
        students: action.students,
        isWaitingForStudents: false,
      };
      return newState;
    default:
      return state;
  }
};
