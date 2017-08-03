import $ = require('jquery');

export const CLEAR = 'alawmni/search/CLEAR';
export const clear = ()=>({
  type: CLEAR
})

export const SELECT_COMPANY = 'alawmni/search/SELECT_COMPANY';
export const selectCompany = (company: any)=>{
  return (dispatch, getState)=>{
    dispatch({
      type: SELECT_COMPANY,
      company
    });
    $.get(`/company/${encodeURIComponent(company)}/students`, (result)=>{
      const students = JSON.parse(result);
      dispatch(receiveStudents(students, company));
    });
  };
}


export const RECEIVE_STUDENTS = 'alawmni/search/RECEIVE_STUDENTS';
export const receiveStudents = (students: any[], company: string)=>({
  type: RECEIVE_STUDENTS,
  students, 
  company
});