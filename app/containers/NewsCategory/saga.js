import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as Type from './constants';
import * as Actions from './actions';
import XcelTrip from 'utils/apiHelper';

const apiUri = 'newscategory';
const token = localStorage.getItem('token');

function* fetchNewsCategory() {
  yield call(
    XcelTrip.get(
      apiUri,
      Actions.getNewsCategorySuccess,
      Actions.getNewsCategoryError,
      token,
    ),
  );
}

function* deleteNewsCategory(actions) {
  yield call(
    XcelTrip.patch(
      `${apiUri}/${actions.id}`,
      Actions.deleteNewsCategorySuccess,
      Actions.deleteNewsCategoryError,
      {},
      token,
    ),
  );
}

// Individual exports for testing
export default function* newsCategorySaga() {
  yield takeLatest(Type.FETCH_NEWS_CATEGORY, fetchNewsCategory);
  yield takeLatest(Type.DELETE_NEWS_CATEGORY, deleteNewsCategory);
}
