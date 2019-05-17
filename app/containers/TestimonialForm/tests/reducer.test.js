import { fromJS } from 'immutable';
import testimonialFormReducer from '../reducer';

describe('testimonialFormReducer', () => {
  it('returns the initial state', () => {
    expect(testimonialFormReducer(undefined, {})).toEqual(fromJS({}));
  });
});
