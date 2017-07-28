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
  selectFirm
} from './register/actions';
import {connect} from 'react-redux';

const Register = ({
  firstName, lastName, email, firmName, firm, highlightIndex, submittable,
  updateFirstName, updateLastName, updateEmail, updateFirmName, selectFirm
}) => (
  <div>
    <Hero />
    <form className="register">
      <Input text={firstName} id="first-name-input" label="Enter your first name:" onChange={updateFirstName}/>
      <Input text={lastName} id="last-name-input" label="Enter your last name:" onChange={updateLastName}/>
      <Input text={email} id="email-input" email label="Enter your email:" onChange={updateEmail}/>
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
      <button className={`submit ${submittable ? '' : 'disabled'}`}>Confirm</button>
    </form>
  </div>
);

const mapStateToProps = getAll;
const mapDispatchToProps = {
  updateFirmName,
  updateFirstName,
  updateLastName,
  updateEmail,
  selectFirm
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);