import {
  SELECT_SUBJECT,
  RECEIVE_STUDENTS,
  CLEAR
} from './actions';

export default (
  state: any = {
    subject: '',
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
        subject: '',
        students: [],
        highlightIndex: -1,
        isWaitingForStudents: false
      };
    case SELECT_SUBJECT:
      return {
        ...state,
        subject: action.subject,
        students: [],
        highlightIndex: -1,
        isWaitingForStudents: true
      };
    case RECEIVE_STUDENTS:
      const newState = {
        ...state,
        subject: action.subject,
        students: action.students,
        isWaitingForStudents: false,
      };
      return newState;
    default:
      return state;
  }
};
