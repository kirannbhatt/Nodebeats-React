import {
  takeLatest,
  fork,
  put,
  cancel,
  take,
  select,
  call
} from "redux-saga/effects";

import {
  loadNewsSuccess,
  loadNewsError,
  deleteNewsSuccess,
  deleteNewsError,
  loadNewsByIdSuccess,
  loadNewsByIdError
} from "./actions";
import {
  LOAD_NEWS,
  LOAD_NEWS_BY_ID,
  DELETE_NEWS
} from "./constants";

import { AutoNCell } from "containers/App/sagas";

const token = JSON.parse(localStorage.getItem("user")).token;

function* loadNews(action) {
  const { name, page, perpage } = action;
  console.log('inside saga of load news',name,'and',page,'and',perpage)
  yield call(
    AutoNCell.get(
      `api/news?active=all&title=${action.name}&page=${action.page}&perpage=${perpage}`,
      loadNewsSuccess,
      loadNewsError,
      token
    )
  );
}

function* loadNewsById(action) {
  yield call(
    AutoNCell.get(
      `api/news/${action.id}`,
      loadNewsByIdSuccess,
      loadNewsByIdError,
      token
    )
  );
}

function* deleteNews(action) {
  const newsId = action.newsId;
  yield call(
    AutoNCell.delete(
      `api/news/info/${newsId}`,
      deleteNewsSuccess,
      deleteNewsError,
      newsId
    )
  );
}

function* newsWatcher() {
  yield takeLatest(LOAD_NEWS, loadNews);
  yield takeLatest(LOAD_NEWS_BY_ID, loadNewsById);
  yield takeLatest(DELETE_NEWS, deleteNews);
}

export default [newsWatcher];
