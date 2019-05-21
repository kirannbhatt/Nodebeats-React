import { takeLatest, fork, put, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as Type from './constants';
import * as Action from './actions';
import XcelTrip from 'utils/apiHelper';

const apiUri = 'newscategory';
const token = localStorage.getItem('token');

function* redirectOnSuccess() {
  const action = yield take(Type.ADD_CATEGORY_SUCCESS);
  yield put(push('/admin/newscategory'));
}

function* addCategoryRequest(actions) {
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    XcelTrip.post(
      apiUri,
      Action.addCategorySuccess,
      Action.addCategoryError,
      actions.category,
      token,
    ),
  );
}

function* getCategoryRequest(actions) {
  yield fork(
    XcelTrip.get(
      `${apiUri}/${actions.id}`,
      Action.getCategoryByIdSuccess,
      Action.getCategoryByIdError,
      token,
    ),
  );
}

function* redirectOnEditSuccess() {
  const action = yield take(Type.EDIT_CATEGORY_SUCCESS);
  yield put(push('/admin/newscategory'));
}

function* editCategoryRequest(actions) {
  const successWatcher = yield fork(redirectOnEditSuccess);
  yield fork(
    XcelTrip.put(
      `${apiUri}/${actions.id}`,
      Action.editCategorySuccess,
      Action.editCategoryError,
      actions.category,
      token,
    ),
  );
}

// Individual exports for testing
export default function* newsCategoryFormSaga() {
  yield takeLatest(Type.ADD_CATEGORY_REQUEST, addCategoryRequest);
  yield takeLatest(Type.GET_CATEGORY_BY_ID_REQUEST, getCategoryRequest);
  yield takeLatest(Type.EDIT_CATEGORY_REQUEST, editCategoryRequest);
}
