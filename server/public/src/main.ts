import * as React    from 'react';
import * as ReactDOM from 'react-dom';
import Root from './root';
import store from './store';
import keyboard from './keyboard';

window['store'] = store;

keyboard();

ReactDOM.render(React.createElement(Root), document.getElementById('react-container'));
