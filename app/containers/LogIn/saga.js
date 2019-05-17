import { takeLatest, call, fork, take, put } from 'redux-saga/effects';
import * as Type from './constants';
import XcelTrip from 'utils/apiHelper.js';
import { loginSuccess, loginError } from './actions';
import { push } from 'connected-react-router';
const apiUri = 'login';

function* redirectOnLoginSuccess() {
  const action = yield take(Type.LOGIN_SUCCESS);
  yield put(push('/admin'));
}

function* loginRequest(action) {
  const successWatcher = yield fork(redirectOnLoginSuccess);
  const data = {
    username: action.userdata.username,
    password: action.userdata.password,
  };
  yield call(XcelTrip.post(apiUri, loginSuccess, loginError, data));
}

// Individual exports for testing
export default function* logInSaga() {
  yield takeLatest(Type.LOGIN_FETCH, loginRequest);
}
