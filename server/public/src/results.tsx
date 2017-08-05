import React = require('react');
import {push} from 'react-router-redux';
import {isWaitingForStudents, subject, students} from './search/selectors';
import {contactEmail, recommendedSearchesText} from './static-selectors';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

const results = ({
  students, 
  subject, 
  contactEmail, 
  isWaitingForStudents, 
  recommendedSearchesText,
  push
})=>{
  return (
    <ul className="results">
      {isWaitingForStudents && <li className="loading">loading...</li> }
      { 
        students.map((s, i)=>{
          return (
            <li key={i} className={`student`}>
              <a href={`mailto:${s.email}`} rel="noopener">
                <h3><strong>{s.name}</strong> knows about <em>{subject}</em></h3>
                <h4>
                  <img src="img/email.png" alt="Email Icon"/>{s.email}
                </h4>
              </a>
            </li> 
          )
        })
      }
      <li className="main-footer">
        { 
          !!recommendedSearchesText 
          ? <p>{recommendedSearchesText}</p>
          : null
        }
        <p>
          If you would like to be a part of this database, please <a onClick={()=>push('register')}>click here to sign up.</a> Email <a href={`mailto:${contactEmail}`} target="_blank" rel="noopener">{contactEmail}</a> for any questions.
        </p>
      </li>
    </ul>
  );
};

const mapStateToProps = createStructuredSelector({
  isWaitingForStudents,
  students,
  subject,
  contactEmail,
  recommendedSearchesText
});

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(results)