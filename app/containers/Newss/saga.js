import { takeLatest, call, put, take, fork } from 'redux-saga/effects';
import * as Type from './constants';
import XcelTrip from 'utils/apiHelper';
import {
  fetchNewsSuccess,
  fetchNewsError,
  deleteNewsSuccess,
  deleteNewsError,
} from './actions';
import { push } from 'connected-react-router';

const apiUri = 'news';
const token = localStorage.getItem('token');
function* fetchNewsSaga() {
  yield call(XcelTrip.get(apiUri, fetchNewsSuccess, fetchNewsError));
}

// function* redirectOnSuccess() {
//   yield take(Type.DELETE_NEWS_SUCCESS);
//   yield put(push('/admin'));
// }

function* deleteNewsSaga(action) {
  // const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    XcelTrip.patch(
      `${apiUri}/${action.id}`,
      deleteNewsSuccess,
      deleteNewsError,
      {},
      token,
    ),
  );
}

export default function* newssSaga() {
  yield takeLatest(Type.FETCH_NEWS_REQUEST, fetchNewsSaga);
  yield takeLatest(Type.DELETE_NEWS_REQUEST, deleteNewsSaga);
}
