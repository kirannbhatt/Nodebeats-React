import { fromJS } from 'immutable';
import newsFormReducer from '../reducer';

describe('newsFormReducer', () => {
  it('returns the initial state', () => {
    expect(newsFormReducer(undefined, {})).toEqual(fromJS({}));
  });
});
