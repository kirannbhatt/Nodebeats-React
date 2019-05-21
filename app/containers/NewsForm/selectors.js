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
const makeSelectNewsCategory = () =>
  createSelector(
    selectNewsFormDomain,
    substate => substate.get('categoryResponse'),
  );
export default makeSelectNewsForm;
export { makeSelectNewsCategory, makeSelectNewsById, selectNewsFormDomain };
