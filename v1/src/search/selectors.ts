import subselect from '../subselect';
import {createSelector, createStructuredSelector} from 'reselect';

export const search = (state) => state.search;

const createSearchSelector = subselect(search);

export const text = createSearchSelector('text', '');
export const firm = createSearchSelector('firm');
export const autocompletes = createSearchSelector('autocompletes', []);
export const isWaitingForStudents = createSearchSelector('isWaitingForStudents', false);
export const highlightIndex = createSearchSelector('highlightIndex', -1);
export const hasText = createSelector(
  text,
  (result) => !!result
 );

export const getAll = createStructuredSelector({
  text,
  firm,
  autocompletes,
  isWaitingForStudents,
  highlightIndex,
  hasText
});