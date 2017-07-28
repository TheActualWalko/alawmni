import subselect from '../subselect';
import {createSelector, createStructuredSelector} from 'reselect';

export const register = (state) => state.register;

const createRegisterSelector = subselect(register);

export const firmName = createRegisterSelector('firmName', '');
export const firm = createRegisterSelector('firm');
export const firstName = createRegisterSelector('firstName', '');
export const lastName = createRegisterSelector('lastName', '');
export const email = createRegisterSelector('email', '');
export const highlightIndex = createRegisterSelector('highlightIndex', -1);

export const submittable = createSelector(
  [firm, firstName, lastName, email],
  (firm, firstName, lastName, email) => !!firm && !!firstName && !!lastName && !!email
);

export const getAll = createStructuredSelector({
  firmName,
  firm,
  firstName,
  lastName,
  email,
  highlightIndex,
  submittable
});