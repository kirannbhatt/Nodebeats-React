/*
 *
 * NewsCategory reducer
 *
 */

import { fromJS } from 'immutable';
import * as Type from './constants';
import { TabPane } from 'semantic-ui-react';

export const initialState = fromJS({
  loading: false,
  newsCategoryResponse: {},
  deleteCategoryResponse: {},
});

function newsCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case Type.FETCH_NEWS_CATEGORY:
      return state.merge({
        loading: true,
      });
    case Type.FETCH_NEWS_CATEGORY_SUCCESS:
      console.log(action.response, '>>> this is the response from action');
      return state.merge({
        loading: false,
        newsCategoryResponse: action.response,
      });

    case Type.FETCH_NEWS_CATEGORY_ERROR:
      return state.merge({
        loading: false,
        newsCategoryResponse: action.error,
      });
    case Type.DELETE_NEWS_CATEGORY:
      return state.merge({
        loading: true,
      });
    case Type.DELETE_NEWS_CATEGORY_SUCCESS:
      return state.merge({
        loading: false,
        deleteCategoryResponse: action.response,
      });
    case Type.DELETE_NEWS_CATEGORY_ERROR:
      return state.merge({
        loading: false,
        deleteCategoryResponse: action.error,
      });
    default:
      return state;
  }
}

export default newsCategoryReducer;
