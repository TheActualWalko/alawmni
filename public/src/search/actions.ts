import $ = require('jquery');

export const CLEAR = 'alawmni/search/CLEAR';
export const clear = ()=>({
  type: CLEAR
})

export const TYPING = 'alawmni/search/TYPING';
export const typing = (text)=>({
  type: TYPING,
  text
})

export const SELECT_SUBJECT = 'alawmni/search/SELECT_SUBJECT';
export const selectSubject = (subject: any)=>{
  return (dispatch, getState)=>{
    dispatch({
      type: SELECT_SUBJECT,
      subject
    });
    $.get(`/subject/${encodeURIComponent(subject)}/students`, (result)=>{
      const students = JSON.parse(result);
      dispatch(receiveStudents(students, subject));
    });
  };
}


export const RECEIVE_STUDENTS = 'alawmni/search/RECEIVE_STUDENTS';
export const receiveStudents = (students: any[], subject: string)=>({
  type: RECEIVE_STUDENTS,
  students, 
  subject
});


export const CLICK_STUDENT = 'alawmni/search/CLICK_STUDENT';
export const clickStudent = (studentID)=>({
  type: CLICK_STUDENT,
  studentID
});