declare var companies : string[];

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCompany, clear} from './actions';
import {getAll} from './selectors';

import React = require('react');

import AutocompleteInput from '../autocomplete-input';

interface searchProps {
  label: string
  company: any
  selectCompany: (string) => void
  clear: () => void
};

const search = (props: searchProps) => {
  const { 
    label,
    company, 
    selectCompany,
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
        label={label}
        data={companies}
        onSelect={selectCompany}
        onChange={clear}
      />
    </form>
  );
};


const mapStateToProps = getAll;
const mapDispatchToProps = {selectCompany, clear};

export default connect(mapStateToProps, mapDispatchToProps)(search);