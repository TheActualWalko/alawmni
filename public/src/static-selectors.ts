import subselect from './subselect';
import {createSelector, createStructuredSelector} from 'reselect';

export const statics = (state) => state.statics;

const createStaticsSelector = subselect(statics);

export const searchInputTitle = createStaticsSelector('searchInputTitle', '');
export const contactEmail = createStaticsSelector('contactEmail', '');
export const recommendedSearchesText = createStaticsSelector('recommendedSearchesText', null);
export const registrationSubjectInputTitle = createStaticsSelector('registrationSubjectInputTitle', '');