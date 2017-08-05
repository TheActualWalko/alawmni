import subselect from '../subselect';
import {createSelector, createStructuredSelector} from 'reselect';

export const register = (state) => state.register;

const createRegisterSelector = subselect(register);

export const subject = createRegisterSelector('subject');
export const firstName = createRegisterSelector('firstName', '');
export const lastName = createRegisterSelector('lastName', '');
export const email = createRegisterSelector('email', '');
export const highlightIndex = createRegisterSelector('highlightIndex', -1);

export const submittable = createSelector(
  [subject, firstName, lastName, email],
  (subject, firstName, lastName, email) => !!subject.trim() && !!firstName.trim() && !!lastName.trim() && !!email.trim()
);

export const getAll = createStructuredSelector({
  subject,
  firstName,
  lastName,
  email,
  submittable
});