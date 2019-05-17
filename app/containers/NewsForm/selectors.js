import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newsForm state domain
 */

const selectNewsFormDomain = state => state.get('newsForm', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewsForm
 */

const makeSelectNewsForm = () =>
  createSelector(
    selectNewsFormDomain,
    substate => substate.toJS(),
  );
const makeSelectNewsById = () =>
  createSelector(
    selectNewsFormDomain,
    substate => substate.get('newsResponse'),
  );
export default makeSelectNewsForm;
export { makeSelectNewsById, selectNewsFormDomain };
