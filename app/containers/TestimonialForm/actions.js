/*
 *
 * TestimonialForm actions
 *
 */

import * as Type from './constants';

export const addTestimonial = (testimonial, image) => {
  return {
    type: Type.ADD_TESTIMONIAL_REQUEST,
    testimonial,
    image,
  };
};

export const addTestimonialSuccess = response => {
  return {
    type: Type.ADD_TESTIMONIAL_SUCCESS,
    response,
  };
};

export const addTestimonialError = error => {
  return {
    type: Type.ADD_TESTIMONIAL_ERROR,
    error,
  };
};

export const getTestimonialById = id => {
  return {
    type: Type.GET_TESTIMONIAL_BY_ID,
    id,
  };
};

export const getTestimonialByIdSuccess = response => {
  return {
    type: Type.GET_TESTIMONIAL_BY_ID_SUCCESS,
    response,
  };
};

export const getTestimonialByIdError = error => {
  return {
    type: Type.GET_TESTIMONIAL_BY_ID_ERROR,
    error,
  };
};

export const editTestimonialById = (data, imageName, id) => {
  return {
    type: Type.EDIT_TESTIMONIAL_REQUEST,
    data,
    imageName,
    id,
  };
};

export const editTestimonialByIdSuccess = response => {
  return {
    type: Type.EDIT_TESTIMONIAL_SUCCESS,
    response,
  };
};

export const editTestimonialByIdError = error => {
  return {
    type: Type.EDIT_TESTIMONIAL_ERROR,
    error,
  };
};
