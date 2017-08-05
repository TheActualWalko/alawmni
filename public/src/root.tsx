import React = require('react');
import { Provider } from 'react-redux';
import history from './history';
import store from './store';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Home from './home';
import Register from './register/register';

const wrapper = ({children}) => <div>{children}</div>;

export default class App extends React.Component<{statics: any},{}>{
  store = null
  componentWillMount() {
    this.store = store(this.props.statics);
  }
  render() {
    // for some reason these components aren't typechecking properly
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={history}>
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
          </main>
        </ConnectedRouter>
      </Provider>
    );
  }
}
