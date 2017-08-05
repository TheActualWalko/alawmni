import React = require('react');
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

const Hero = ({clientWebsite, push}) => (
  <header className="main-header">
    <h1>
      <a onClick={()=>push('/')}>
        <span>Alumni</span>
        <span>Database</span>
      </a>
    </h1>
    <h2><a href={clientWebsite} title="Home" rel="noopener"><img src="img/logo.png" alt="Logo" /></a></h2>
  </header>
);

const mapStateToProps = (state) => ({
  clientWebsite: state.statics.clientWebsite
});

const mapDispatchToProps = {push}

export default connect(mapStateToProps, mapDispatchToProps)(Hero);