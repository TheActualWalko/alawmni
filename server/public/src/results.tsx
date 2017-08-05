import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import React = require('react');

const results = ({students, subject, contactEmail, isWaitingForStudents, hasAutocompletes, highlightIndex, push})=>{
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
        <p>
          If you would like to be a part of this database, please <a onClick={()=>push('register')}>click here to sign up.</a>
        </p>
        <p>
          Email <a href={`mailto:${contactEmail}`} target="_blank" rel="noopener">{contactEmail}</a> for any questions.
        </p>
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => ({
  isWaitingForStudents: state.search.isWaitingForStudents,
  students: state.search.students,
  subject: state.search.subject,
  contactEmail: state.statics.contactEmail
});

const mapDispatchToProps = {push};

export default connect(mapStateToProps, mapDispatchToProps)(results)