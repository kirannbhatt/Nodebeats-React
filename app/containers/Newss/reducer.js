/*
 *
 * Newss reducer
 *
 */

import { fromJS } from 'immutable';
import * as Type from './constants';

export const initialState = fromJS({
  loading: false,
  newsResponse: {},
  deleteResponse: {},
});

function newssReducer(state = initialState, action) {
  switch (action.type) {
    case Type.FETCH_NEWS_REQUEST:
      return state.merge({
        loading: true,
      });
    case Type.FETCH_NEWS_SUCCESS:
      return state.merge({
        loading: false,
        newsResponse: action.response,
      });
    case Type.FETCH_NEWS_ERROR:
      return state.merge({
        loading: false,
        newsResponse: action.error,
      });
    case Type.DELETE_NEWS_REQUEST:
      return state.merge({
        loading: true,
      });
    case Type.DELETE_NEWS_SUCCESS:
      return state.merge({
        loading: false,
        deleteResponse: action.response,
      });
    case Type.DELETE_NEWS_ERROR:
      return state.merge({
        loading: false,
        deleteResponse: action.error,
      });
    default:
      return state;
  }
}

export default newssReducer;
