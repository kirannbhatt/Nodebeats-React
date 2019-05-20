import { takeLatest, fork, put, take, call } from 'redux-saga/effects';
import * as Type from './constants';
import XcelTrip from 'utils/apiHelper';
import * as Action from './actions';
import { push } from 'connected-react-router';

const apiUri = 'news';
const token = localStorage.getItem('token');

function* redirectOnSuccess() {
  const action = yield take(Type.ADD_NEWS_SUCCESS);
  yield put(push('/admin/news'));
}

function* redirectOnEditSuccess() {
  const action = yield take(Type.EDIT_NEWS_SUCCESS);
  yield put(push('/admin/news'));
}

function* addNewsRequest(actions) {
  const successWatcher = yield fork(redirectOnSuccess);
  yield call(
    XcelTrip.post(
      apiUri,
      Action.addNewsSuccess,
      Action.addNewsError,
      actions.news,

      // actions.image,
      token,
    ),
  );
}

function* getNewsRequest(action) {
  yield fork(
    XcelTrip.get(
      `${apiUri}/${action.id}`,
      Action.getNewsByIdSuccess,
      Action.addNewsError,
      token,
    ),
  );
}

function* editNewsRequest(action) {
  const successEditWatcher = yield fork(redirectOnEditSuccess);
  yield call(
    XcelTrip.put(
      `${apiUri}/${action.id}`,
      Action.editNewsSuccess,
      Action.editNewsError,
      action.news,
      token,
    ),
  );
}

function* getNewsCategory() {
  yield fork(
    XcelTrip.get(
      '/newscategory',
      Action.getNewsCategorySuccess,
      Action.getNewsCategoryError,
      token,
    ),
  );
}

// Individual exports for testing
export default function* newsFormSaga() {
  yield takeLatest(Type.ADD_NEWS_REQUEST, addNewsRequest);
  yield takeLatest(Type.GET_NEWS_BY_ID_REQUEST, getNewsRequest);
  yield takeLatest(Type.EDIT_NEWS_REQUEST, editNewsRequest);
  yield takeLatest(Type.GET_NEWS_CATEGORY, getNewsCategory);
}
