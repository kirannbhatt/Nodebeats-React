/*
 *
 * TestimonialForm reducer
 *
 */

import { fromJS } from 'immutable';
import * as Type from './constants';

export const initialState = fromJS({
  loading: false,
  addResponse: {},
  testimonialResponse: {},
});

function testimonialFormReducer(state = initialState, action) {
  switch (action.type) {
    case Type.ADD_TESTIMONIAL_REQUEST:
      return state.merge({
        loading: true,
      });
    case Type.ADD_TESTIMONIAL_SUCCESS:
      return state.merge({
        loading: false,
        addResponse: action.response,
      });
    case Type.ADD_TESTIMONIAL_ERROR:
      return state.merge({
        loading: false,
        addResponse: action.error,
      });
    case Type.GET_TESTIMONIAL_BY_ID:
      return state.merge({
        loading: true,
      });
    case Type.GET_TESTIMONIAL_BY_ID_SUCCESS:
      return state.merge({
        loading: false,
        testimonialResponse: action.response,
      });
    case Type.GET_TESTIMONIAL_BY_ID_ERROR:
      return state.merge({
        loading: false,
        testimonialResponse: action.error,
      });
    default:
      return state;
  }
}

export default testimonialFormReducer;
