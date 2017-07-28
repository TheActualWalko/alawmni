declare var firms : string[];

import React = require('react');
import Hero from './hero';
import Input from './input';
import AutocompleteInput from './autocomplete-input';
import {getAll} from './register/selectors';
import {
  updateFirmName,
  updateName,
  updateEmail,
  selectFirm
} from './register/actions';
import {connect} from 'react-redux';

const Register = ({
  name, email, firmName, firm, highlightIndex, submittable,
  updateName, updateEmail, updateFirmName, selectFirm
}) => (
  <div>
    <Hero />
    <form className="register">
      <Input text={name} id="name-input" label="Enter your name:" onChange={updateName}/>
      <Input text={email} id="email-input" email label="Enter your email:" onChange={updateEmail}/>
      <AutocompleteInput
        id="firm-input"
        label="Which firm do you know about?"
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
  updateName,
  updateEmail,
  selectFirm
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);