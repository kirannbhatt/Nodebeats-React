import { fromJS } from 'immutable';
import newsCategoryFormReducer from '../reducer';

describe('newsCategoryFormReducer', () => {
  it('returns the initial state', () => {
    expect(newsCategoryFormReducer(undefined, {})).toEqual(fromJS({}));
  });
});
