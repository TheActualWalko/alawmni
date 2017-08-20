import reduxThunk from './redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import search from './search/reducer';
import register from './register/reducer';
import analytics from './analytics';

export default (statics, history) => {
  const reducer = combineReducers({
    search, 
    register,
    routing,
    statics: (state, action) => statics
  });

  return applyMiddleware(reduxThunk, routerMiddleware(history), analytics)(createStore)(reducer, undefined);
};