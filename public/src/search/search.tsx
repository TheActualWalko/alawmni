declare var subjectsWithStudents : string[];

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectSubject, clear} from './actions';
import {subject} from './selectors';
import {searchInputTitle} from '../static-selectors';

import React = require('react');

import AutocompleteInput from '../autocomplete-input';


const search = ({ 
  subject, 
  selectSubject,
  clear,
  searchInputTitle
}) => {
  return (
    <form className="search" onSubmit={(e) => {
      e.preventDefault(); 
      e.stopPropagation(); 
      return false;
    }}>
      <AutocompleteInput
        id="search-input"
        label={searchInputTitle}
        data={subjectsWithStudents}
        onSelect={selectSubject}
        onChange={clear}
      />
    </form>
  );
};


const mapStateToProps = createStructuredSelector({
  search,
  searchInputTitle
});

const mapDispatchToProps = {selectSubject, clear};

export default connect(mapStateToProps, mapDispatchToProps)(search);