/*
 *
 * NewsForm actions
 *
 */

import * as Type from './constants';
import { TASK } from 'redux-saga/utils';

export function addNews(news) {
  return {
    type: Type.ADD_NEWS_REQUEST,
    news,
  };
}

export function addNewsSuccess(response) {
  return {
    type: Type.ADD_NEWS_SUCCESS,
    response,
  };
}

export function addNewsError(error) {
  return {
    type: Type.ADD_NEWS_ERROR,
    error,
  };
}

export function getNewsById(id) {
  return {
    type: Type.GET_NEWS_BY_ID_REQUEST,
    id,
  };
}

export function getNewsByIdSuccess(response) {
  return {
    type: Type.GET_NEWS_BY_ID_SUCCESS,
    response,
  };
}

export function getNewsByIdError(error) {
  return {
    type: Type.GET_NEWS_BY_ID_ERROR,
    error,
  };
}

export function editNews(news, id) {
  return {
    type: Type.EDIT_NEWS_REQUEST,
    news,
    id,
  };
}

export function editNewsSuccess(response) {
  return {
    type: Type.EDIT_NEWS_SUCCESS,
    response,
  };
}

export function editNewsError(error) {
  return {
    type: Type.EDIT_NEWS_ERROR,
    error,
  };
}

export const getNewsCategory = () => {
  return {
    type: Type.GET_NEWS_CATEGORY,
  };
};

export const getNewsCategorySuccess = response => {
  return {
    type: Type.GET_NEWS_CATEGORY_SUCCESS,
    response,
  };
};

export const getNewsCategoryError = error => {
  return {
    type: Type.GET_NEWS_BY_ID_ERROR,
    error,
  };
};
