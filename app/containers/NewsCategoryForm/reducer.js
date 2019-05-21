/*
 *
 * NewsCategoryForm reducer
 *
 */

import { fromJS } from 'immutable';
import * as Type from './constants';

export const initialState = fromJS({
  loading: true,
  addCategoryResponse: {},
  getCategoryResponse: {},
});

function newsCategoryFormReducer(state = initialState, action) {
  switch (action.type) {
    case Type.ADD_CATEGORY_REQUEST:
      return state.merge({
        loading: true,
      });
    case Type.ADD_CATEGORY_SUCCESS:
      return state.merge({
        loading: false,
        addCategoryResponse: action.response,
      });
    case Type.ADD_CATEGORY_ERROR:
      return state.merge({
        loading: false,
        addCategoryResponse: action.error,
      });
    case Type.GET_CATEGORY_BY_ID_REQUEST:
      return state.merge({
        loading: true,
      });
    case Type.GET_CATEGORY_BY_ID_SUCCESS:
      return state.merge({
        loading: false,
        getCategoryResponse: action.response,
      });
    case Type.GET_CATEGORY_BY_ID_ERROR:
      return state.merge({
        loading: false,
        getCategoryResponse: action.error,
      });
    default:
      return state;
  }
}

export default newsCategoryFormReducer;
