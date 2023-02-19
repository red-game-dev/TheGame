import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userAdapter, UserState } from '@state/user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const {
  selectIds: selectItemIds,
  selectEntities: selectItemEntities,
  selectAll: selectAllItems,
  selectTotal: selectTotalItems
} = userAdapter.getSelectors(selectUserState);

export const getUser = createSelector(
  selectUserState,
  userAdapter.getSelectors().selectAll,
);

export const isUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);
