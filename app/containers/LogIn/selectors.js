import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the logIn state domain
 */

const selectLogInDomain = state => state.get('logIn', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by LogIn
 */

const makeSelectLogIn = () =>
  createSelector(
    selectLogInDomain,
    substate => substate.get('loginResponse'),
  );

const makeSelectLoading = () =>
  createSelector(
    selectLogInDomain,
    state => state.get('loading'),
  );

const makeSelectPath = () =>
  createSelector(
    selectLogInDomain,
    state => state.get('path'),
  );
export default makeSelectLogIn;
export { selectLogInDomain, makeSelectPath };
