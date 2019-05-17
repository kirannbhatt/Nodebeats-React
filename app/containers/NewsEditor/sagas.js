import {
  takeLatest,
  fork,
  put,
  cancel,
  take,
  select,
  call
} from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";

import {
  newsEditorSuccess,
  newsEditorFailure,
  newsEditorFetched,
  newsEditorFetchingError,
  newsEditorPostSuccess,
  newsEditorPostFailure,
  newsCategorySuccess,
  newsCategoryFailure,
  newsTagsGetSuccess,
  newsTagsGetFailure
} from "./actions";
import {
  NEWS_EDITOR_SETUP_REQUEST,
  NEWS_EDITOR_SETUP_SUCCESS,
  NEWS_EDITOR_SETUP_FAILURE,
  NEWS_EDITOR_FETCH_REQUEST,
  NEWS_EDITOR_POST_REQUEST,
  NEWS_EDITOR_POST_SUCCESS,
  NEWS_EDITOR_POST_FAILURE,
  NEWS_CATEGORY_GET,
  NEWS_TAG_REQUEST
} from "./constants";

import { selectNewsEditor } from "./selectors";
import { AutoNCell } from "containers/App/sagas";

const token = JSON.parse(localStorage.getItem("user"))["token"];

function* redirectOnNewsAddSuccess() {
  const action = yield take(NEWS_EDITOR_POST_SUCCESS);
  yield put(push("/admin/dashboard/news"));
}

function* redirectOnNewsUpdateSuccess() {
  const action = yield take(NEWS_EDITOR_SETUP_SUCCESS);
  yield put(push("/admin/dashboard/news"));
}

function* fetchNewsEditor(action) {
  yield call(
    AutoNCell.get(
      `api/news/info/${action.id}?view_count=false`,
      newsEditorFetched,
      newsEditorFetchingError,
      token
    )
  );
}

function* setupNewsEditor(action) {
  debugger
  const successWatcher = yield fork(redirectOnNewsUpdateSuccess);
  yield fork(
    AutoNCell.multipartPost(
      `api/news/info/${action.data._id}`,
      newsEditorSuccess,
      newsEditorFailure,
      action.data,
      action.documents,
      token
    )
  );
  yield take([LOCATION_CHANGE, NEWS_EDITOR_SETUP_FAILURE]);
  yield cancel(successWatcher);
}

function* addNews(action) {
  const successWatcher = yield fork(redirectOnNewsAddSuccess);
  yield fork(
    AutoNCell.multipartPost(
      `api/news`,
      newsEditorPostSuccess,
      newsEditorPostFailure,
      action.data,
      action.documents,
      token
    )
  );
  yield take([LOCATION_CHANGE, NEWS_EDITOR_SETUP_FAILURE]);
  yield cancel(successWatcher);
}

function* fetchNewsCategory(action) {
  yield call(
    AutoNCell.get(
      `api/news-category`,
      newsCategorySuccess,
      newsCategoryFailure,
      token
    )
  );
}

function* loadNewsTags (){
  yield call(
    AutoNCell.get(
      `api/news/tags`,
      newsTagsGetSuccess,
      newsTagsGetFailure,
      token
    )
  );
}

function* newsEditorWatcher() {
  yield takeLatest(NEWS_EDITOR_SETUP_REQUEST, setupNewsEditor);
  yield takeLatest(NEWS_EDITOR_FETCH_REQUEST, fetchNewsEditor);
  yield takeLatest(NEWS_EDITOR_POST_REQUEST, addNews);
  yield takeLatest(NEWS_CATEGORY_GET, fetchNewsCategory);
  yield takeLatest(NEWS_TAG_REQUEST, loadNewsTags);

}

export default [newsEditorWatcher];
