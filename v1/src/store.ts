declare var firms : string[];

import reduxThunk from "./redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { UPDATE_TEXT, SELECT_FIRM, RECEIVE_STUDENTS, MOVE_HIGHLIGHT_INDEX, moveHighlightIndex, selectFirm } from "./actions";

import getAutocompletes from "./get-autocompletes";

const reducer = (
  state : any = {
    text : "",
    firm : "",
    highlightIndex : -1,
    isWaitingForStudents : false,
    students : []
  },
  action
)=>{
  switch( action.type ){
    case MOVE_HIGHLIGHT_INDEX:
      return {
        text : state.text,
        firm : state.firm,
        students : state.students,
        isWaitingForStudents : false,
        highlightIndex : Math.max( state.highlightIndex + action.amount, -1 )
      };
    case UPDATE_TEXT:
      return {
        text : action.text,
        firm : state.firm,
        students : [],
        isWaitingForStudents : false,
        highlightIndex : -1
      };
    case SELECT_FIRM:
      return {
        text : action.firm.name,
        firm : action.firm,
        students : [],
        highlightIndex : -1,
        isWaitingForStudents : true
      };
    case RECEIVE_STUDENTS:
      return {
        text : state.text,
        firm : state.firm,
        students : action.students,
        isWaitingForStudents : false,
        highlightIndex : state.highlightIndex
      };
    default:
      return state;
  }
};

const store = applyMiddleware(reduxThunk)(createStore)(reducer);

window.addEventListener("keydown", ( event )=>{
  if( event.key === "ArrowDown" ){
    store.dispatch( moveHighlightIndex( 1 ) );
    event.preventDefault();
    event.stopPropagation();
  }else if( event.key === "ArrowUp" ){
    store.dispatch( moveHighlightIndex( -1 ) );
    event.preventDefault();
    event.stopPropagation();
  }else if( event.key === "Enter" ){
    const state = store.getState();
    if( state.firm === undefined || state.text !== state.firm.name ){
      const action : any = selectFirm( 
        getAutocompletes( firms, state.text )[ state.highlightIndex ] 
      );
      store.dispatch( action );
      event.preventDefault();
      event.stopPropagation();
    }else{
      window.location.href = "mailto:"+state.students[ state.highlightIndex ].email;
      event.preventDefault();
      event.stopPropagation();
    }
  }
});

export default store;