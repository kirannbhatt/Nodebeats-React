import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newss state domain
 */

const selectNewssDomain = state => state.get('newss', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Newss
 */

const makeSelectNewss = () =>
  createSelector(
    selectNewssDomain,
    substate => substate.get('newsResponse'),
  );

const makeSelectLoading = () =>
  createSelector(
    selectNewssDomain,
    substate => substate.get('loading'),
  );
const makeDeleteResponse = () =>
  createSelector(
    selectNewssDomain,
    substate => substate.get('deleteResponse'),
  );
export default makeSelectNewss;
export { makeDeleteResponse, makeSelectLoading, selectNewssDomain };
