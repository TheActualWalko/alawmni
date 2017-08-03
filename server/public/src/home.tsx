import React = require('react');
import Hero from './hero';
import Search from './search/search';
import Results from './results';

export default () => (
  <div>
    <Hero />
    <Search label="Enter Name of Firm:" />
    <Results />
  </div>
);