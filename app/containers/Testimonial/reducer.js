/*
 *
 * Testimonial reducer
 *
 */

import { fromJS } from 'immutable';
import * as Type from './constants';

export const initialState = fromJS({
  loading: true,
  testimonialResponse: {},
  deleteResponse: '',
});

function testimonialReducer(state = initialState, action) {
  switch (action.type) {
    case Type.TESTIMONIAL_FETCH:
      return state;
    case Type.TESTIMONIAL_FETCH_SUCCESS:
      return state.merge({
        loading: false,
        testimonialResponse: action.response,
      });
    case Type.TESTIMONIAL_FETCH_ERROR:
      return state.merge({
        loading: false,
        testimonialResponse: action.error,
      });
    case Type.DELETE_TESTIMONIAL_REQUEST:
      return state.merge({
        deleteResponse: '',
      });
    case Type.DELETE_TESTIMONIAL_SUCCESS:
      return state.merge({
        deleteResponse: action.response.message,
      });
    case Type.DELETE_TESTIMONIAL_ERROR:
      return state.merge({
        deleteResponse: action.error,
      });
    default:
      return state;
  }
}

export default testimonialReducer;
