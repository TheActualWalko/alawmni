declare var subjects : string[];

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectSubject, clear} from './actions';
import {getAll} from './selectors';

import React = require('react');

import AutocompleteInput from '../autocomplete-input';

interface searchProps {
  subject: any
  selectSubject: (string) => void
  clear: () => void
};

const search = (props: searchProps) => {
  const { 
    subject, 
    selectSubject,
    clear
  } = props;
  return (
    <form className="search" onSubmit={(e) => {
      e.preventDefault(); 
      e.stopPropagation(); 
      return false;
    }}>
      <AutocompleteInput
        id="search-input"
        label="Enter Name of Firm:"
        data={subjects}
        onSelect={selectSubject}
        onChange={clear}
      />
    </form>
  );
};


const mapStateToProps = getAll;
const mapDispatchToProps = {selectSubject, clear};

export default connect(mapStateToProps, mapDispatchToProps)(search);