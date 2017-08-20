import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectSubject, clear, typing} from './actions';
import {subject} from './selectors';
import {searchInputTitle, subjectsWithStudents} from '../static-selectors';

import React = require('react');

import AutocompleteInput from '../autocomplete-input';


const search = ({ 
  subject, 
  selectSubject,
  typing,
  clear,
  searchInputTitle,
  subjectsWithStudents
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
        onChange={(text) => {
          if (text === '') {
            clear();
          } else if (subjectsWithStudents.indexOf(text) < 0) {
            typing(text);
          }
        }}
      />
    </form>
  );
};


const mapStateToProps = createStructuredSelector({
  search,
  searchInputTitle,
  subjectsWithStudents
});

const mapDispatchToProps = {selectSubject, clear, typing};

export default connect(mapStateToProps, mapDispatchToProps)(search);