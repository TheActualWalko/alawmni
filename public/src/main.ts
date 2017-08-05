declare var statics: any;

import * as React    from 'react';
import * as ReactDOM from 'react-dom';
import Root from './root';
import keyboard from './keyboard';

keyboard();

ReactDOM.render(React.createElement(Root, {statics}), document.getElementById('react-container'));
