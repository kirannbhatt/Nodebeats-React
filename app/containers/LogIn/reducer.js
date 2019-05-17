/*
 *
 * LogIn reducer
 *
 */

import { fromJS } from 'immutable';
import * as Type from './constants';

export const initialState = fromJS({
  loading: false,
  response: '',
  error: {},
  loginResponse: {},
});

function logInReducer(state = initialState, action) {
  switch (action.type) {
    case Type.LOGIN_FETCH:
      return state;
    case Type.LOGIN_SUCCESS:
      localStorage.setItem('token', action.response.token);
      return state.merge({
        loading: false,
        loginResponse: action.response,
      });
    case Type.LOGIN_ERROR:
      return state.merge({
        loading: true,
        loginResponse: action.error,
      });
    default:
      return state;
  }
}

export default logInReducer;
