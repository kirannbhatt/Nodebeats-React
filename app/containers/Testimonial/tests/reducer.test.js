import { fromJS } from 'immutable';
import testimonialReducer from '../reducer';

describe('testimonialReducer', () => {
  it('returns the initial state', () => {
    expect(testimonialReducer(undefined, {})).toEqual(fromJS({}));
  });
});
