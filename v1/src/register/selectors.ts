import subselect from '../subselect';
import {createSelector, createStructuredSelector} from 'reselect';

export const register = (state) => state.register;

const createRegisterSelector = subselect(register);

export const firmName = createRegisterSelector('firmName', '');
export const firm = createRegisterSelector('firm');
export const name = createRegisterSelector('name', '');
export const email = createRegisterSelector('email', '');
export const highlightIndex = createRegisterSelector('highlightIndex', -1);

export const submittable = createSelector(
  [firm, name, email],
  (firm, name, email) => !!firm && !!name && !!email
);

export const getAll = createStructuredSelector({
  firmName,
  firm,
  name,
  email,
  highlightIndex,
  submittable
});