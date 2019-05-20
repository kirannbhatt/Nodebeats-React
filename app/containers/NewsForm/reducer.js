/*
 *
 * NewsForm reducer
 *
 */

import { fromJS } from 'immutable';
import * as Type from './constants';

export const initialState = fromJS({
  loading: false,
  newsResponse: {},
  editResponse: {},
  addResponse: {},
  categoryResponse: {},
});

function newsFormReducer(state = initialState, action) {
  switch (action.type) {
    case Type.ADD_NEWS_REQUEST:
      return state.merge({
        loading: true,
      });
    case Type.ADD_NEWS_SUCCESS:
      return state.merge({
        loading: false,
        addResponse: action.response,
      });
    case Type.ADD_NEWS_ERROR:
      return state.merge({
        loading: false,
        addResponse: action.error,
      });
    case Type.GET_NEWS_BY_ID_REQUEST:
      return state.merge({
        loading: true,
      });
    case Type.GET_NEWS_BY_ID_SUCCESS:
      return state.merge({
        loading: false,
        newsResponse: action.response,
      });
    case Type.GET_NEWS_BY_ID_ERROR:
      return state.merge({
        loading: false,
        editResponse: action.error,
      });
    case Type.EDIT_NEWS_REQUEST:
      return state.merge({
        loading: true,
      });
    case Type.EDIT_NEWS_SUCCESS:
      return state.merge({
        loading: false,
        editResponse: action.response,
      });
    case Type.EDIT_NEWS_ERROR:
      return state.merge({
        loading: false,
        editResponse: action.error,
      });
    case Type.GET_NEWS_CATEGORY:
      return state.merge({
        loading: true,
      });
    case Type.GET_NEWS_CATEGORY_SUCCESS:
      return state.merge({
        loading: false,
        categoryResponse: action.response,
      });
    case Type.GET_NEWS_CATEGORY_ERROR:
      return state.merge({
        loading: false,
        categoryResponse: action.error,
      });
    default:
      return state;
  }
}

export default newsFormReducer;
