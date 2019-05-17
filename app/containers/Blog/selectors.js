import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blog state domain
 */

const selectBlogDomain = state => state.get('blog', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Blog
 */

const makeSelectBlog = () =>
  createSelector(
    selectBlogDomain,
    substate => substate.toJS(),
  );

export default makeSelectBlog;
export { selectBlogDomain };
