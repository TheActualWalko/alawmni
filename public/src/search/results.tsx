import React = require('react');
import {isWaitingForStudents, subject, students} from './selectors';
import {clickStudent} from './actions';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

const results = ({
  students, 
  subject, 
  isWaitingForStudents,
  clickStudent
})=>{
  return (
    <ul className="results">
      {isWaitingForStudents && <li className="loading">loading...</li> }
      { 
        students.map((s, i)=>{
          return (
            <li key={i} className={`student`}>
              <a href={`mailto:${s.email}`} rel="noopener" onClick={()=>clickStudent(s.id)}>
                <h3><strong>{s.name}</strong> knows about <em>{subject}</em></h3>
                <h4>
                  <img src="img/email.png" alt="Email Icon"/>{s.email}
                </h4>
              </a>
            </li> 
          )
        })
      }
    </ul>
  );
};

const mapStateToProps = createStructuredSelector({
  isWaitingForStudents,
  students,
  subject
});

const mapDispatchToProps = {clickStudent};

export default connect(mapStateToProps, mapDispatchToProps)(results)