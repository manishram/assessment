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

export const articleQuery = {
  selectArticleState,
  selectComments,
  selectData,
  selectLoaded,
  selectLoading,
  getAuthorUsername,
  getCoAuthors,
};
