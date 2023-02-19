import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FetchErrorsState, fetchFailedAdapter } from '@state/errors.state';

const selectFetchErrorsState = createFeatureSelector<FetchErrorsState>('fetchErrors');

export const getErrors = createSelector(
  selectFetchErrorsState,
  fetchFailedAdapter.getSelectors().selectAll
);
