import React = require('react');
import {push} from 'react-router-redux';
import {contactEmail, recommendedSearchesText} from './static-selectors';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

const footer = ({recommendedSearchesText, contactEmail, push}) => (
  <footer className="main-footer">
    { 
      !!recommendedSearchesText 
      ? <p>{recommendedSearchesText}</p>
      : null
    }
    <p>
      If you would like to be a part of this database, please <a onClick={()=>push('register')}>click here to sign up.</a>
    </p>
    <p>
      Email <a href={`mailto:${contactEmail}`} target="_blank" rel="noopener">{contactEmail}</a> for any questions.
    </p>
  </footer>
);


const mapStateToProps = createStructuredSelector({
  contactEmail,
  recommendedSearchesText
});

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(footer);