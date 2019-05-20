/*
 *
 * NewsCategoryForm actions
 *
 */

import * as Type from './constants';
import { TASK } from 'redux-saga/utils';

export const addCategory = category => {
  return {
    type: Type.ADD_CATEGORY_REQUEST,
    category,
  };
};

export const addCategorySuccess = response => {
  return {
    type: Type.ADD_CATEGORY_SUCCESS,
    response,
  };
};

export const addCategoryError = error => {
  return {
    type: Type.ADD_CATEGORY_ERROR,
    error,
  };
};

export const getCategoryById = id => {
  return {
    type: Type.GET_CATEGORY_BY_ID_REQUEST,
    id,
  };
};

export const getCategoryByIdSuccess = response => {
  return {
    type: Type.GET_CATEGORY_BY_ID_SUCCESS,
    response,
  };
};

export const getCategoryByIdError = error => {
  return {
    type: Type.GET_CATEGORY_BY_ID_ERROR,
    error,
  };
};

export const editCategory = (category, id) => {
  return {
    type: Type.EDIT_CATEGORY_REQUEST,
    category,
    id,
  };
};

export const editCategorySuccess = response => {
  return {
    type: Type.EDIT_CATEGORY_SUCCESS,
    response,
  };
};

export const editCategoryError = error => {
  return {
    type: Type.EDIT_CATEGORY_ERROR,
    error,
  };
};
