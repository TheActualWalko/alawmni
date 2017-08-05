declare var allSubjects : string[];

import React = require('react');
import Hero from '../hero';
import Input from '../input';
import AutocompleteInput from '../autocomplete-input';
import {submittable} from './selectors';
import {
  updateSubjectName,
  updateFirstName,
  updateLastName,
  updateEmail,
  register
} from './actions';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

const Register = ({
  submittable, register,
  updateFirstName, updateLastName, updateEmail, updateSubjectName 
}) => (
  <div>
    <Hero />
    <form className="register" onSubmit={(e)=>{ 
      if (submittable) {
        register(); 
      }
      e.preventDefault(); 
      e.stopPropagation(); 
      return false;
    }}>
      <Input id="first-name-input" label="Enter your first name:" onChange={updateFirstName}/>
      <Input id="last-name-input" label="Enter your last name:" onChange={updateLastName}/>
      <Input email id="email-input" label="Enter your email:" onChange={updateEmail}/>
      <AutocompleteInput
        id="subject-input"
        label="Name of subject into which you have insight:"
        data={allSubjects}
        onChange={updateSubjectName}
      />
      <input 
        className={`submit ${submittable ? '' : 'disabled'}`} 
        disabled={!submittable}
        type="submit"
        title="Confirm"
      />
    </form>
  </div>
);

const mapStateToProps = createStructuredSelector({ submittable });
const mapDispatchToProps = {
  updateSubjectName,
  updateFirstName,
  updateLastName,
  updateEmail,
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);