import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import React = require('react');

const results = ({students, firm, isWaitingForStudents, hasAutocompletes, highlightIndex, toRegister})=>{
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
          If you would like to be a part of this database please <a onClick={toRegister}>click here to sign up.</a>
        </p>
        <p>
          Email <a href="mailto:kcllsgeneral@gmail.com" target="_blank">kcllsgeneral@gmail.com</a> for any questions.
        </p>
      </li>
    </ul>
  );
};


const mapStateToProps = (state) => ({
  highlightIndex: state.search.highlightIndex,
  hasAutocompletes: state.search.text !== state.search.firm,
  isWaitingForStudents: state.search.isWaitingForStudents,
  students: state.search.students,
  firm: state.search.firm
});
const mapDispatchToProps = (dispatch) => ({
  toRegister: () => dispatch(push('register'))
});
export default connect(mapStateToProps, mapDispatchToProps)(results)