declare var companies : string[];

import React = require('react');
import Hero from '../hero';
import Input from '../input';
import AutocompleteInput from '../autocomplete-input';
import {submittable} from './selectors';
import {
  updateCompanyName,
  updateFirstName,
  updateLastName,
  updateEmail,
  register
} from './actions';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

const Register = ({
  submittable, register,
  updateFirstName, updateLastName, updateEmail, updateCompanyName 
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
        id="company-input"
        label="Name of company into which you have insight:"
        data={companies}
        onChange={updateCompanyName}
      />
      <input 
        className={`submit ${submittable ? '' : 'disabled'}`} 
        disabled={!submittable}
        type="submit"
        title="Concompany"
      />
    </form>
  </div>
);

const mapStateToProps = createStructuredSelector({ submittable });
const mapDispatchToProps = {
  updateCompanyName,
  updateFirstName,
  updateLastName,
  updateEmail,
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);