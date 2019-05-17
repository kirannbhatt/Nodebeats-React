import {
  LOAD_NEWS,
  LOAD_NEWS_SUCCESS,
  LOAD_NEWS_FAILURE,
  LOAD_NEWS_BY_ID,
  LOAD_NEWS_BY_ID_SUCCESS,
  LOAD_NEWS_BY_ID_FAILURE,
  DELETE_NEWS,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAILURE
} from "./constants";

import action from "utils/action";

export function loadNews(name, page, perpage) {
  console.log('inside action of load news',name,'and', page,'and',perpage)
  return {
    type: LOAD_NEWS,
    name,
    page,
    perpage
  };
}

export function loadNewsSuccess(news) {
  return {
    type: LOAD_NEWS_SUCCESS,
    news
  };
}

export function loadNewsError(error) {
  return {
    type: LOAD_NEWS_FAILURE,
    error
  };
}

export function loadNewsById(id) {
  return {
    type: LOAD_NEWS_BY_ID,
    id
  };
}

export function loadNewsByIdSuccess(news) {
  return {
    type: LOAD_NEWS_BY_ID_SUCCESS,
    news
  };
}

export function loadNewsByIdError(error) {
  return {
    type: LOAD_NEWS_BY_ID_FAILURE,
    error
  };
}

export function deleteNews(newsId) {
  return {
    type: DELETE_NEWS,
    newsId
  };
}

export function deleteNewsSuccess(response, newsId) {
  return {
    type: DELETE_NEWS_SUCCESS,
    response,
    newsId
  };
}

export function deleteNewsError(error) {
  return {
    type: DELETE_NEWS_FAILURE,
    error
  };
}
