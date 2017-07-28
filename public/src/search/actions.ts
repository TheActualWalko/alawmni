import $ = require('jquery');

export const UPDATE_SEARCH = 'alawmni/search/UPDATE_SEARCH';
export const updateSearch = (text: string)=>{
  return {
    type: UPDATE_SEARCH,
    text
  };
}

export const SELECT_FIRM = 'alawmni/search/SELECT_FIRM';
export const selectFirm = (firm: any)=>{
  return (dispatch, getState)=>{
    dispatch({
      type: SELECT_FIRM,
      firm
    });
    $.get('/get-students.php', {firm: firm.id}, (result)=>{
      const students = JSON.parse(result);
      console.log(students);
      dispatch(receiveStudents(students));
    });
  };
}


export const RECEIVE_STUDENTS = 'alawmni/search/RECEIVE_STUDENTS';
export const receiveStudents = (students: any[])=>{
  return {
    type: RECEIVE_STUDENTS,
    students
  };
}

export const MOVE_HIGHLIGHT_INDEX = 'alawmni/search/MOVE_HIGHLIGHT_INDEX';
export const moveHighlightIndex = (amount: number)=>{
  return {
    type: MOVE_HIGHLIGHT_INDEX,
    amount
  };
}