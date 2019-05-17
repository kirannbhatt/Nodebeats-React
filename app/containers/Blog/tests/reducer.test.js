import { fromJS } from 'immutable';
import blogReducer from '../reducer';

describe('blogReducer', () => {
  it('returns the initial state', () => {
    expect(blogReducer(undefined, {})).toEqual(fromJS({}));
  });
});
