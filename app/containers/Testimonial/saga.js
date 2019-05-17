import { takeLatest, call, fork, put, take, cancel } from 'redux-saga/effects';
import * as Type from './constants';
import XcelTrip from 'utils/apiHelper.js';
import { push } from 'connected-react-router';

import {
  fetchTestimonialsSuccess,
  fetchTestimonialsError,
  deleteTestimonialSuccess,
  deleteTestimonialError,
} from './actions';
const apiUri = 'testimonial';
const token = localStorage.getItem('token');

function* testimonialRequest() {
  yield call(
    XcelTrip.get(apiUri, fetchTestimonialsSuccess, fetchTestimonialsError),
  );
}

function* redirectOnSuccess() {
  yield take(Type.DELETE_TESTIMONIAL_SUCCESS);
  yield put(push('/admin/'));
}

function* deleteRequest(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    XcelTrip.patch(
      `${apiUri}/${action.id}`,
      deleteTestimonialSuccess,
      deleteTestimonialError,
      {},
      token,
    ),
  );
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* testimonialSaga() {
  yield takeLatest(Type.TESTIMONIAL_FETCH, testimonialRequest);
  yield takeLatest(Type.DELETE_TESTIMONIAL_REQUEST, deleteRequest);
}
