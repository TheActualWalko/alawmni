import React = require('react');
import Hero from './hero';
import Search from './search/input';
import Results from './results';

export default () => (
  <div>
    <Hero />
    <form className="search">
      <Search label="Enter Name of Firm:" />
    </form>
    <Results />
  </div>
);