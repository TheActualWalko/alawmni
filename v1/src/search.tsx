declare var firms : string[];

import { connect } from "react-redux";
import { updateText, selectFirm } from "./actions";

import React = require("react");

import AutocompleteInput from "./autocomplete-input";

interface searchProps {
  text    : string
  selected : string
  hasText : boolean
  autocompletes : string[]
  highlightIndex : number
  isWaitingForStudents : boolean
  updateText : ( string )=>void
  selectFirm : ( string )=>void
};

const search = ( props : searchProps )=>{
  const { 
    text, 
    selected, 
    hasText, 
    autocompletes, 
    updateText,
    selectFirm,
    highlightIndex
  } = props;
  return (
    <form className="search">
      <AutocompleteInput 
        label="Enter Name of Firm:"
        text={text}
        data={firms}
        selected={selected}
        onChange={t=>updateText(t)}
        onSelect={f=>selectFirm(f)}
        highlightIndex={highlightIndex}
      />
    </form>
  );
};


const mapStateToProps = ( state )=>{
  return {
    text : state.text,
    selected : state.firm,
    autocompletes : state.autocompletes,
    isWaitingForStudents : state.isWaitingForStudents,
    highlightIndex : state.highlightIndex,
    hasText : state.text !== "" && state.text !== undefined 
  };
};
const mapDispatchToProps = ( dispatch )=>{
  return {
    selectFirm : ( newFirm : any )=>{
      dispatch( selectFirm( newFirm ) );
    },
    updateText : ( newText : string )=>{
      dispatch( updateText( newText ) );
    }
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( search )