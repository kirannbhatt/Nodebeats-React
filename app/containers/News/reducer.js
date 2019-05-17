import { fromJS } from 'immutable';
import {
  LOAD_NEWS,
  LOAD_NEWS_SUCCESS,
  LOAD_NEWS_FAILURE,
  LOAD_NEWS_BY_ID,
  LOAD_NEWS_BY_ID_SUCCESS,
  LOAD_NEWS_BY_ID_FAILURE,
  DELETE_NEWS,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAILURE,
} from './constants';

import reviver from 'utils/reviver';

const initialState = fromJS({
  loading: false,
  loaded: false,
  news: {},
  newsObj: {},
  pagination: {},
  response: {},
  deleted: false,
  error: null,
});

function newsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NEWS:
    case DELETE_NEWS:
    case LOAD_NEWS_BY_ID:
      return state.merge({
        loading: true,
        loaded: false,
        error: null,
        response: null,
      });
    case LOAD_NEWS_SUCCESS:
      return state
        .merge({
          loading: false,
          loaded: true,
          error: null,
          news: fromJS(action.news.data.dataList),
        })
        .setIn(['pagination', 'totalItems'], action.news.data.totalItems)
        .setIn(['pagination', 'currentPage'], action.news.data.currentPage);
    case LOAD_NEWS_BY_ID_SUCCESS:
      return state.merge({
        loading: false,
        loaded: true,
        error: null,
        newsObj: fromJS(action.news.data),
      });
    case LOAD_NEWS_FAILURE:
    case LOAD_NEWS_BY_ID_FAILURE:
    case DELETE_NEWS_FAILURE:
      console.log('delete news failure reducer');
      return state.merge({
        error: action.error.message,
        loading: false,
        response: null,
      });
    case DELETE_NEWS_SUCCESS:
      console.log('delete news success reducer');
      return state
        .set('loading', false)
        .set('deleted', true)
        .set('response', action.response.message)
        .set(
          'news',
          state.get('news').filter(user => {
            return user.get('_id') !== action.newsId[0];
          }),
        );
    default:
      return state;
  }
}

export default newsReducer;
