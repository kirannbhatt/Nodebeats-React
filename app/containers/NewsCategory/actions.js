/*
 *
 * NewsCategory actions
 *
 */

import * as Type from './constants';

export const getNewsCategory = () => {
  return {
    type: Type.FETCH_NEWS_CATEGORY,
  };
};

export const getNewsCategorySuccess = response => {
  return {
    type: Type.FETCH_NEWS_CATEGORY_SUCCESS,
    response,
  };
};

export const getNewsCategoryError = error => {
  return {
    type: Type.FETCH_NEWS_CATEGORY_ERROR,
    error,
  };
};

export const deleteNewsCategory = id => {
  return {
    type: Type.DELETE_NEWS_CATEGORY,
    id,
  };
};
export const deleteNewsCategorySuccess = response => {
  return {
    type: Type.DELETE_NEWS_CATEGORY_SUCCESS,
    response,
  };
};
export const deleteNewsCategoryError = error => {
  return {
    type: Type.DELETE_NEWS_CATEGORY_ERROR,
    error,
  };
};
