import { take, takeLatest, call, put, fork } from 'redux-saga/effects';
import * as Type from './constants';
import XcelTrip from 'utils/apiHelper.js';
import {
  addTestimonialSuccess,
  addTestimonialError,
  getTestimonialByIdSuccess,
  getTestimonialByIdError,
  editTestimonialByIdSuccess,
  editTestimonialByIdError,
} from './actions';
import { push } from 'connected-react-router';
const apiUri = 'testimonial';
const token = localStorage.getItem('token');

function* redirectOnSuccess() {
  const action = yield take(Type.ADD_TESTIMONIAL_SUCCESS);
  yield put(push('/admin/testimonial'));
}

function* addTestimonialRequest(actions) {
  const successWatcher = yield fork(redirectOnSuccess);
  yield call(
    XcelTrip.post(
      apiUri,
      addTestimonialSuccess,
      addTestimonialError,
      actions.testimonial,
      // actions.image,
      token,
    ),
  );
}

function* redirectOnEditSuccess() {
  const action = yield take(Type.EDIT_TESTIMONIAL_SUCCESS);
  yield put(push('/admin/testimonial'));
}

function* getTestimonialByIdRequest(actions) {
  const successEditSuccessWatcher = yield fork(redirectOnEditSuccess);
  yield call(
    XcelTrip.get(
      `${apiUri}/${actions.id}`,
      getTestimonialByIdSuccess,
      getTestimonialByIdError,
      token,
    ),
  );
}

function* editTestimonial(actions) {
  const successWatcher = yield fork(redirectOnSuccess);

  yield call(
    XcelTrip.put(
      `${apiUri}/${actions.id}`,
      editTestimonialByIdSuccess,
      editTestimonialByIdError,
      actions.data,
      token,
    ),
  );
}

// Individual exports for testing
export default function* testimonialFormSaga() {
  yield takeLatest(Type.ADD_TESTIMONIAL_REQUEST, addTestimonialRequest);
  yield takeLatest(Type.GET_TESTIMONIAL_BY_ID, getTestimonialByIdRequest);
  yield takeLatest(Type.EDIT_TESTIMONIAL_REQUEST, editTestimonial);
}
