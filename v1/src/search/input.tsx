declare var firms : string[];

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {updateSearch, selectFirm} from './actions';
import {getAll} from './selectors';

import React = require('react');

import AutocompleteInput from '../autocomplete-input';

interface searchProps {
  label: string
  text: string
  firm: any
  hasText: boolean
  autocompletes: string[]
  highlightIndex: number
  isWaitingForStudents: boolean
  updateSearch: (string) => void
  selectFirm: (string) => void
};

const search = (props: searchProps) => {
  const { 
    label,
    text, 
    firm, 
    hasText, 
    autocompletes, 
    updateSearch,
    selectFirm,
    highlightIndex
  } = props;
  return (
    <AutocompleteInput
      id="search-input"
      label={label}
      text={text}
      data={firms}
      selected={firm}
      onChange={updateSearch}
      onSelect={selectFirm}
      highlightIndex={highlightIndex}
    />
  );
};


const mapStateToProps = getAll;
const mapDispatchToProps = {
  selectFirm,
  updateSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(search);