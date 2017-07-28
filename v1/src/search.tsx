declare var firms : string[];

import {connect} from 'react-redux';
import {updateText, selectFirm} from './actions';

import React = require('react');

import AutocompleteInput from './autocomplete-input';

interface searchProps {
  text: string
  selected: string
  hasText: boolean
  autocompletes: string[]
  highlightIndex: number
  isWaitingForStudents: boolean
  updateText: (string) => void
  selectFirm: (string) => void
};

const search = (props: searchProps) => {
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
        onChange={(t) => updateText(t)}
        onSelect={(f) => selectFirm(f)}
        highlightIndex={highlightIndex}
      />
    </form>
  );
};


const mapStateToProps = (state) => {
  return {
    text: state.search.text,
    selected: state.search.firm,
    autocompletes: state.search.autocompletes,
    isWaitingForStudents: state.search.isWaitingForStudents,
    highlightIndex: state.search.highlightIndex,
    hasText: state.search.text !== '' && state.search.text !== undefined 
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectFirm: (newFirm: any) => {
      dispatch(selectFirm(newFirm));
    },
    updateText: (newText: string) => {
      dispatch(updateText(newText));
    }
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( search )