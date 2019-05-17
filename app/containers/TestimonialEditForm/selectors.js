import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the testimonialEditForm state domain
 */

const selectTestimonialEditFormDomain = state =>
  state.get('testimonialEditForm', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TestimonialEditForm
 */

const makeSelectTestimonialEditForm = () =>
  createSelector(
    selectTestimonialEditFormDomain,
    substate => substate.toJS(),
  );

export default makeSelectTestimonialEditForm;
export { selectTestimonialEditFormDomain };
