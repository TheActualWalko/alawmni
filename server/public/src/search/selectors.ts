import subselect from '../subselect';
import {createSelector, createStructuredSelector} from 'reselect';

export const search = (state) => state.search;

const createSearchSelector = subselect(search);

export const company = createSearchSelector('company');
export const isWaitingForStudents = createSearchSelector('isWaitingForStudents', false);

export const getAll = createStructuredSelector({
  company,
  isWaitingForStudents
});