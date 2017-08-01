import React = require('react');
import {connect} from 'react-redux';

const Hero = ({clientWebsite}) => (
  <header className="main-header">
    <h1>
      <span>Alumni</span><br />
      <span>Database</span>
    </h1>
    <h2><a href={clientWebsite} title="Home" rel="noopener"><img src="img/logo.png" alt="Logo" /></a></h2>
  </header>
);

const mapStateToProps = (state) => ({
  clientWebsite: state.statics.clientWebsite
});

export default connect(mapStateToProps)(Hero);