import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newsCategory state domain
 */

const selectNewsCategoryDomain = state =>
  state.get('newsCategory', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewsCategory
 */

const makeSelectNewsCategory = () =>
  createSelector(
    selectNewsCategoryDomain,
    substate => substate.get('newsCategoryResponse'),
  );
const   makeSelectDeleteNewsCategory = () =>
  createSelector(
    selectNewsCategoryDomain,
    substate => substate.get('deleteCategoryResponse'),
  );
export default makeSelectNewsCategory;
export { makeSelectDeleteNewsCategory, selectNewsCategoryDomain };
