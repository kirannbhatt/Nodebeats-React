import { createSelector } from 'reselect';

export const selectNewsEditor = () => state => state.getIn(['newEditorReducer', 'newsEditor']);

export const selectSuccessResponse = () => state => state.getIn(['newEditorReducer', 'response']);

export const selectErrorResponse = () => state => state.getIn(['newEditorReducer', 'error']);

export const selectRequestingResponse = () => state => state.getIn(['newEditorReducer', 'requesting']);

export const selectNewsCategoryResponse = () => state => state.getIn(['newEditorReducer', 'newsCategory']);

export const selectTagsResponse = () => state => state.getIn(['newEditorReducer', 'tags']);