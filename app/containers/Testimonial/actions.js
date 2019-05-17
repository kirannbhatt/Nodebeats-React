/*
 *
 * Testimonial actions
 *
 */

import * as Type from './constants';

export const fetchTestimonials = () => {
  return {
    type: Type.TESTIMONIAL_FETCH,
  };
};

export const fetchTestimonialsSuccess = response => {
  return {
    type: Type.TESTIMONIAL_FETCH_SUCCESS,
    response,
  };
};

export const fetchTestimonialsError = error => {
  return {
    type: Type.TESTIMONIAL_FETCH_ERROR,
    error,
  };
};

export const deleteTestimonial = id => {
  return {
    type: Type.DELETE_TESTIMONIAL_REQUEST,
    id,
  };
};

export const deleteTestimonialSuccess = response => {
  return {
    type: Type.DELETE_TESTIMONIAL_SUCCESS,
    response,
  };
};

export const deleteTestimonialError = error => {
  return {
    type: Type.DELETE_TESTIMONIAL_ERROR,
    error,
  };
};

export const editTestimonial = id => {
  return {
    type: Type.EDIT_TESTIMONIAL_REQUEST,
    id,
  };
};

export const editTestimonialSuccess = response => {
  return {
    type: Type.EDIT_TESTIMONIAL_SUCCESS,
    response,
  };
};

export const editTestimonialError = error => {
  return {
    type: Type.EDIT_TESTIMONIAL_ERROR,
    error,
  };
};
