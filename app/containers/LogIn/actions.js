/*
 *
 * LogIn actions
 *
 */

import * as Type from './constants';

export function fetchLogin(userdata) {
  return {
    type: Type.LOGIN_FETCH,
    userdata,
  };
}

export function loginSuccess(response) {
  return {
    type: Type.LOGIN_SUCCESS,
    response,
  };
}

export function loginError(error) {
  return {
    type: Type.LOGIN_ERROR,
    error,
  };
}
