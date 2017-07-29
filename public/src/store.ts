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
  routing,
  statics: (state, action) => statics
});

const store = applyMiddleware(reduxThunk, routerMiddleware(history))(createStore)(reducer, undefined);

export default store;