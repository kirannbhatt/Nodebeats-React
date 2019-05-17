import { fromJS } from 'immutable';
import {
  NEWS_EDITOR_SETUP_REQUEST,
  NEWS_EDITOR_SETUP_SUCCESS,
  NEWS_EDITOR_SETUP_FAILURE,
  NEWS_EDITOR_FETCH_REQUEST,
  NEWS_EDITOR_FETCH_SUCCESS,
  NEWS_EDITOR_FETCH_FAILURE,
  NEWS_EDITOR_POST_SUCCESS,
  NEWS_EDITOR_POST_FAILURE,
  NEWS_CATEGORY_GET,
  NEWS_CATEGORY_GET_SUCCESS,
  NEWS_CATEGORY_GET_FAILURE,
  NEWS_TAG_REQUEST,
  NEWS_TAG_SUCCESS,
  NEWS_TAG_FAILURE
} from './constants';

const initialState = fromJS({
  requesting: false,
  successful: false,
  newsEditor: {},
  error: null,
  response: null
});

function newsEditorState(state = initialState, action) {
  switch (action.type) {
    case NEWS_EDITOR_SETUP_REQUEST:
    case NEWS_EDITOR_FETCH_REQUEST:
    console.log('inside saga for news editor fetch request')
    case NEWS_CATEGORY_GET:
    case NEWS_TAG_REQUEST:
      return state
        .set('requesting', true)
        .set('successful', false)
        .set('response', null)
        .set('error', null);
    case NEWS_EDITOR_SETUP_SUCCESS:
    case NEWS_EDITOR_POST_SUCCESS:
      return state
        .set('requesting', false)
        .set('successful', true)
        .set('response', action.response.message);
    case NEWS_EDITOR_FETCH_SUCCESS:
      return state
        .set('requesting', false)
        .set('successful', true)
        .set('newsEditor', fromJS(action.newsEditor.data));
    case NEWS_CATEGORY_GET_SUCCESS:
      return state
        .set('requesting', false)
        .set('successful', true)
        .set('newsCategory', fromJS(action.newsCategory.data));
    case NEWS_TAG_SUCCESS:
      return state
        .set('requesting', false)
        .set('successful', true)
        .set('tags', fromJS(action.tags.data));
    case NEWS_EDITOR_SETUP_FAILURE:
    case NEWS_EDITOR_FETCH_FAILURE:
    case NEWS_CATEGORY_GET_FAILURE:
    case NEWS_EDITOR_POST_FAILURE:
    case NEWS_TAG_FAILURE:
      return state.set('error', action.error.message).set('response', null);

    default:
      return state;
  }
}

export default newsEditorState;
