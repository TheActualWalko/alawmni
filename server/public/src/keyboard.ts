declare var firms: string[];

import store from './store';
import getAutocompletes from './get-autocompletes';

import * as searchActions from './search/actions';
import * as registerActions from './register/actions';

const getActionsForRoute = () => {
  const state = store.getState();
  const route = state.routing.location.pathname;
  if (route.includes('/register')) {
    return registerActions;
  } else {
    return searchActions;
  }
}

const getStateForRoute = () => {
  const state = store.getState();
  const route = state.routing.location.pathname;
  if (route.includes('/register')) {
    return state.register;
  } else {
    return state.search;
  }
}

const getFirmNameForRoute = () => {
  const state = store.getState();
  const route = state.routing.location.pathname;
  if (route.includes('/register')) {
    return state.register.firmName;
  } else {
    return state.search.text;
  }
}

export default () => window.addEventListener('keydown', (event)=>{
  const actionSet = getActionsForRoute();
  const state = getStateForRoute();
  if(event.key === 'ArrowDown'){
    store.dispatch(actionSet.moveHighlightIndex(1));
    event.preventDefault();
    event.stopPropagation();
  }else if(event.key === 'ArrowUp'){
    store.dispatch(actionSet.moveHighlightIndex(-1));
    event.preventDefault();
    event.stopPropagation();
  }else if(event.key === 'Enter'){
    const firmName = getFirmNameForRoute();
    if(state.firm === undefined || firmName !== state.firm.name){
      const action: any = actionSet.selectFirm(getAutocompletes(firms, firmName)[state.highlightIndex]);
      store.dispatch(action);
      event.preventDefault();
      event.stopPropagation();
    }
  }
});