import { fromJS } from 'immutable';
import newssReducer from '../reducer';

describe('newssReducer', () => {
  it('returns the initial state', () => {
    expect(newssReducer(undefined, {})).toEqual(fromJS({}));
  });
});
