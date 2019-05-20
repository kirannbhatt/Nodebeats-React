import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newsCategoryForm state domain
 */

const selectNewsCategoryFormDomain = state =>
  state.get('newsCategoryForm', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewsCategoryForm
 */

const makeSelectNewsCategoryForm = () =>
  createSelector(
    selectNewsCategoryFormDomain,
    substate => substate.toJS(),
  );
const makeSelectGeyNewsCategoryById = () =>
  createSelector(
    selectNewsCategoryFormDomain,
    substate => substate.get('getCategoryResponse'),
  );

export default makeSelectNewsCategoryForm;
export { makeSelectGeyNewsCategoryById, selectNewsCategoryFormDomain };
