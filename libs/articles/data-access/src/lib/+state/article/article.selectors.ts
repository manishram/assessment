import { createSelector } from '@ngrx/store';
import { articleFeature } from './article.reducer';

export const {
  selectArticleState,
  selectComments,
  selectData,
  selectLoaded,
  selectLoading,
} = articleFeature;

export const getAuthorUsername = createSelector(selectData, (data) => data.author.username);
export const getCoAuthors = createSelector(selectData, (data) => data.co_authors);
export const getEditStatus = createSelector(selectData, (data) => data.edit_status);
export const getEditorId = createSelector(selectData, (data) => data.editor_id);
export const getUpdatedAt = createSelector(selectData, (data) => data.updatedAt);

export const articleQuery = {
  selectArticleState,
  selectComments,
  selectData,
  selectLoaded,
  selectLoading,
  getAuthorUsername,
  getCoAuthors,
  getEditStatus,
  getEditorId,
  getUpdatedAt
};
