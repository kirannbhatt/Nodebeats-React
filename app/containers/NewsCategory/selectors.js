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
    substate => substate.toJS(),
  );

export default makeSelectNewsCategory;
export { selectNewsCategoryDomain };
