import { createFeatureSelector, createSelector } from '@ngrx/store';
import { boxAdapter, BoxState } from '@state/boxes.state';
import { selectRouteParams } from '@selectors/router.selectors';

const selectBoxState = createFeatureSelector<BoxState>('boxes');

export const getBoxes = createSelector(
  selectBoxState,
  boxAdapter.getSelectors().selectAll,
);

export const isBoxesLoading = createSelector(
  selectBoxState,
  (state: BoxState) => state.loading
);

export const isBoxOpening = createSelector(
  selectBoxState,
  (state: BoxState) => state.isBoxOpening
);

export const getDetailViewBox = createSelector(
  selectBoxState,
  selectRouteParams,
  (state: BoxState, { id } = {} as any) => state.entities[id]
);
