import { fromJS } from 'immutable';
import newsCategoryReducer from '../reducer';

describe('newsCategoryReducer', () => {
  it('returns the initial state', () => {
    expect(newsCategoryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
