import {ClientStatics} from './client-statics';

declare var statics: ClientStatics;

import reduxThunk from './redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import search from './search/reducer';
import register from './register/reducer';
import history from './history';

const reducer = combineReducers({
  search, 
  register,
  routing
});

const store = applyMiddleware(reduxThunk, routerMiddleware(history))(createStore)(reducer, undefined);
const titleElement: any = document.querySelector('title');
titleElement.innerText = statics.docTitle;

export default store;