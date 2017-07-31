import React = require('react');
import {connect} from 'react-redux';

const Hero = ({clientWebsite}) => (
  <header className="main-header">
    <h1>
      <span>Alumni</span><br />
      <span>Database</span>
    </h1>
    <h2><a href={clientWebsite}><img src="img/logo.png" /></a></h2>
  </header>
);

const mapStateToProps = (state) => ({
  clientWebsite: state.statics.clientWebsite
});

export default connect(mapStateToProps)(Hero);