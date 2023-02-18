import { Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Box } from '../../models/box';
import { fetchBoxes, fetchBoxesSuccess, openBoxSuccess } from '../actions/boxes.actions';
import { boxAdapter } from '../boxes.state';

export const initialState = boxAdapter.getInitialState({
  loading: false,
});

export const boxReducer = createReducer(
  initialState,
  on(fetchBoxes, (state) => ({ ...state, loading: true })),
  on(fetchBoxesSuccess, (state, { payload }) => boxAdapter.addMany(payload, ({ ...state, loading: false }))),
  on(openBoxSuccess, (state, { payload }) => {
    const updatedEntities = [] as Update<Box>[];

    for (const boxOpening of payload) {
      const item = state.entities[boxOpening.boxId];

      updatedEntities.push({
        id: item?.id || boxOpening.boxId,
        changes: {
          ...item,
          boxOpenings: [
            ...item?.boxOpenings || [],
            boxOpening
          ]
        },
      })
    }

    return boxAdapter.updateMany(updatedEntities, ({ ...state, loading: false }));
  })
);
