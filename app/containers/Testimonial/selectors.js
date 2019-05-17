import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { select } from 'redux-saga/effects';

/**
 * Direct selector to the testimonial state domain
 */

const selectTestimonialDomain = state => state.get('testimonial', initialState);

/**
 * Other specific selectors
 */
const makeSelectLoading = () =>
  createSelector(
    selectTestimonialDomain,
    substate => substate.get('loading'),
  );
/**
 * Default selector used by Testimonial
 */

const makeSelectTestimonial = () =>
  createSelector(
    selectTestimonialDomain,
    substate => substate.get('testimonialResponse'),
  );

const makeDeleteResponse = () =>
  createSelector(
    selectTestimonialDomain,
    substate => substate.get('deleteResponse'),
  );
export default makeSelectTestimonial;
export { makeDeleteResponse, makeSelectLoading, selectTestimonialDomain };
