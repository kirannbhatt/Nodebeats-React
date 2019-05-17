/*
 *
 * Newss actions
 *
 */

import * as Type from './constants';

export function fetchNews() {
  return {
    type: Type.FETCH_NEWS_REQUEST,
  };
}

export function fetchNewsSuccess(response) {
  return {
    type: Type.FETCH_NEWS_SUCCESS,
    response,
  };
}

export function fetchNewsError(error) {
  return {
    type: Type.FETCH_NEWS_ERROR,
    error,
  };
}

export function deleteNews(id) {
  return {
    type: Type.DELETE_NEWS_REQUEST,
    id,
  };
}

export function deleteNewsSuccess(response) {
  return {
    type: Type.DELETE_NEWS_SUCCESS,
    response,
  };
}

export function deleteNewsError(error) {
  return {
    type: Type.DELETE_NEWS_ERROR,
    error,
  };
}
