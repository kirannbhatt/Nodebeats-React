import {
  NEWS_EDITOR_SETUP_REQUEST,
  NEWS_EDITOR_SETUP_SUCCESS,
  NEWS_EDITOR_SETUP_FAILURE,
  NEWS_EDITOR_FETCH_REQUEST,
  NEWS_EDITOR_FETCH_SUCCESS,
  NEWS_EDITOR_FETCH_FAILURE,
  NEWS_EDITOR_POST_REQUEST,
  NEWS_EDITOR_POST_SUCCESS,
  NEWS_EDITOR_POST_FAILURE,
  NEWS_CATEGORY_GET,
  NEWS_CATEGORY_GET_SUCCESS,
  NEWS_CATEGORY_GET_FAILURE,
  NEWS_DELETE_DOC_REQUEST,
  NEWS_DELETE_DOC_SUCCESS,
  NEWS_DELETE_DOC_FAILURE,
  NEWS_TAG_REQUEST,
  NEWS_TAG_SUCCESS,
  NEWS_TAG_FAILURE
} from './constants';

/*-----------UPADTE-----------*/
  export function newsEditorRequest(data, documents) {
    return {
      type: NEWS_EDITOR_SETUP_REQUEST,
      data, 
      documents
    };
  }

  export function newsEditorSuccess(response) {
    return {
      type: NEWS_EDITOR_SETUP_SUCCESS,
      response
    };
  }

  export function newsEditorFailure(error) {
    return {
      type: NEWS_EDITOR_SETUP_FAILURE,
      error
    };
  }

/* ----------- GET -------------*/
  export function fetchNewsEditor(id) {
      return {
        type: NEWS_EDITOR_FETCH_REQUEST,
        id
      };
  }

  export function newsEditorFetched(newsEditor) {
    return {
      type: NEWS_EDITOR_FETCH_SUCCESS,
      newsEditor
    };
  }

  export function newsEditorFetchingError(error) {
    return {
      type: NEWS_EDITOR_FETCH_FAILURE,
      error
    };
  }

/*---------- POST -----------*/
  export function newsEditorPost(data, documents){
    return {
      type: NEWS_EDITOR_POST_REQUEST,
      data,
      documents
    };
  }

  export function newsEditorPostSuccess(response) {
    return {
      type: NEWS_EDITOR_POST_SUCCESS,
      response
    };
  }

  export function newsEditorPostFailure(error) {
    return {
      type: NEWS_EDITOR_POST_FAILURE,
      error
    };
  }

/* ----------- News Category -------------*/
  export function newsCategory() {
    return {
      type: NEWS_CATEGORY_GET
    };
  }

  export function newsCategorySuccess(newsCategory) {
    return {
      type: NEWS_CATEGORY_GET_SUCCESS,
      newsCategory
    };
  }

  export function newsCategoryFailure(error) {
    return {
      type: NEWS_CATEGORY_GET_FAILURE,
      error
    };
  }

/* --------------- News Image ------------------- */
  export function newsImageDeleteRequest(_id, file_path) {
    return {
      type: NEWS_DELETE_DOC_REQUEST,
      _id,
      file_path
    };
  }

  export function newsImageDeleteSuccess(response) {
    return {
      type: NEWS_DELETE_DOC_SUCCESS,
      response
    };
  }

  export function newsImageDeleteFailure(error) {
    return {
      type: NEWS_DELETE_DOC_FAILURE,
      error
    };
  }

/* ---------------- TAG -------------- */
  export function newsTagsGetRequest() {
    return {
      type: NEWS_TAG_REQUEST,
    };
  }

  export function newsTagsGetSuccess(tags) {
    return {
      type: NEWS_TAG_SUCCESS,
      tags
    };
  }

  export function newsTagsGetFailure(error) {
    return {
      type: NEWS_TAG_FAILURE,
      error
    };
  }