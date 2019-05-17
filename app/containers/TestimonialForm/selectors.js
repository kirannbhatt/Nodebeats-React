import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the testimonialForm state domain
 */

const selectTestimonialFormDomain = state =>
  state.get('testimonialForm', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TestimonialForm
 */

const makeSelectTestimonialForm = () =>
  createSelector(
    selectTestimonialFormDomain,
    substate => substate.get('addResponse'),
  );
const makeSelectTestimoialData = () =>
  createSelector(
    selectTestimonialFormDomain,
    substate => substate.get('testimonialResponse'),
  );
export default makeSelectTestimonialForm;
export { makeSelectTestimoialData, selectTestimonialFormDomain };
