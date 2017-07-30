declare var firms : string[];

import React = require('react');
import Hero from './hero';
import Input from './input';
import AutocompleteInput from './autocomplete-input';
import {getAll} from './register/selectors';
import {
  updateFirmName,
  updateFirstName,
  updateLastName,
  updateEmail,
  selectFirm,
  register
} from './register/actions';
import {connect} from 'react-redux';

const Register = ({
  firstName, lastName, email, firmName, firm, highlightIndex, submittable,
  updateFirstName, updateLastName, updateEmail, updateFirmName, selectFirm,
  register
}) => (
  <div>
    <Hero />
    <form className="register" onSubmit={(e)=>{ 
      if (submittable) {
        register(email.trim(), firstName.trim(), lastName.trim(), firmName.trim()); 
      }
      e.preventDefault(); 
      e.stopPropagation(); 
      return false;
    }}>
      <Input text={firstName} id="first-name-input" label="Enter your first name:" onChange={updateFirstName}/>
      <Input text={lastName} id="last-name-input" label="Enter your last name:" onChange={updateLastName}/>
      <Input text={email} email id="email-input" label="Enter your email:" onChange={updateEmail}/>
      <AutocompleteInput
        id="firm-input"
        label="Name of firm in which you have insight:"
        text={firmName}
        data={firms}
        selected={firm}
        onChange={updateFirmName}
        onSelect={selectFirm}
        highlightIndex={highlightIndex}
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

const mapStateToProps = getAll;
const mapDispatchToProps = {
  updateFirmName,
  updateFirstName,
  updateLastName,
  updateEmail,
  selectFirm,
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);