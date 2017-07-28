import { Provider } from 'react-redux';
import React = require('react');
import Hero from './hero';
import Search from './search';
import Results from './results';
import store from './store';
export default class App extends React.Component<{},{}>{
  render() {
    return (
      <Provider store={store}>
        <main>
          <Hero />
          <Search />
          <Results />
        </main>
      </Provider>
    );
  }
}
