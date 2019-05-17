import { fromJS } from 'immutable';
import testimonialEditFormReducer from '../reducer';

describe('testimonialEditFormReducer', () => {
  it('returns the initial state', () => {
    expect(testimonialEditFormReducer(undefined, {})).toEqual(fromJS({}));
  });
});
