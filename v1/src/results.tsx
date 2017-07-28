import {connect} from 'react-redux';
import React = require('react');

const results = ({students, firm, isWaitingForStudents, hasAutocompletes, highlightIndex})=>{
  return (
    <ul className="results">
      {isWaitingForStudents && <li className="loading">loading...</li> }
      { 
        students.map((s, i)=>{
          return (
            <li key={i} className={`student ${(!hasAutocompletes && highlightIndex === i) && 'active'}`}>
              <a href={`mailto:${s.email}`}>
                <h3><strong>{s.name}</strong> knows about <em>{firm.name}</em></h3>
                <h4>
                  <img src="img/email.png" />{s.email}
                </h4>
              </a>
            </li> 
          )
        })
      }
      <li className="main-footer">
        <p>
          If you would like to be a part of this database please <a href="http://bit.ly/kclls-adp">click here to sign up.</a>
        </p>
        <p>
          Email <a href="mailto:kcllsgeneral@gmail.com" target="_blank">kcllsgeneral@gmail.com</a> for any questions.
        </p>
      </li>
    </ul>
  );
};


const mapStateToProps = (state)=>{
  return {
    highlightIndex: state.highlightIndex,
    hasAutocompletes: state.text !== state.firm,
    isWaitingForStudents: state.isWaitingForStudents,
    students: state.students,
    firm: state.firm
  };
};
export default connect(mapStateToProps)(results)