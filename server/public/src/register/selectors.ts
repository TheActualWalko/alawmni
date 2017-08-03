import subselect from '../subselect';
import {createSelector, createStructuredSelector} from 'reselect';

export const register = (state) => state.register;

const createRegisterSelector = subselect(register);

export const company = createRegisterSelector('company');
export const firstName = createRegisterSelector('firstName', '');
export const lastName = createRegisterSelector('lastName', '');
export const email = createRegisterSelector('email', '');
export const highlightIndex = createRegisterSelector('highlightIndex', -1);

export const submittable = createSelector(
  [company, firstName, lastName, email],
  (company, firstName, lastName, email) => !!company.trim() && !!firstName.trim() && !!lastName.trim() && !!email.trim()
);

export const getAll = createStructuredSelector({
  company,
  firstName,
  lastName,
  email,
  submittable
});