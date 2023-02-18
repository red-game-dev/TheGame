import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FetchErrorsState, fetchFailedAdapter } from '../errors.state';

const selectFetchErrorsState = createFeatureSelector<FetchErrorsState>('fetchErrors');

export const getErrors = createSelector(
  selectFetchErrorsState,
  fetchFailedAdapter.getSelectors().selectAll
);
