import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNewsCategoryDomain = state =>
  state.get('newsCategory', initialState);

const makeSelectNewsCategory = () =>
  createSelector(
    selectNewsCategoryDomain,
    substate => substate.get('newsCategoryResponse'),
  );
const makeSelectDeleteNewsCategory = () =>
  createSelector(
    selectNewsCategoryDomain,
    substate => substate.get('deleteCategoryResponse'),
  );
export default makeSelectNewsCategory;
export { makeSelectDeleteNewsCategory, selectNewsCategoryDomain };
